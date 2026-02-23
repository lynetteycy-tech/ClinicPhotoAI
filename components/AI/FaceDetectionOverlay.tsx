import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DetectedFace } from '../../types/faceDetection';

interface FaceDetectionOverlayProps {
  faces: DetectedFace[];
  frameWidth: number;
  frameHeight: number;
  showLandmarks: boolean;
  showBoundingBox: boolean;
  isValid: boolean;
}

/**
 * Face Detection Overlay Component - Phase 3 Implementation
 * 
 * This component will be implemented when we start Phase 3.
 * Shows face detection results overlay on camera view.
 */
const FaceDetectionOverlay: React.FC<FaceDetectionOverlayProps> = ({
  faces,
  frameWidth,
  frameHeight,
  showLandmarks,
  showBoundingBox,
  isValid
}) => {
  const renderFaceBox = (face: DetectedFace) => {
    const boxStyle = {
      position: 'absolute' as const,
      left: face.boundingBox.x,
      top: face.boundingBox.y,
      width: face.boundingBox.width,
      height: face.boundingBox.height,
      borderColor: isValid ? '#34C759' : '#FF3B30',
      borderWidth: 2,
      borderRadius: 4,
    };

    return <View key={face.id} style={boxStyle} />;
  };

  const renderLandmarks = (face: DetectedFace) => {
    if (!showLandmarks) return null;

    const landmarks = [
      { point: face.landmarks.leftEye, color: '#FF6B6B', label: 'Left Eye' },
      { point: face.landmarks.rightEye, color: '#4ECDC4', label: 'Right Eye' },
      { point: face.landmarks.nose, color: '#FFD93D', label: 'Nose' },
      { point: face.landmarks.mouth, color: '#F87171', label: 'Mouth' },
    ];

    return landmarks.map((landmark, index) => (
      <View
        key={`${face.id}-${index}`}
        style={[
          styles.landmark,
          {
            left: landmark.point.x - 4,
            top: landmark.point.y - 4,
            backgroundColor: landmark.color,
          },
        ]}
      />
    ));
  };

  const renderConfidenceIndicator = (face: DetectedFace) => {
    const confidence = Math.round(face.confidence * 100);
    const color = confidence > 80 ? '#34C759' : confidence > 60 ? '#F59E0B' : '#EF4444';

    return (
      <View
        style={[
          styles.confidenceIndicator,
          { backgroundColor: color },
        ]}
      >
        <Text style={styles.confidenceText}>{confidence}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {faces.map(face => (
        <View key={face.id} style={styles.faceContainer}>
          {showBoundingBox && renderFaceBox(face)}
          {renderLandmarks(face)}
          {renderConfidenceIndicator(face)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  faceContainer: {
    position: 'absolute',
  },
  landmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confidenceIndicator: {
    position: 'absolute',
    top: -25,
    left: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  confidenceText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FaceDetectionOverlay;
