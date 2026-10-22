import { CONSTANTS, pitchFromYNorm, clamp, ClimateStatus } from "@aetheria/common";

interface ActiveVoice {
  osc: OscillatorNode;
  gain: GainNode;
  panner?: StereoPannerNode;
  startTime: number;
}

export class AudioSystem {
  private static instance: AudioSystem | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private activeVoices: ActiveVoice[] = [];
  private readonly MAX_VOICES = 12;

  // Drone nodes
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;

  // Singularity nodes
  private singularityOsc: OscillatorNode | null = null;
  private singularityGain: GainNode | null = null;
  private singularityFilter: BiquadFilterNode | null = null;

  // State
  private isUnlocked = false;
  private isMuted = false;
  private volume = 0.7;
  private lastNoteTime = 0;
  private lastPlayedFreq = 0;

  private constructor() {
    this.loadPreferences();
  }

  public static getInstance(): AudioSystem {
    if (!AudioSystem.instance) {
      AudioSystem.instance = new AudioSystem();
    }
    return AudioSystem.instance;
  }

  private loadPreferences() {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("aetheria_prefs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.soundEnabled === "boolean") this.isMuted = !parsed.soundEnabled;
        if (typeof parsed.volume === "number") this.volume = clamp(parsed.volume, 0, 1);
      }
    } catch {
      // Ignore storage errors
    }
  }

  private savePreferences() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        "aetheria_prefs",
        JSON.stringify({
          soundEnabled: !this.isMuted,
          volume: this.volume
        })
      );
    } catch {
      // Ignore storage errors
    }
  }

  public async unlock(): Promise<boolean> {
    if (this.isUnlocked && this.ctx && this.ctx.state === "running") {
      return true;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return false;

      this.ctx = new AudioCtxClass();
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.initAmbientDrone();
      this.initSingularitySynth();

      this.isUnlocked = true;
      return true;
    } catch (e) {
      console.warn("[AudioSystem] Failed to initialize AudioContext", e);
      return false;
    }
  }

  private initAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

    // D1 (36.71 Hz) or D2 (73.42 Hz) or Sub-bass 55Hz
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = "sine";
    this.droneOsc1.frequency.setValueAtTime(55.0, this.ctx.currentTime);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = "triangle";
    this.droneOsc2.frequency.setValueAtTime(110.0, this.ctx.currentTime); // D2 octave

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private initSingularitySynth() {
    if (!this.ctx || !this.masterGain) return;

    this.singularityGain = this.ctx.createGain();
    this.singularityGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.singularityFilter = this.ctx.createBiquadFilter();
    this.singularityFilter.type = "bandpass";
    this.singularityFilter.frequency.setValueAtTime(90, this.ctx.currentTime);
    this.singularityFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.singularityOsc = this.ctx.createOscillator();
    this.singularityOsc.type = "sawtooth";
    this.singularityOsc.frequency.setValueAtTime(73.42, this.ctx.currentTime); // D2

    this.singularityOsc.connect(this.singularityFilter);
    this.singularityFilter.connect(this.singularityGain);
    this.singularityGain.connect(this.masterGain);

    this.singularityOsc.start();
  }

  public setAttractionActive(active: boolean, intensity = 1.0) {
    if (!this.ctx || !this.singularityGain || !this.singularityFilter) return;

    const targetGain = active ? 0.35 * intensity : 0;
    const targetFreq = active ? 90 + 80 * intensity : 90;

    const now = this.ctx.currentTime;
    this.singularityGain.gain.cancelScheduledValues(now);
    this.singularityGain.gain.setTargetAtTime(targetGain, now, 0.08);

    this.singularityFilter.frequency.cancelScheduledValues(now);
    this.singularityFilter.frequency.setTargetAtTime(targetFreq, now, 0.1);
  }

  public playOrganismTone(
    x: number,
    y: number,
    speed: number,
    viewportHalfWidth = 60
  ) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = performance.now();
    // Throttle voice trigger based on speed (higher speed = more frequent notes)
    const interval = clamp(260 - speed * 8, 80, 400);
    if (now - this.lastNoteTime < interval) return;

    // Normalizing coordinates relative to viewport
    const yNorm = clamp((y + viewportHalfWidth) / (viewportHalfWidth * 2), 0, 1);
    const freq = pitchFromYNorm(yNorm);

    // Pan mapped [-1.0, 1.0]
    const pan = clamp(x / viewportHalfWidth, -1.0, 1.0);

    // Prevent immediate re-trigger of identical pitch unless moving fast
    if (freq === this.lastPlayedFreq && speed < 5.0) return;

    this.spawnSpatialNote(freq, pan, clamp(speed / CONSTANTS.V_MAX, 0.2, 1.0));
    this.lastNoteTime = now;
    this.lastPlayedFreq = freq;
  }

  private spawnSpatialNote(freq: number, pan: number, velocityScale: number) {
    if (!this.ctx || !this.masterGain) return;

    // Polyphony voice limiter
    this.pruneOldestVoice();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Envelope
    const peakGain = 0.25 * velocityScale;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    let destination: AudioNode = this.masterGain;

    if (typeof this.ctx.createStereoPanner === "function") {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, now);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(destination);
    }

    osc.start(now);
    osc.stop(now + 0.65);

    const voice: ActiveVoice = { osc, gain, startTime: now };
    this.activeVoices.push(voice);

    osc.onended = () => {
      this.activeVoices = this.activeVoices.filter((v) => v !== voice);
    };
  }

  private pruneOldestVoice() {
    if (this.activeVoices.length < this.MAX_VOICES) return;

    const oldest = this.activeVoices.shift();
    if (oldest && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        oldest.gain.gain.cancelScheduledValues(now);
        oldest.gain.gain.setTargetAtTime(0, now, 0.01);
        oldest.osc.stop(now + 0.02);
      } catch {
        // Voice might already be stopped
      }
    }
  }

  public playShockwave() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Resonant sweep
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(45, now + 0.5);
    filter.Q.setValueAtTime(6.0, now);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(70, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.6);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.55, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.7);
    subOsc.stop(now + 0.7);
  }

  public updateClimateAudio(climate: ClimateStatus) {
    if (!this.ctx || !this.droneFilter || !this.ambientGain) return;

    const now = this.ctx.currentTime;
    switch (climate) {
      case "DORMANT":
        this.ambientGain.gain.setTargetAtTime(0.1, now, 1.0);
        this.droneFilter.frequency.setTargetAtTime(90, now, 1.0);
        break;
      case "TURBULENT":
        this.ambientGain.gain.setTargetAtTime(0.35, now, 0.5);
        this.droneFilter.frequency.setTargetAtTime(450, now, 0.5);
        break;
      case "LUMINESCENT":
        this.ambientGain.gain.setTargetAtTime(0.3, now, 0.8);
        this.droneFilter.frequency.setTargetAtTime(320, now, 0.8);
        break;
      case "STABLE":
      default:
        this.ambientGain.gain.setTargetAtTime(0.2, now, 0.8);
        this.droneFilter.frequency.setTargetAtTime(220, now, 0.8);
        break;
    }
  }

  public setVolume(vol: number) {
    this.volume = clamp(vol, 0, 1);
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.savePreferences();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.savePreferences();
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const audioSystem = AudioSystem.getInstance();
