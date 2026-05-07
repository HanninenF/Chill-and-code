import { StyleSheet, Text, View } from 'react-native';
import DragAndDropTest from './DragAndDropTest';

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
    backgroundColor: '#f7f7f2',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  subtitle: {
    color: '#4a5568',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    color: '#17202a',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
