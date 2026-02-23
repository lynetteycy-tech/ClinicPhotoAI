import { useState, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CameraPermissionStatus, CameraState, PhotoAngle } from '../types/camera';

/**
 * Camera Hook - Phase 2 Implementation
 * 
 * This hook will be implemented when we start Phase 2.
 * Manages camera state, permissions, and functionality.
 */
export const useCamera = () => {
  const [cameraState, setCameraState] = useState<CameraState>({
    isActive: false,
    currentPosition: 'front',
    permissionStatus: 'not-determined',
    currentAngle: 'front',
    capturedPhotos: [],
    isRecording: false,
    countdown: 0,
  });

  const devices = useCameraDevices();
  const device = devices.find(d => d.position === cameraState.currentPosition);

  // Request camera permission
  const requestPermission = async (): Promise<boolean> => {
    try {
      // This will be implemented with expo-camera
      const status = await Camera.requestCameraPermissions();
      setCameraState(prev => ({
        ...prev,
        permissionStatus: status.granted ? 'granted' : 'denied'
      }));
      return status.granted;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setCameraState(prev => ({ ...prev, permissionStatus: 'denied' }));
      return false;
    }
  };

  // Check camera permission
  const checkPermission = async (): Promise<CameraPermissionStatus> => {
    try {
      // This will be implemented with expo-camera
      const status = await Camera.getCameraPermissions();
      const permissionStatus = status.granted ? 'granted' : 
                              status.canAskAgain ? 'not-determined' : 'denied';
      setCameraState(prev => ({ ...prev, permissionStatus }));
      return permissionStatus;
    } catch (error) {
      console.error('Error checking camera permission:', error);
      return 'denied';
    }
  };

  // Start camera
  const startCamera = async (): Promise<boolean> => {
    const hasPermission = await checkPermission();
    if (!hasPermission || hasPermission === 'denied') {
      const granted = await requestPermission();
      if (!granted) return false;
    }

    setCameraState(prev => ({ ...prev, isActive: true }));
    return true;
  };

  // Stop camera
  const stopCamera = () => {
    setCameraState(prev => ({ ...prev, isActive: false, isRecording: false }));
  };

  // Switch camera position
  const switchCamera = () => {
    setCameraState(prev => ({
      ...prev,
      currentPosition: prev.currentPosition === 'front' ? 'back' : 'front'
    }));
  };

  // Set current angle
  const setCurrentAngle = (angle: PhotoAngle) => {
    setCameraState(prev => ({ ...prev, currentAngle: angle }));
  };

  // Start recording
  const startRecording = () => {
    setCameraState(prev => ({
      ...prev,
      isRecording: true,
      countdown: 5
    }));
  };

  // Stop recording
  const stopRecording = () => {
    setCameraState(prev => ({
      ...prev,
      isRecording: false,
      countdown: 0
    }));
  };

  // Update countdown
  const updateCountdown = (countdown: number) => {
    setCameraState(prev => ({ ...prev, countdown }));
  };

  // Add captured photo
  const addCapturedPhoto = (photoUri: string) => {
    const newPhoto = {
      id: Date.now().toString(),
      angle: cameraState.currentAngle,
      uri: photoUri,
      timestamp: new Date(),
      accepted: false,
    };

    setCameraState(prev => ({
      ...prev,
      capturedPhotos: [...prev.capturedPhotos, newPhoto]
    }));
  };

  // Clear captured photos
  const clearCapturedPhotos = () => {
    setCameraState(prev => ({ ...prev, capturedPhotos: [] }));
  };

  // Initialize permissions on mount
  useEffect(() => {
    checkPermission();
  }, []);

  return {
    // State
    cameraState,
    device,
    
    // Actions
    requestPermission,
    checkPermission,
    startCamera,
    stopCamera,
    switchCamera,
    setCurrentAngle,
    startRecording,
    stopRecording,
    updateCountdown,
    addCapturedPhoto,
    clearCapturedPhotos,
    
    // Computed values
    hasPermission: cameraState.permissionStatus === 'granted',
    isReady: device !== undefined && cameraState.isActive,
    canRecord: cameraState.isRecording && cameraState.countdown > 0,
  };
};
