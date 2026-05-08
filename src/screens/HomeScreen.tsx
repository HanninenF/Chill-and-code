import DragAndDropTest from './DragAndDropTest';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chill and Code</Text>
      <Text style={styles.subtitle}>Expo + React Native game foundation</Text>
      <DragAndDropTest />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bgDark,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
});
