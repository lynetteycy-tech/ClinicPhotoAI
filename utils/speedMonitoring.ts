import { SpeedDetection } from '../types/faceDetection';

/**
 * Speed Monitoring Utilities - Phase 3 Implementation
 * 
 * These utilities will be implemented when we start Phase 3.
 * They monitor angular velocity and provide speed warnings.
 */

export const SPEED_MONITORING = {
  /**
   * Calculate angular velocity
   */
  calculateAngularVelocity: (
    currentAngle: number,
    previousAngle: number,
    currentTime: number,
    previousTime: number
  ): number => {
    const timeDiff = currentTime - previousTime;
    if (timeDiff === 0) return 0;
    
    const angleDiff = currentAngle - previousAngle;
    
    // Handle angle wrap-around
    if (angleDiff > 180) {
      return (angleDiff - 360) / (timeDiff / 1000); // degrees per second
    } else if (angleDiff < -180) {
      return (angleDiff + 360) / (timeDiff / 1000);
    }
    
    return angleDiff / (timeDiff / 1000); // degrees per second
  },

  /**
   * Check if movement is too fast
   */
  isTooFast: (velocity: number, threshold: number = 30): boolean => {
    return Math.abs(velocity) > threshold;
  },

  /**
   * Detect jerky movements
   */
  detectJerkyMovement: (
    velocities: number[],
    threshold: number = 50
  ): boolean => {
    if (velocities.length < 3) return false;
    
    // Check for sudden changes in velocity
    for (let i = 1; i < velocities.length; i++) {
      const acceleration = Math.abs(velocities[i] - velocities[i - 1]);
      if (acceleration > threshold) {
        return true;
      }
    }
    return false;
  },

  /**
   * Get speed warning level
   */
  getSpeedWarningLevel: (velocity: number): 'none' | 'slow' | 'fast' | 'very-fast' => {
    const absVelocity = Math.abs(velocity);
    
    if (absVelocity < 15) return 'none';
    if (absVelocity < 30) return 'slow';
    if (absVelocity < 60) return 'fast';
    return 'very-fast';
  },

  /**
   * Get speed warning message
   */
  getSpeedWarningMessage: (level: 'slow' | 'fast' | 'very-fast'): string => {
    switch (level) {
      case 'slow':
        return "Moving a bit fast - please slow down";
      case 'fast':
        return "Please move slower for better accuracy";
      case 'very-fast':
        return "Too fast! Please slow down significantly";
      default:
        return "";
    }
  },

  /**
   * Smooth velocity measurements
   */
  smoothVelocity: (
    current: number,
    previous: number,
    smoothingFactor: number = 0.3
  ): number => {
    return previous + (current - previous) * smoothingFactor;
  },

  /**
   * Calculate average speed over time window
   */
  getAverageSpeed: (velocities: number[]): number => {
    if (velocities.length === 0) return 0;
    return velocities.reduce((sum, v) => sum + Math.abs(v), 0) / velocities.length;
  },

  /**
   * Check if movement is consistent
   */
  isMovementConsistent: (
    velocities: number[],
    varianceThreshold: number = 10
  ): boolean => {
    if (velocities.length < 2) return true;
    
    const avg = SPEED_MONITORING.getAverageSpeed(velocities);
    const variance = velocities.reduce((sum, v) => {
      return sum + Math.pow(v - avg, 2);
    }, 0) / velocities.length;
    
    return Math.sqrt(variance) < varianceThreshold;
  },

  /**
   * Get movement quality score (0-100)
   */
  getMovementQuality: (velocities: number[]): number => {
    if (velocities.length === 0) return 100;
    
    const avgSpeed = SPEED_MONITORING.getAverageSpeed(velocities);
    const maxSpeed = Math.max(...velocities.map(Math.abs));
    
    // Lower speeds are better for accuracy
    const speedScore = Math.max(0, 100 - (avgSpeed / 50) * 100);
    const consistencyScore = SPEED_MONITORING.isMovementConsistent(velocities) ? 100 : 50;
    
    return (speedScore + consistencyScore) / 2;
  }
};

/**
 * Speed detection configuration
 */
export const SPEED_CONFIG = {
  maxVelocity: 100,        // Maximum expected velocity (deg/sec)
  warningThreshold: 30,    // Warning threshold (deg/sec)
  criticalThreshold: 60,   // Critical threshold (deg/sec)
  smoothingFactor: 0.3,    // Velocity smoothing
  historySize: 10,         // Number of previous measurements to keep
  varianceThreshold: 10,   // Movement variance threshold
};

/**
 * Speed monitoring state
 */
export interface SpeedMonitoringState {
  currentVelocity: number;
  velocityHistory: number[];
  isTooFast: boolean;
  warningLevel: 'none' | 'slow' | 'fast' | 'very-fast';
  lastUpdateTime: number;
  movementQuality: number;
  recommendations: string[];
}
