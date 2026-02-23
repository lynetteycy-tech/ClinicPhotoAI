import { CameraPosition, PhotoAngle } from '../types/camera';

/**
 * Camera utility functions for Phase 2 implementation
 */

export const CAMERA_UTILS = {
  /**
   * Generate filename for captured photo
   * Format: LASTNAME_FIRSTNAME_YYYYMMDD_HHMM_ANGLE.jpg
   */
  generatePhotoFileName: (
    patientName: string,
    timestamp: Date,
    angle: PhotoAngle
  ): string => {
    const name = patientName.toUpperCase().replace(/\s+/g, '_');
    const date = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
    const time = timestamp.toTimeString().slice(0, 5).replace(/:/g, '');
    const angleUpper = angle.toUpperCase();
    
    return `${name}_${date}_${time}_${angleUpper}.jpg`;
  },

  /**
   * Get next angle in sequence
   */
  getNextAngle: (currentAngle: PhotoAngle): PhotoAngle => {
    const sequence: PhotoAngle[] = ['front', 'left45', 'left90', 'right45', 'right90'];
    const currentIndex = sequence.indexOf(currentAngle);
    return sequence[(currentIndex + 1) % sequence.length];
  },

  /**
   * Check if angle is last in sequence
   */
  isLastAngle: (angle: PhotoAngle): boolean => {
    return angle === 'right90';
  },

  /**
   * Get angle display name
   */
  getAngleDisplayName: (angle: PhotoAngle): string => {
    const displayNames: Record<PhotoAngle, string> = {
      front: 'Front',
      left45: '45° Left',
      left90: '90° Left',
      right45: '45° Right',
      right90: '90° Right'
    };
    return displayNames[angle];
  },

  /**
   * Calculate angle progress percentage
   */
  getAngleProgress: (currentAngle: PhotoAngle): number => {
    const sequence: PhotoAngle[] = ['front', 'left45', 'left90', 'right45', 'right90'];
    const currentIndex = sequence.indexOf(currentAngle);
    return ((currentIndex + 1) / sequence.length) * 100;
  },

  /**
   * Get camera position for angle
   */
  getCameraPosition: (angle: PhotoAngle): CameraPosition => {
    // For consistency, use front camera for all angles
    return 'front';
  },

  /**
   * Format countdown timer
   */
  formatCountdown: (seconds: number): string => {
    return seconds.toString().padStart(2, '0');
  },

  /**
   * Check if device supports camera
   */
  checkCameraSupport: async (): Promise<boolean> => {
    try {
      // This will be implemented with expo-camera
      return true;
    } catch (error) {
      console.error('Camera not supported:', error);
      return false;
    }
  }
};

/**
 * File system utilities for photo storage
 */
export const FILE_SYSTEM_UTILS = {
  /**
   * Create directory for patient photos
   */
  createPatientDirectory: async (patientId: string): Promise<string> => {
    // This will be implemented with expo-file-system
    return `photos/${patientId}`;
  },

  /**
   * Get file path for photo
   */
  getPhotoPath: (patientId: string, fileName: string): string => {
    return `photos/${patientId}/${fileName}`;
  },

  /**
   * Check if file exists
   */
  fileExists: async (path: string): Promise<boolean> => {
    // This will be implemented with expo-file-system
    return false;
  },

  /**
   * Get file size
   */
  getFileSize: async (uri: string): Promise<number> => {
    // This will be implemented with expo-file-system
    return 0;
  }
};

/**
 * Permission utilities
 */
export const PERMISSION_UTILS = {
  /**
   * Request camera permission
   */
  requestCameraPermission: async (): Promise<boolean> => {
    // This will be implemented with expo-camera
    return false;
  },

  /**
   * Check camera permission status
   */
  checkCameraPermission: async (): Promise<string> => {
    // This will be implemented with expo-camera
    return 'not-determined';
  },

  /**
   * Request photo library permission
   */
  requestPhotoLibraryPermission: async (): Promise<boolean> => {
    // This will be implemented with expo-image-picker
    return false;
  }
};
