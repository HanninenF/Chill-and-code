import { StyleSheet } from 'react-native';
import {
  borderWidth,
  colors,
  radius,
  spacing,
  tokens,
  typography,
} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingVertical: spacing.sm,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.bgOverlay,
    borderWidth: borderWidth.sm,
    borderColor: colors.surfaceBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highScoreContainer: {
    alignItems: 'center',
  },
  highScoreLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 1,
  },
  highScoreValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.xs,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: tokens.fontSize5xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.textMuted,
  },
  activeDot: {
    backgroundColor: colors.textPrimary,
    width: 12,
    height: 12,
    borderRadius: radius.sm,
  },
  bottomContainer: {
    paddingBottom: spacing.xs,
  },
  startButton: {
    marginHorizontal: spacing.lg,
  },
});

export default styles;
