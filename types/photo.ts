export interface PhotoMetadata {
  patientName: string;
  registrationNumber: string;
  timestamp: Date;
  angle: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  lighting: 'good' | 'poor';
  blurScore: number;
  faceCoverage: number;
}

export interface PhotoFile {
  uri: string;
  fileName: string;
  metadata: PhotoMetadata;
  size: number;
  format: string;
}

export interface PhotoStorage {
  savePhoto: (photo: PhotoFile) => Promise<string>;
  getPhoto: (fileName: string) => Promise<PhotoFile | null>;
  deletePhoto: (fileName: string) => Promise<boolean>;
  getAllPhotos: (patientId: string) => Promise<PhotoFile[]>;
}

export interface PhotoQualityMetrics {
  blurScore: number; // 0-100, higher is better
  lightingScore: number; // 0-100, higher is better
  faceCoverage: number; // 0-100, percentage of frame covered by face
  sharpness: number; // 0-100, edge detection score
  overallQuality: number; // 0-100, weighted average
}

export interface PhotoValidationResult {
  isValid: boolean;
  quality: PhotoQualityMetrics;
  issues: string[];
  recommendations: string[];
}
