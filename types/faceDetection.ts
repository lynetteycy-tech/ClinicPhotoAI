export interface FaceDetectionResult {
  faces: DetectedFace[];
  timestamp: number;
  frameWidth: number;
  frameHeight: number;
}

export interface DetectedFace {
  id: string;
  boundingBox: BoundingBox;
  landmarks: FaceLandmarks;
  yawAngle: number;
  pitchAngle: number;
  rollAngle: number;
  confidence: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceLandmarks {
  leftEye: Point;
  rightEye: Point;
  nose: Point;
  mouth: Point;
  leftEar: Point;
  rightEar: Point;
}

export interface Point {
  x: number;
  y: number;
}

export interface AngleMeasurement {
  yaw: number;        // Left/right rotation (-180 to 180)
  pitch: number;      // Up/down rotation (-90 to 90)
  roll: number;       // Tilt (-180 to 180)
  confidence: number; // 0-1, how confident we are in the measurement
}

export interface AngleTarget {
  angle: 'front' | 'left45' | 'left90' | 'right45' | 'right90';
  targetYaw: number;
  tolerance: number;
  displayName: string;
}

export interface AngleValidation {
  isValid: boolean;
  currentAngle: number;
  targetAngle: number;
  difference: number;
  tolerance: number;
  isWithinTolerance: boolean;
}

export interface SpeedDetection {
  currentSpeed: number;      // degrees per second
  isTooFast: boolean;         // >30°/sec
  warningTriggered: boolean;  // Should show warning
  lastUpdateTime: number;    // Timestamp of last measurement
}

export interface FaceDetectionConfig {
  minFaceSize: number;       // Minimum face size to detect
  confidenceThreshold: number; // Minimum confidence to accept
  detectionMode: 'fast' | 'accurate';
  classificationMode: 'all' | 'none';
}

export interface RealTimeGuidance {
  faceDetected: boolean;
  currentAngle: AngleMeasurement;
  targetAngle: AngleTarget;
  isAngleCorrect: boolean;
  speedWarning: SpeedDetection;
  lightingCondition: 'good' | 'poor';
  recommendations: string[];
}

export interface FaceDetectionState {
  isDetecting: boolean;
  lastDetection: FaceDetectionResult | null;
  currentGuidance: RealTimeGuidance;
  detectionHistory: FaceDetectionResult[];
  performance: {
    fps: number;
    detectionTime: number;
    accuracy: number;
  };
}
