import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from '../types';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const route = useRoute<any>();
  
  // Camera permissions
  const { hasPermission, requestPermission } = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  
  // Get initial angle index from route params or default to 0
  const initialAngleIndex = route.params?.currentAngleIndex || 0;
  const [currentAngleIndex, setCurrentAngleIndex] = useState(initialAngleIndex);
  const [isCameraActive, setIsCameraActive] = useState(true);
  
  const angles = ['Front', 'Left 45°', 'Left 90°', 'Right 45°', 'Right 90°'];
  const currentAngle = angles[currentAngleIndex];

  // Request camera permission on mount
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Check if we're coming back from photo review (accepted photo)
  useEffect(() => {
    if (route.params?.photoAccepted) {
      // Move to next angle if photo was accepted
      setTimeout(() => {
        if (currentAngleIndex < angles.length - 1) {
          setCurrentAngleIndex(currentAngleIndex + 1);
        } else {
          // All angles done, go to grid review
          navigation.navigate('GridReview');
        }
      }, 100);
    }
  }, [route.params?.photoAccepted, currentAngleIndex, angles.length, navigation]);

  const handleCapturePhoto = async () => {
    if (!device) {
      Alert.alert('Error', 'Camera device not available');
      return;
    }

    try {
      // For now, simulate photo capture with test data
      // TODO: Implement actual photo capture with react-native-vision-camera
      const photoUri = 'https://via.placeholder.com/300x400';
      
      // Navigate to photo review with current angle and photo
      navigation.navigate('PhotoReview', { 
        angle: currentAngle, 
        photoUri: photoUri,
        currentAngleIndex: currentAngleIndex
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo');
      console.error('Photo capture error:', error);
    }
  };

  const handleNextAngle = () => {
    if (currentAngleIndex < angles.length - 1) {
      setCurrentAngleIndex(currentAngleIndex + 1);
    } else {
      // All angles done, go to grid review
      navigation.navigate('GridReview');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>Please grant camera permission to take photos</Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Not Available</Text>
          <Text style={styles.permissionText}>No camera device found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Camera</Text>
        <Text style={styles.currentAngle}>Target: {currentAngle}</Text>
        <Text style={styles.progress}>Angle {currentAngleIndex + 1} of {angles.length}</Text>
      </View>
      
      <View style={styles.content}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={isCameraActive}
          photo={true}
        />
        
        <View style={styles.overlay}>
          <View style={styles.angleIndicator}>
            <Text style={styles.angleText}>{currentAngle}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleCapturePhoto}
          >
            <Text style={styles.captureButtonText}>Capture {currentAngle}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleNextAngle}
          >
            <Text style={styles.skipButtonText}>Skip Angle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  currentAngle: {
    fontSize: 18,
    color: '#0088CC',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  progress: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  angleIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  angleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    gap: 16,
  },
  captureButton: {
    backgroundColor: '#0088CC',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: '#333333',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#0088CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;
