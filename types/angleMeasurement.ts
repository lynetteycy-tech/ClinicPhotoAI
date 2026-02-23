import { AngleMeasurement, AngleTarget } from './faceDetection';

export interface AngleCalculationResult {
  angle: AngleMeasurement;
  target: AngleTarget;
  difference: number;
  isValid: boolean;
  recommendations: string[];
}

export interface AngleHistory {
  timestamp: number;
  angle: AngleMeasurement;
  isValid: boolean;
  speed: number;
}

export interface AngleTolerance {
  yaw: number;    // ±1° for most angles
  pitch: number;  // ±5° for pitch
  roll: number;   // ±3° for roll
}

export interface AngleValidationResult {
  isWithinTolerance: boolean;
  yawDifference: number;
  pitchDifference: number;
  rollDifference: number;
  overallDifference: number;
  recommendations: string[];
}

export interface AngleProgress {
  currentAngle: string;
  nextAngle: string;
  completed: string[];
  totalAngles: number;
  progress: number; // 0-100
}

export interface AngleGuidance {
  targetAngle: AngleTarget;
  currentAngle: AngleMeasurement;
  status: 'too-far-left' | 'too-far-right' | 'too-high' | 'too-low' | 'tilted' | 'perfect';
  instructions: string;
  visualIndicators: {
    showArrow: boolean;
    arrowDirection: 'left' | 'right' | 'up' | 'down';
    showGreenBox: boolean;
    showRedBox: boolean;
  };
}

export interface AngleCalibration {
  deviceCalibration: {
    yawOffset: number;
    pitchOffset: number;
    rollOffset: number;
  };
  userCalibration: {
    personalTolerance: AngleTolerance;
    preferredAngles: AngleTarget[];
  };
}

export interface AngleMetrics {
  accuracy: number;        // How close to target (0-100)
  consistency: number;      // How stable the angle is
  speed: number;           // How fast user is moving
  totalTime: number;       // Time to reach target angle
}

export const DEFAULT_ANGLE_TARGETS: Record<string, AngleTarget> = {
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

export const DEFAULT_TOLERANCES: AngleTolerance = {
  yaw: 1,      // ±1° for yaw (most important)
  pitch: 5,    // ±5° for pitch (less critical)
  roll: 3      // ±3° for roll (moderate importance)
};
