import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as { angle?: string; photoUri?: string } || {};
  
  const angles = ['Front', 'Left 45°', 'Left 90°', 'Right 45°', 'Right 90°'];
  const currentAngle = params.angle || angles[0];
  const currentAngleIndex = angles.indexOf(currentAngle);

  const handleCapturePhoto = () => {
    // Navigate to AngleReview for current angle
    navigation.navigate('AngleReview' as any, {
      angle: currentAngle,
      photoUri: `https://via.placeholder.com/300x400?text=${encodeURIComponent(currentAngle)}`
    });
  };

  return (
    <View style={styles.container}>
      {/* Instructions - Moved to top */}
      <View style={styles.instructionsTop}>
        <Text style={styles.instructionTitle}>Camera Features (Coming Soon):</Text>
        <Text style={styles.instructionText}>• 5-angle capture system</Text>
        <Text style={styles.instructionText}>• Real-time face detection</Text>
        <Text style={styles.instructionText}>• Angle measurement guidance</Text>
        <Text style={styles.instructionText}>• Auto-capture at perfect angles</Text>
      </View>
      
      <View style={styles.content}>
        {/* Current Angle Display */}
        <View style={styles.angleDisplay}>
          <Text style={styles.angleTitle}>Capture {currentAngle} Angle</Text>
        </View>
        
        {/* Camera Preview Placeholder */}
        <View style={styles.cameraPreview}>
          <Text style={styles.cameraText}>📸</Text>
          <Text style={styles.cameraPlaceholder}>Camera Preview</Text>
          <Text style={styles.cameraSubtext}>Camera will be implemented in Phase 2</Text>
        </View>
        
        {/* Capture Button */}
        <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
          <Text style={styles.captureButtonText}>📷 Capture {currentAngle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  instructionsTop: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  angleDisplay: {
    position: 'absolute',
    top: 100, // Moved down to make room for top instructions
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  angleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  angleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  angleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#666666',
  },
  nextButton: {
    backgroundColor: '#0088CC',
  },
  angleButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cameraPreview: {
    width: '100%',
    height: '60%',
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333333',
  },
  cameraText: {
    fontSize: 60,
    marginBottom: 16,
  },
  cameraPlaceholder: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  cameraSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 100, // Moved back to original position
    backgroundColor: '#0088CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 200,
    alignItems: 'center',
  },
  captureButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  instructions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
});

export default CameraScreen;
