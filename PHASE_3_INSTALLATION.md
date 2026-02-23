# 🤖 PHASE 3: AI FACE DETECTION - INSTALLATION COMMANDS

## 🚀 **Installation Commands (Ready to Run)**

### **Step 1: Install MLKit Dependencies**
```bash
npx expo install @react-native-mlkit/face-detection
npx expo install expo-vibration
```

### **Step 2: Update app.json**
```bash
# Add these plugins to app.json:
{
  "expo": {
    "plugins": [
      "@react-native-mlkit/face-detection",
      "expo-vibration"
    ]
  }
}
```

### **Step 3: Update eas.json (if needed)**
```bash
# May need to add MLKit configuration for EAS builds
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "bundleIdentifier": "com.lynetteycy.ClinicPhotoAI"
      },
      "android": {
        "bundleIdentifier": "com.lynetteycy.ClinicPhotoAI"
      }
    }
  }
}
```

### **Step 4: Rebuild EAS Build**
```bash
npx eas build --platform android --profile development
```

## 📦 **Dependencies Being Added**

### **MLKit & AI**
- `@react-native-mlkit/face-detection: ^2.0.0` - Google MLKit face detection
- `expo-vibration: ~13.0.0` - Haptic feedback API

### **Already Installed**
- `react-native-vision-camera: ^4.7.3` ✅
- `react-native-worklets-core: ^1.6.3` ✅
- `react-native-reanimated: ~4.1.1` ✅

## 📱 **Permissions Required for Phase 3**

### **Android Permissions**
- `CAMERA` - Camera access (from Phase 2)
- `VIBRATE` - Haptic feedback

### **iOS Permissions**
- `NSCameraUsageDescription` - Camera access (from Phase 2)

## 🏗️ **Phase 3 Implementation Plan**

### **Step 3.1: MLKit Integration**
- [ ] Install MLKit face detection
- [ ] Configure face detection in camera
- [ ] Add face overlay boxes
- [ ] Test face detection accuracy

### **Step 3.2: Angle Measurement**
- [ ] Implement yaw/pitch/roll detection
- [ ] Create angle display (current vs target)
- [ ] Add angle tolerance checking (±1°)
- [ ] Test angle accuracy

### **Step 3.3: Real-time Guidance**
- [ ] Add green face box when detected
- [ ] Show current angle in real-time
- [ ] Display target angle indicator
- [ ] Test real-time performance

### **Step 3.4: Speed Detection**
- [ ] Implement angular velocity calculation
- [ ] Add "move slower" warnings (>30°/sec)
- [ ] Add vibration for warnings
- [ ] Test speed detection accuracy

## 📁 **Files Ready for Implementation**

### **Components**
- `components/AI/FaceDetectionOverlay.tsx` ✅
- `components/AI/AngleDisplay.tsx` (placeholder)
- `components/AI/SpeedWarning.tsx` (placeholder)
- `components/AI/GuidanceOverlay.tsx` (placeholder)

### **Hooks**
- `hooks/useFaceDetection.ts` ✅
- `hooks/useAngleMeasurement.ts` (placeholder)
- `hooks/useSpeedDetection.ts` (placeholder)
- `hooks/useRealTimeGuidance.ts` (placeholder)

### **Utils**
- `utils/mlkit.ts` ✅
- `utils/angleCalculation.ts` ✅
- `utils/speedMonitoring.ts` ✅
- `utils/faceDetection.ts` (placeholder)

### **Types**
- `types/faceDetection.ts` ✅
- `types/angleMeasurement.ts` ✅

### **Worklets** (for performance)
- `worklets/faceDetectionWorklet.ts` (placeholder)
- `worklets/angleCalculationWorklet.ts` (placeholder)

## 🧪 **Testing Strategy**
1. **Unit Tests** - Individual MLKit functions
2. **Integration Tests** - Face detection + camera
3. **Performance Tests** - Real-time processing
4. **Accuracy Tests** - Angle measurement precision
5. **Device Tests** - Real device performance

## ⚠️ **Safety Protocols**
1. **Backup Phase 2 code** before any changes
2. **Test MLKit separately** before integration
3. **Gradual implementation** - one feature at a time
4. **Performance monitoring** - ensure no lag
5. **Rollback plan** - keep working backup

## 📊 **Performance Requirements**
- **Frame Rate**: Maintain 30+ FPS
- **Detection Speed**: <100ms per frame
- **Angle Accuracy**: ±1° tolerance
- **Memory Usage**: <100MB increase
- **Battery Impact**: Minimal

## 🎯 **Success Metrics**
- Face detection works in various lighting
- Angle measurement is accurate (±1°)
- Real-time display is smooth
- Speed warnings trigger appropriately
- Green box appears when face detected
- Performance is acceptable (no lag)

## 🔍 **Edge Cases to Handle**
- Multiple faces in frame
- Poor lighting conditions
- Face partially obscured
- Fast movements
- Face at extreme angles
- No face detected

## 📋 **Pre-Installation Checklist**
- [ ] Phase 2 features working correctly
- [ ] Camera integration stable
- [ ] Photo capture functional
- [ ] Git backup created
- [ ] Device ready for MLKit testing

## 🚀 **Ready to Start**
Once Phase 2 is complete and tested:
1. Install MLKit dependencies
2. Update app.json configuration
3. Start Step 3.1: MLKit Integration
4. Test each step before proceeding

---

*Prepared: 2026-02-23*
*Status: Ready for Phase 3 Implementation*
