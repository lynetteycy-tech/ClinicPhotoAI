import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PhotoAngle } from '../../types/camera';

interface AngleIndicatorProps {
  currentAngle: PhotoAngle;
  targetAngle: PhotoAngle;
  currentYaw: number;
  isRecording: boolean;
  countdown: number;
}

/**
 * Angle Indicator Component - Phase 2 Implementation
 * 
 * This component will be implemented when we start Phase 2.
 * Shows current angle, target angle, and recording status.
 */
const AngleIndicator: React.FC<AngleIndicatorProps> = ({
  currentAngle,
  targetAngle,
  currentYaw,
  isRecording,
  countdown
}) => {
  const getAngleDisplay = (angle: PhotoAngle): string => {
    const displays: Record<PhotoAngle, string> = {
      front: 'Front',
      left45: '45° Left',
      left90: '90° Left',
      right45: '45° Right',
      right90: '90° Right'
    };
    return displays[angle];
  };

  const getAngleDifference = (): number => {
    // This will be implemented with actual angle calculation
    return Math.abs(currentYaw);
  };

  const isAngleCorrect = (): boolean => {
    // This will be implemented with tolerance checking
    return getAngleDifference() <= 1;
  };

  return (
    <View style={styles.container}>
      <View style={styles.angleInfo}>
        <Text style={styles.targetText}>
          Target: {getAngleDisplay(targetAngle)}
        </Text>
        <Text style={[
          styles.currentText,
          isAngleCorrect() && styles.correctText
        ]}>
          Current: {currentYaw.toFixed(1)}°
        </Text>
      </View>

      {isRecording && (
        <View style={styles.recordingInfo}>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>
              {countdown.toString().padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.recordingText}>
            Recording...
          </Text>
        </View>
      )}

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {getAngleDisplay(currentAngle)}
        </Text>
        {/* Progress dots will be implemented */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 12,
  },
  angleInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  targetText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  currentText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 4,
  },
  correctText: {
    color: '#34C759',
  },
  recordingInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  countdownContainer: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  countdownText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordingText: {
    color: '#ffffff',
    fontSize: 12,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AngleIndicator;
