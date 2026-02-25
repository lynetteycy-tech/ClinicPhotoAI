import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnalysisScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis Screen</Text>
      <Text style={styles.subtitle}>AI analysis results coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default AnalysisScreen;
