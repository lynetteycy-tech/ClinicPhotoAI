import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Camera } from 'expo-camera';

export interface PermissionStatus {
  camera: boolean;
  loading: boolean;
  error: string | null;
}

export const usePermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>({
    camera: false,
    loading: true,
    error: null,
  });

  const requestCameraPermission = async () => {
    try {
      setPermissionStatus(prev => ({ ...prev, loading: true, error: null }));

      if (Platform.OS === 'web') {
        // Web permissions handled differently
        setPermissionStatus(prev => ({ ...prev, camera: true, loading: false }));
        return true;
      }

      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status === 'granted') {
        setPermissionStatus(prev => ({ ...prev, camera: true, loading: false }));
        return true;
      } else {
        setPermissionStatus(prev => ({
          ...prev,
          camera: false,
          loading: false,
          error: 'Camera permission is required to use this feature'
        }));
        return false;
      }
    } catch (error) {
      setPermissionStatus(prev => ({
        ...prev,
        camera: false,
        loading: false,
        error: 'Failed to request camera permission'
      }));
      return false;
    }
  };

  const checkCameraPermission = async () => {
    try {
      setPermissionStatus(prev => ({ ...prev, loading: true, error: null }));

      if (Platform.OS === 'web') {
        setPermissionStatus(prev => ({ ...prev, camera: true, loading: false }));
        return true;
      }

      const { status } = await Camera.getCameraPermissionsAsync();
      
      setPermissionStatus(prev => ({
        ...prev,
        camera: status === 'granted',
        loading: false
      }));
      
      return status === 'granted';
    } catch (error) {
      setPermissionStatus(prev => ({
        ...prev,
        camera: false,
        loading: false,
        error: 'Failed to check camera permission'
      }));
      return false;
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return {
    permissionStatus,
    requestCameraPermission,
    checkCameraPermission,
  };
};
