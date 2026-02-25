// Simple global photo storage for camera session
let capturedPhotos: string[] = new Array(5).fill('');

export const PhotoStorage = {
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
