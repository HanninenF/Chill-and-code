export const colors = {
  primary: '#FFD44D',
  primaryDark: '#E0B300',

  textPrimary: '#FFFFFF',
  textSecondary: '#E6E6E6',
  textMuted: '#9CA3AF',
  textDark: '#102363',

  bgDark: '#0B1730',
  bgOverlay: 'rgba(0, 0, 0, 0.45)',

  surface: '#1F2937',
  surfaceLight: '#374151',
  surfaceBorder: '#4B5563',

  success: '#6BCB3D',
  error: '#F04D3A',
  warning: '#FF9F1C',

  shadowDark: '#09101F',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const cityTheme = {
  primary: '#3D8BFF',
  secondary: '#2B6FD1',
  accent: '#6CB4FF',
  surface: '#102363',
  surfaceLight: '#1E4B8F',
  button: '#3D8BFF',
  buttonHover: '#62A4FF',
  progressBg: '#18335E',
  progressFill: '#6BCB3D',
} as const;

export const beachTheme = {
  primary: '#FFB347',
  secondary: '#F08A24',
  accent: '#FFD98C',
  surface: '#8B4513',
  surfaceLight: '#CE6B1A',
  button: '#FF9F1C',
  buttonHover: '#FFB347',
  progressBg: '#9C5A1A',
  progressFill: '#5BC0EB',
} as const;

export const theme = {
  colors,
  radius,
  spacing,
  levels: {
    city: cityTheme,
    beach: beachTheme,
  },
} as const;

export type AppTheme = typeof theme;
export type LevelThemeName = keyof typeof theme.levels;
