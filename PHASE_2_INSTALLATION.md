# 📸 PHASE 2: INSTALLATION COMMANDS

## 🚀 **Installation Commands (Ready to Run)**

### **Step 1: Install Camera Dependencies**
```bash
npx expo install expo-camera expo-av expo-haptics
```

### **Step 2: Install Image Processing**
```bash
npx expo install expo-image-manipulator expo-image-picker
```

### **Step 3: Update app.json**
```bash
# Add these plugins to app.json:
{
  "expo": {
    "plugins": [
      "expo-camera",
      "expo-av", 
      "expo-haptics",
      "expo-image-manipulator",
      "expo-image-picker"
    ]
  }
}
```

### **Step 4: Rebuild EAS Build**
```bash
npx eas build --platform android --profile development
```

## 📦 **Dependencies Being Added**

### **Camera & Media**
- `expo-camera: ~15.0.0` - Camera permissions and API
- `expo-av: ~14.0.0` - Audio/Video recording
- `expo-haptics: ~13.0.0` - Haptic feedback

### **Image Processing**
- `expo-image-manipulator: ~12.0.0` - Image processing
- `expo-image-picker: ~15.0.0` - Gallery access

## ⚠️ **Important Notes**

### **Permissions Required**
- Camera access
- Photo library access
- Storage access

### **File Changes**
- `app.json` - Add plugins configuration
- `eas.json` - May need updates for new permissions

### **Testing Required**
- Camera permissions flow
- Photo capture functionality
- File storage system

## 🔄 **Installation Order**

1. **Install dependencies** (Step 1 & 2)
2. **Update app.json** (Step 3)
3. **Test locally** with `npm start`
4. **Build with EAS** (Step 4)
5. **Test on device**

## 📱 **Testing After Installation**

### **Basic Tests**
- [ ] App builds successfully
- [ ] Camera permissions requested
- [ ] Camera preview shows
- [ ] Can capture photos

### **Integration Tests**
- [ ] Camera component renders
- [ ] Angle indicator works
- [ ] Photo capture saves files
- [ ] File naming convention works

## 🛠️ **Files Ready for Implementation**

### **Components**
- `components/Camera/CameraComponent.tsx` ✅
- `components/Camera/AngleIndicator.tsx` ✅

### **Hooks**
- `hooks/useCamera.ts` ✅

### **Utils**
- `utils/camera.ts` ✅
- `utils/fileSystem.ts` ✅

### **Types**
- `types/camera.ts` ✅
- `types/photo.ts` ✅

## 🎯 **Next Steps After Installation**

1. **Test basic camera functionality**
2. **Implement Step 2.1: Camera Setup**
3. **Test camera preview**
4. **Move to Step 2.2: 5-Angle Flow**

---

*Prepared: 2026-02-23*
*Status: Ready for Installation*
