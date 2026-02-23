import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CaptureInstructionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CaptureInstructions'>;

const CaptureInstructionsScreen = () => {
  const navigation = useNavigation<CaptureInstructionsScreenNavigationProp>();

  const handleStartRecording = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Capture Guide</Text>
        
        <View style={styles.warningSection}>
          <Text style={styles.warningItem}>⚠️ Remove glasses</Text>
          <Text style={styles.warningItem}>⚠️ Sweep hair back</Text>
        </View>
        
        <View style={styles.diagramSection}>
          <Text style={styles.diagramTitle}>5 Head Positions</Text>
          <View style={styles.diagramContainer}>
            <View style={styles.positionBox}>
              <Text style={styles.positionText}>Front</Text>
            </View>
            <View style={styles.positionRow}>
              <View style={styles.positionBox}>
                <Text style={styles.positionText}>45° L</Text>
              </View>
              <View style={styles.positionBox}>
                <Text style={styles.positionText}>45° R</Text>
              </View>
            </View>
            <View style={styles.positionRow}>
              <View style={styles.positionBox}>
                <Text style={styles.positionText}>90° L</Text>
              </View>
              <View style={styles.positionBox}>
                <Text style={styles.positionText}>90° R</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.lightingSection}>
          <Text style={styles.lightingText}>Lighting: ✅ Good</Text>
        </View>
        
        <TouchableOpacity style={styles.startButton} onPress={handleStartRecording}>
          <Text style={styles.startButtonText}>Start Recording</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  warningSection: {
    marginBottom: 32,
  },
  warningItem: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginBottom: 8,
  },
  diagramSection: {
    marginBottom: 32,
  },
  diagramTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  diagramContainer: {
    alignItems: 'center',
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    width: '100%',
  },
  positionBox: {
    width: 80,
    height: 60,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  lightingSection: {
    marginBottom: 32,
  },
  lightingText: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    height: 48,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CaptureInstructionsScreen;
