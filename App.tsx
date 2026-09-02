import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppProvider } from './src/state/AppContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
