export const tokens = {
  colorPrimary: '#FFD44D',
  colorPrimaryDark: '#E0B300',

  colorTextPrimary: '#FFFFFF',
  colorTextSecondary: '#E6E6E6',
  colorTextMuted: '#9CA3AF',
  colorTextDark: '#102363',

  colorBgDark: '#0B1730',
  colorBgOverlay: 'rgba(0, 0, 0, 0.45)',

  colorSurface: '#1F2937',
  colorSurfaceLight: '#374151',
  colorSurfaceBorder: '#4B5563',

  colorSuccess: '#6BCB3D',
  colorError: '#F04D3A',
  colorWarning: '#FF9F1C',

  shadowDark: '#09101F',

  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 18,

  spaceXs: 4,
  spaceSm: 8,
  spaceMd: 16,
  spaceLg: 24,
  spaceXl: 32,

  cityPrimary: '#3D8BFF',
  citySecondary: '#2B6FD1',
  cityAccent: '#6CB4FF',
  citySurface: '#102363',
  citySurfaceLight: '#1E4B8F',
  cityButton: '#3D8BFF',
  cityButtonHover: '#62A4FF',
  cityProgressBg: '#18335E',
  cityProgressFill: '#6BCB3D',

  beachPrimary: '#FFB347',
  beachSecondary: '#F08A24',
  beachAccent: '#FFD98C',
  beachSurface: '#8B4513',
  beachSurfaceLight: '#CE6B1A',
  beachButton: '#FF9F1C',
  beachButtonHover: '#FFB347',
  beachProgressBg: '#9C5A1A',
  beachProgressFill: '#5BC0EB',
} as const;

export const colors = {
  primary: tokens.colorPrimary,
  primaryDark: tokens.colorPrimaryDark,
  textPrimary: tokens.colorTextPrimary,
  textSecondary: tokens.colorTextSecondary,
  textMuted: tokens.colorTextMuted,
  textDark: tokens.colorTextDark,
  bgDark: tokens.colorBgDark,
  bgOverlay: tokens.colorBgOverlay,
  surface: tokens.colorSurface,
  surfaceLight: tokens.colorSurfaceLight,
  surfaceBorder: tokens.colorSurfaceBorder,
  success: tokens.colorSuccess,
  error: tokens.colorError,
  warning: tokens.colorWarning,
  shadowDark: tokens.shadowDark,
} as const;

export const radius = {
  sm: tokens.radiusSm,
  md: tokens.radiusMd,
  lg: tokens.radiusLg,
} as const;

export const spacing = {
  xs: tokens.spaceXs,
  sm: tokens.spaceSm,
  md: tokens.spaceMd,
  lg: tokens.spaceLg,
  xl: tokens.spaceXl,
} as const;

export const cityTheme = {
  primary: tokens.cityPrimary,
  secondary: tokens.citySecondary,
  accent: tokens.cityAccent,
  surface: tokens.citySurface,
  surfaceLight: tokens.citySurfaceLight,
  button: tokens.cityButton,
  buttonHover: tokens.cityButtonHover,
  progressBg: tokens.cityProgressBg,
  progressFill: tokens.cityProgressFill,
} as const;

export const beachTheme = {
  primary: tokens.beachPrimary,
  secondary: tokens.beachSecondary,
  accent: tokens.beachAccent,
  surface: tokens.beachSurface,
  surfaceLight: tokens.beachSurfaceLight,
  button: tokens.beachButton,
  buttonHover: tokens.beachButtonHover,
  progressBg: tokens.beachProgressBg,
  progressFill: tokens.beachProgressFill,
} as const;

export const theme = {
  tokens,
  colors,
  radius,
  spacing,
  levels: {
    city: cityTheme,
    beach: beachTheme,
  },
} as const;

export type DesignTokens = typeof tokens;
export type DesignTokenName = keyof DesignTokens;
export type AppTheme = typeof theme;
export type LevelThemeName = keyof typeof theme.levels;
