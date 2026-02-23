export type CameraPermissionStatus = 'granted' | 'denied' | 'not-determined';

export type CameraPosition = 'front' | 'back';

export type PhotoAngle = 'front' | 'left45' | 'left90' | 'right45' | 'right90';

export interface PhotoCapture {
  id: string;
  angle: PhotoAngle;
  uri: string;
  timestamp: Date;
  accepted: boolean;
}

export interface CameraState {
  isActive: boolean;
  currentPosition: CameraPosition;
  permissionStatus: CameraPermissionStatus;
  currentAngle: PhotoAngle;
  capturedPhotos: PhotoCapture[];
  isRecording: boolean;
  countdown: number;
}

export interface AngleTarget {
  angle: PhotoAngle;
  targetYaw: number;
  tolerance: number;
  displayName: string;
}

export const ANGLE_TARGETS: Record<PhotoAngle, AngleTarget> = {
  front: {
    angle: 'front',
    targetYaw: 0,
    tolerance: 1,
    displayName: 'Front'
  },
  left45: {
    angle: 'left45',
    targetYaw: 45,
    tolerance: 1,
    displayName: '45° Left'
  },
  left90: {
    angle: 'left90',
    targetYaw: 90,
    tolerance: 1,
    displayName: '90° Left'
  },
  right45: {
    angle: 'right45',
    targetYaw: -45,
    tolerance: 1,
    displayName: '45° Right'
  },
  right90: {
    angle: 'right90',
    targetYaw: -90,
    tolerance: 1,
    displayName: '90° Right'
  }
};

export const ANGLE_SEQUENCE: PhotoAngle[] = [
  'front',
  'left45',
  'left90',
  'right45',
  'right90'
];
