import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from '../types';
import { PhotoStorage } from '../utils/PhotoStorage';

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
  const camera = useRef<Camera>(null);
  
  const angles = ['Front', 'Left 45°', 'Left 90°', 'Right 45°', 'Right 90°'];
  const currentAngle = angles[currentAngleIndex];

  // Request camera permission on mount
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Initialize photo storage on mount
  useEffect(() => {
    console.log('CameraScreen mounted. Current photos:', PhotoStorage.getPhotos());
  }, []);

  // Check if we're coming back from photo review (accepted photo)
  useEffect(() => {
    if (route.params?.photoAccepted) {
      // Move to next angle if photo was accepted
      setTimeout(() => {
        if (currentAngleIndex < angles.length - 1) {
          setCurrentAngleIndex(currentAngleIndex + 1);
        } else {
          // All angles done, go to grid review
          const photos = PhotoStorage.getPhotos();
          console.log('Navigating to GridReview with photos:', photos);
          navigation.navigate('GridReview' as any, { capturedPhotos: photos });
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
      // Take photo with react-native-vision-camera
      const photo = await camera.current?.takePhoto({
        flash: 'off',
        enableShutterSound: true,
      });

      if (photo) {
        // Save photo to global storage
        PhotoStorage.setPhoto(currentAngleIndex, photo.path);
        console.log(`Photo saved at index ${currentAngleIndex}:`, photo.path);
        console.log('All photos after save:', PhotoStorage.getPhotos());
        
        // Navigate to photo review with current angle and real photo
        navigation.navigate('PhotoReview' as any, { 
          angle: currentAngle, 
          photoUri: photo.path,
          currentAngleIndex: currentAngleIndex
        });
      }
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
      const photos = PhotoStorage.getPhotos();
      navigation.navigate('GridReview' as any, { capturedPhotos: photos });
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
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={isCameraActive}
          photo={true}
        />
        
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
