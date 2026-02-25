import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface CameraOverlayProps {
  currentAngle: string;
  currentAngleIndex: number;
  totalAngles: number;
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({
  currentAngle,
  currentAngleIndex,
  totalAngles
}) => {
  return (
    <View style={styles.container}>
      {/* iPhone-style Grid Overlay */}
      <View style={styles.gridContainer}>
        {/* Horizontal lines (3 lines) */}
        <View style={[styles.gridLine, styles.horizontalTop]} />
        <View style={[styles.gridLine, styles.horizontalMiddle]} />
        <View style={[styles.gridLine, styles.horizontalBottom]} />
        
        {/* Vertical lines (3 lines) */}
        <View style={[styles.gridLine, styles.verticalLeft]} />
        <View style={[styles.gridLine, styles.verticalCenter]} />
        <View style={[styles.gridLine, styles.verticalRight]} />
      </View>

      {/* Level Indicator (iPhone-style dashed line) */}
      <View style={styles.levelContainer}>
        <View style={styles.levelIndicator}>
          <View style={styles.dashedLine} />
        </View>
      </View>

      {/* Angle Progress Tracker */}
      <View style={styles.progressContainer}>
        {Array.from({ length: totalAngles }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentAngleIndex && styles.activeDot,
              index < currentAngleIndex && styles.completedDot
            ]}
          />
        ))}
      </View>

      {/* Current Angle Indicator */}
      <View style={styles.angleIndicator}>
        <Text style={styles.angleText}>{currentAngle}</Text>
        <Text style={styles.progressText}>
          {currentAngleIndex + 1} / {totalAngles}
        </Text>
      </View>
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
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  horizontalTop: {
    top: '25%',
    left: 0,
    right: 0,
    height: 1,
  },
  horizontalMiddle: {
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
  },
  horizontalBottom: {
    top: '75%',
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLeft: {
    left: '25%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  verticalCenter: {
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  verticalRight: {
    left: '75%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  levelContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: -1, // Center the line
  },
  levelIndicator: {
    width: '100%',
    height: 2,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
  },
  dashedLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#0088CC',
    transform: [{ scale: 1.5 }],
  },
  completedDot: {
    backgroundColor: '#00FF00',
  },
  angleIndicator: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  angleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 5,
  },
});

export default CameraOverlay;
