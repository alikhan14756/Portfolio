/**
 * AETHERIA DESIGN TOKEN SYSTEM — 28 UI DESIGN SYSTEMS
 * Typed design-token specification for full-system theming without page reloads.
 */

export type ThemeMode = "light" | "dark" | "auto";

export interface DesignTokens {
  // Page Atmosphere
  pageBg: string;
  pageBgPattern: string;
  pageBgSize?: string;
  themeMode: ThemeMode;
  atmosphereDisplay: "block" | "none";

  // Typography
  fontDisplay: string;
  fontBody: string;
  fontMono: string;

  // Text Hierarchy
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Brand & Accent Colors
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary: string;
  borderColor: string;
  borderGlow: string;

  // Navigation Surface
  surfaceNav: string;
  surfaceNavBorder: string;
  surfaceNavShadow: string;
  surfaceNavRadius: string;

  // Card Surface
  surfaceCard: string;
  surfaceCardBorder: string;
  surfaceCardShadow: string;
  surfaceCardHoverShadow: string;
  surfaceCardRadius: string;
  surfaceCardClip?: string;
  backdropBlur: string;

  // Form & Input Surfaces
  surfaceInput: string;
  surfaceInputBorder: string;
  surfaceInputText: string;
  surfaceInputPlaceholder: string;
  surfaceInputRadius: string;
  surfaceInputShadow: string;

  // Dialog & Modal Surfaces
  surfaceDialog: string;
  surfaceDialogBorder: string;
  surfaceDialogShadow: string;
  surfaceDialogRadius: string;

  // AI Assistant (ALI JARVIS) Surface
  surfaceAssistant: string;
  surfaceAssistantBorder: string;
  surfaceAssistantShadow: string;
  surfaceAssistantRadius: string;

  // Badges & Chips
  surfaceBadge: string;
  surfaceBadgeBorder: string;
  surfaceBadgeText: string;
  surfaceBadgeRadius: string;
  surfaceChip: string;
  surfaceChipBorder: string;
  surfaceChipText: string;
  surfaceChipActiveBg: string;
  surfaceChipActiveText: string;

  // Primary Button
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnPrimaryBorder: string;
  btnPrimaryShadow: string;
  btnPrimaryRadius: string;
  btnPrimaryHoverShadow?: string;
  btnPrimaryActiveTransform?: string;

  // Secondary Button
  btnSecondaryBg: string;
  btnSecondaryText: string;
  btnSecondaryBorder: string;
  btnSecondaryShadow: string;
  btnSecondaryRadius: string;
}
