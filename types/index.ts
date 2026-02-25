export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  PatientSearch: undefined;
  AddPatient: undefined;
  Consent: undefined;
  CaptureInstructions: undefined;
  Camera: { 
    angle?: string; 
    photoUri?: string; 
    photoAccepted?: boolean; 
    currentAngleIndex?: number;
    retakeAngle?: string;
    retakeIndex?: number;
    capturedPhotos?: string[];
  };
  PhotoReview: { angle: string; photoUri: string; currentAngleIndex: number };
  AngleReview: { angle: string; photoUri: string };
  GridReview: { capturedPhotos?: string[] };
  PatientGallery: { patientId: string };
};
