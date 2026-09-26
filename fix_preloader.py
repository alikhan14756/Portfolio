with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

import re

old_preloader = """window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 700);
    }
    initSplitText();
    initCounters();
  }, 2300);
});"""

new_preloader = """document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 700);
    }
    try { initSplitText(); } catch(e){}
    try { initCounters(); } catch(e){}
  }, 1200);
});
// Fallback just in case
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 700);
  }
});
"""

js = js.replace(old_preloader, new_preloader)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated preloader logic in JS")
