// Simple global photo storage for camera session
let capturedPhotos: string[] = new Array(5).fill('');
let currentPatientId: string = 'TEST_PATIENT';

export const PhotoStorage = {
  // Set current patient ID for naming convention
  setPatientId(patientId: string): void {
    currentPatientId = patientId;
  },
  
  // Get current patient ID
  getPatientId(): string {
    return currentPatientId;
  },
  
  // Generate proper filename
  generateFilename(angle: string): string {
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, -5); // Remove milliseconds and Z
    
    const angleClean = angle.replace(/[°\s]/g, '');
    return `${currentPatientId}_${angleClean}_${timestamp}.jpg`;
  },
  
  // Get all captured photos
  getPhotos(): string[] {
    return [...capturedPhotos];
  },
  
  // Set photo at specific angle index
  setPhoto(index: number, uri: string): void {
    capturedPhotos[index] = uri;
  },
  
  // Get photo at specific angle index
  getPhoto(index: number): string {
    return capturedPhotos[index];
  },
  
  // Clear all photos (for new session)
  clearPhotos(): void {
    capturedPhotos = new Array(5).fill('');
  },
  
  // Check if all photos are captured
  isComplete(): boolean {
    return capturedPhotos.every(photo => photo !== '');
  }
};
