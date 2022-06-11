import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleExample } from './SimpleExample';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SimpleExample />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
