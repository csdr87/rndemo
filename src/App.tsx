import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
