# 📸 PHASE 2: CAMERA INTEGRATION - PREPARATION PLAN

## 🎯 **Objective**: Implement basic camera functionality with 5-angle capture flow

## ✅ **Already Installed Dependencies**
- `react-native-vision-camera: ^4.7.3` ✅
- `expo-file-system: ~19.0.21` ✅
- `expo-media-library: ~18.2.1` ✅
- `react-native-reanimated: ~4.1.1` ✅
- `react-native-worklets-core: ^1.6.3` ✅

## 📦 **Additional Dependencies Needed for Phase 2**

### **Camera Permissions & Configuration**
- `expo-camera: ~15.0.0` - Camera permissions and basic camera API
- `expo-av: ~14.0.0` - Audio/Video handling for recording
- `expo-haptics: ~13.0.0` - Haptic feedback for warnings

### **Image Processing**
- `expo-image-manipulator: ~12.0.0` - Image processing and quality checks
- `expo-image-picker: ~15.0.0` - Fallback for gallery access

### **File System & Storage**
- `@react-native-async-storage/async-storage: 2.2.0` ✅ (already installed)
- `expo-file-system: ~19.0.21` ✅ (already installed)

## 🔧 **Installation Commands (Ready to Run)**
```bash
# Camera and permissions
npx expo install expo-camera expo-av expo-haptics

# Image processing
npx expo install expo-image-manipulator expo-image-picker
```

## 📱 **Permissions Required for Phase 2**

### **app.json Updates Needed**
```json
{
  "expo": {
    "plugins": [
      "expo-camera",
      "expo-av",
      "expo-image-manipulator",
      "expo-image-picker",
      "expo-haptics"
    ]
  }
}
```

### **Android Permissions**
- `CAMERA` - Camera access
- `WRITE_EXTERNAL_STORAGE` - Save photos
- `READ_EXTERNAL_STORAGE` - Access gallery

### **iOS Permissions**
- `NSCameraUsageDescription` - Camera access
- `NSPhotoLibraryUsageDescription` - Photo library access

## 🏗️ **Phase 2 Implementation Plan**

### **Step 2.1: Camera Setup**
- [ ] Install additional dependencies
- [ ] Configure app.json with camera plugins
- [ ] Create camera permissions handling
- [ ] Build basic camera component
- [ ] Test camera preview

### **Step 2.2: 5-Angle Flow**
- [ ] Create angle sequence logic
- [ ] Add angle indicators UI
- [ ] Implement angle progress tracker
- [ ] Test angle transitions

### **Step 2.3: Photo Capture**
- [ ] Implement photo capture function
- [ ] Create file naming system
- [ ] Add photo storage logic
- [ ] Test capture and save

### **Step 2.4: Integration Testing**
- [ ] Test full 5-angle flow
- [ ] Verify photo quality
- [ ] Test retake functionality
- [ ] Test navigation integration

## 📁 **File Structure for Phase 2**
```
src/
├── components/
│   ├── Camera/
│   │   ├── CameraComponent.tsx
│   │   ├── AngleIndicator.tsx
│   │   ├── CaptureButton.tsx
│   │   └── PhotoPreview.tsx
│   └── UI/
│       ├── AngleProgress.tsx
│       └── CaptureControls.tsx
├── hooks/
│   ├── useCamera.ts
│   ├── usePermissions.ts
│   └── usePhotoCapture.ts
├── utils/
│   ├── camera.ts
│   ├── fileSystem.ts
│   └── angleDetection.ts
└── types/
    ├── camera.ts
    └── photo.ts
```

## 🧪 **Testing Strategy**
1. **Unit Tests** - Individual component testing
2. **Integration Tests** - Full camera flow testing
3. **Device Tests** - Real device camera testing
4. **Permission Tests** - Camera permission handling

## ⚠️ **Safety Protocols**
1. **Backup existing code** before any changes
2. **Test on simulator first**, then device
3. **Gradual implementation** - one step at a time
4. **Rollback plan** - keep working backup

## 📋 **Pre-Installation Checklist**
- [ ] Current app builds and runs successfully
- [ ] EAS build completed and tested
- [ ] Git backup created
- [ ] Phase 1 features confirmed working
- [ ] Device ready for testing

## 🚀 **Ready to Start**
Once you confirm the current build works:
1. Run installation commands
2. Update app.json
3. Start Step 2.1: Camera Setup
4. Test each step before proceeding

---

*Prepared: 2026-02-23*
*Status: Ready for Phase 2 Implementation*
