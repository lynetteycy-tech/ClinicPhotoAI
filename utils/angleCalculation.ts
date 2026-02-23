import { AngleMeasurement, AngleTarget, AngleValidationResult, AngleTolerance } from '../types/faceDetection';

/**
 * Angle Calculation Utilities - Phase 3 Implementation
 * 
 * These utilities will be implemented when we start Phase 3.
 * They calculate face angles and validate against targets.
 */

export const ANGLE_CALCULATION = {
  /**
   * Calculate angle difference
   */
  calculateDifference: (current: number, target: number): number => {
    const diff = Math.abs(current - target);
    // Handle wrap-around for angles (e.g., 179° vs -179°)
    if (diff > 180) {
      return 360 - diff;
    }
    return diff;
  },

  /**
   * Validate angle against tolerance
   */
  validateAngle: (
    current: AngleMeasurement,
    target: AngleTarget,
    tolerance: AngleTolerance
  ): AngleValidationResult => {
    const yawDifference = ANGLE_CALCULATION.calculateDifference(current.yaw, target.targetYaw);
    const pitchDifference = ANGLE_CALCULATION.calculateDifference(current.pitch, 0);
    const rollDifference = ANGLE_CALCULATION.calculateDifference(current.roll, 0);
    
    const yawValid = yawDifference <= tolerance.yaw;
    const pitchValid = pitchDifference <= tolerance.pitch;
    const rollValid = rollDifference <= tolerance.roll;
    
    const overallDifference = (yawDifference + pitchDifference + rollDifference) / 3;
    const isValid = yawValid && pitchValid && rollValid;
    
    return {
      isValid,
      yawDifference,
      pitchDifference,
      rollDifference,
      overallDifference,
      recommendations: ANGLE_CALCULATION.getRecommendations(
        yawDifference,
        pitchDifference,
        rollDifference,
        tolerance
      )
    };
  },

  /**
   * Get recommendations for angle correction
   */
  getRecommendations: (
    yawDiff: number,
    pitchDiff: number,
    rollDiff: number,
    tolerance: AngleTolerance
  ): string[] => {
    const recommendations: string[] = [];
    
    if (yawDiff > tolerance.yaw) {
      if (yawDiff > 45) {
        recommendations.push("Turn significantly to the " + (yawDiff > 0 ? "right" : "left"));
      } else {
        recommendations.push("Turn slightly to the " + (yawDiff > 0 ? "right" : "left"));
      }
    }
    
    if (pitchDiff > tolerance.pitch) {
      if (pitchDiff > 15) {
        recommendations.push(pitchDiff > 0 ? "Tilt your head down" : "Tilt your head up");
      } else {
        recommendations.push(pitchDiff > 0 ? "Tilt head down slightly" : "Tilt head up slightly");
      }
    }
    
    if (rollDiff > tolerance.roll) {
      if (rollDiff > 15) {
        recommendations.push(rollDiff > 0 ? "Tilt your head clockwise" : "Tilt your head counter-clockwise");
      } else {
        recommendations.push(rollDiff > 0 ? "Tilt head clockwise slightly" : "Tilt head counter-clockwise slightly");
      }
    }
    
    return recommendations;
  },

  /**
   * Calculate angle accuracy score (0-100)
   */
  calculateAccuracy: (
    current: AngleMeasurement,
    target: AngleTarget,
    tolerance: AngleTolerance
  ): number => {
    const validation = ANGLE_CALCULATION.validateAngle(current, target, tolerance);
    
    // Calculate accuracy based on how close to target
    const yawScore = Math.max(0, 100 - (validation.yawDifference / tolerance.yaw) * 100);
    const pitchScore = Math.max(0, 100 - (validation.pitchDifference / tolerance.pitch) * 100);
    const rollScore = Math.max(0, 100 - (validation.rollDifference / tolerance.roll) * 100);
    
    // Weight yaw more heavily (most important for our use case)
    return (yawScore * 0.6 + pitchScore * 0.2 + rollScore * 0.2);
  },

  /**
   * Smooth angle measurements
   */
  smoothAngle: (
    current: AngleMeasurement,
    previous: AngleMeasurement,
    smoothingFactor: number = 0.3
  ): AngleMeasurement => {
    return {
      yaw: previous.yaw + (current.yaw - previous.yaw) * smoothingFactor,
      pitch: previous.pitch + (current.pitch - previous.pitch) * smoothingFactor,
      roll: previous.roll + (current.roll - previous.roll) * smoothingFactor,
      confidence: previous.confidence + (current.confidence - previous.confidence) * smoothingFactor,
    };
  },

  /**
   * Check if angle is stable
   */
  isAngleStable: (
    measurements: AngleMeasurement[],
    threshold: number = 2,
    timeWindow: number = 1000
  ): boolean => {
    if (measurements.length < 2) return false;
    
    const recent = measurements.slice(-threshold);
    const timeSpan = recent[recent.length - 1].timestamp - recent[0].timestamp;
    
    if (timeSpan > timeWindow) return false;
    
    // Check if all recent measurements are within tolerance
    const avgYaw = recent.reduce((sum, m) => sum + m.yaw, 0) / recent.length;
    const avgPitch = recent.reduce((sum, m) => sum + m.pitch, 0) / recent.length;
    const avgRoll = recent.reduce((sum, m) => sum + m.roll, 0) / recent.length;
    
    return recent.every(m => 
      Math.abs(m.yaw - avgYaw) < 2 &&
      Math.abs(m.pitch - avgPitch) < 5 &&
      Math.abs(m.roll - avgRoll) < 3
    );
  },

  /**
   * Get angle direction for guidance
   */
  getGuidanceDirection: (
    current: number,
    target: number
  ): 'left' | 'right' | 'up' | 'down' | 'none' => {
    const diff = target - current;
    
    if (Math.abs(diff) < 1) return 'none';
    
    // For yaw (left/right rotation)
    if (Math.abs(diff) > 90) {
      return diff > 0 ? 'right' : 'left';
    }
    
    return diff > 0 ? 'right' : 'left';
  }
};

/**
 * Default angle tolerances
 */
export const DEFAULT_TOLERANCES: AngleTolerance = {
  yaw: 1,      // ±1° for yaw (most important)
  pitch: 5,    // ±5° for pitch (less critical)
  roll: 3      // ±3° for roll (moderate importance)
};

/**
 * Angle target configurations
 */
export const ANGLE_TARGETS: Record<string, AngleTarget> = {
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
