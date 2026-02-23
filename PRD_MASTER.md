CLINIC PHOTO AI - COMPLETE PRODUCT REQUIREMENTS DOCUMENT
1. EXECUTIVE SUMMARY
Product Vision
A universal iOS and Android app for medical aesthetic clinics that automatically captures standardized before/after patient photos from a guided video, with AI-powered face detection and angle measurement.

Target Users
Medical aesthetic clinics (primary)

Beauty salons and spas

Eyebrow embroidery studios

Any business needing facial before/after comparisons

Value Proposition
Consistent photos every time (5 standardized angles)

AI-powered guidance for perfect positioning

Time savings (5-second capture per angle)

Professional documentation for patient records

Easy export to clinic systems

2. CORE FEATURES
2.1 Patient Management
Feature	Description
Patient Search	Search by name, IC, or registration number
Add Patient	Name, IC, DOB, auto-generated alphanumeric registration number
Digital Consent	Signature capture on screen with timestamp
Session History	View all past sessions per patient
Gallery View	Grid of all patient photos organized by date
2.2 Guided Photo Capture - 5 Standard Angles
Angle	Target	Tolerance	Visual Guide
Front (0°)	Both eyes visible, nose centered	±1°	Face outline box
Left 45°	Right eye partially visible	±1°	Angle text: "45° Left"
Left 90°	Only left eye visible, nose past cheek	±1°	Angle text: "90° Left"
Right 45°	Left eye partially visible	±1°	Angle text: "45° Right"
Right 90°	Only right eye visible, nose past cheek	±1°	Angle text: "90° Right"
2.3 AI Face Detection
Real-time detection using Google MLKit

Face outline box (green when detected)

Current angle display (e.g., "32°")

Target angle indicator (e.g., "Target: 45° Left")

Speed warning: "Please move slower" (red text + vibration) if:

Angular velocity > 30° per second

Jerky movement detected

Poor lighting warning: "Adjust lighting - face too dark" before recording

2.4 Recording Flow
text
Step 1: User taps "Start Recording" for current angle
Step 2: 5-second countdown begins
Step 3: Patient moves slowly until correct angle detected
Step 4: App auto-extracts best frame at perfect angle
Step 5: Show extracted photo with Accept/Reject buttons
Step 6: If Accept → move to next angle
Step 7: If Reject → restart recording for SAME angle
Step 8: After all 5 angles accepted → show grid review
Step 9: Each photo can be individually retaken from grid
2.5 Photo Storage & Export
File Naming Convention:

text
LASTNAME_FIRSTNAME_YYYYMMDD_HHMM_ANGLE.jpg

Example: SMITH_JOHN_20260223_1430_FRONT.jpg
Example: SMITH_JOHN_20260223_1430_LEFT45.jpg
Example: SMITH_JOHN_20260223_1430_LEFT90.jpg
Example: SMITH_JOHN_20260223_1430_RIGHT45.jpg
Example: SMITH_JOHN_20260223_1430_RIGHT90.jpg
Storage:

Local: AsyncStorage for patient data

Local: File system for photos

Cloud: Supabase (Singapore region) - optional sync

Export:

Save all 5 photos to device gallery (individual files)

Organize in "Clinic Photo AI" folder

Share via iOS share sheet

2.6 Authentication & Subscription
Login Flow:

Required immediately on app open

Options: Login or Create Clinic Account

Clinic Registration:

Email, password, clinic name

Credit card input (Stripe)

Automatic account creation after payment

One login shared by all staff in clinic

Subscription Model:

Monthly subscription per clinic

Pricing tiers: Per 50 patients

Expired subscription = blocked access

Warning banner 7 days before expiry

Multi-branch Clinics:

Each branch needs separate account

Separate subscription per branch

3. TECHNICAL ARCHITECTURE
3.1 Tech Stack
Layer	Technology	Purpose
Frontend	React Native 0.76 + Expo SDK 52	Cross-platform app
Language	TypeScript	Type safety
Styling	NativeWind (Tailwind)	Notion-style UI
Navigation	React Navigation 6	Screen flow
Camera	VisionCamera v4	Video capture
Face Detection	Google MLKit (via VisionCamera)	Real-time angles
Local Storage	AsyncStorage + Expo FileSystem	Patient data + photos
Cloud	Supabase (Singapore region)	Backup + sync
Payments	Stripe SDK	Subscriptions
Auth	Supabase Auth	Clinic login
3.2 Database Schema (Supabase)
clinics

sql
id: uuid (primary)
name: string
email: string
subscription_status: string (active/expired)
stripe_customer_id: string
created_at: timestamp
staff (for future multi-staff)

sql
id: uuid
clinic_id: uuid (foreign key)
name: string
email: string
role: string (admin/staff)
patients

sql
id: uuid
clinic_id: uuid
name: string
ic_number: string (optional)
registration_number: string (auto-generated, unique)
dob: date
created_at: timestamp
sessions

sql
id: uuid
patient_id: uuid
date: timestamp
notes: text
photos

sql
id: uuid
session_id: uuid
angle_type: enum (front, left45, left90, right45, right90)
storage_path: string
accepted: boolean
created_at: timestamp
consent_records

sql
id: uuid
patient_id: uuid
signature_image_path: string
consent_date: timestamp
ip_address: string
3.3 AI/Angle Detection Logic
javascript
// Using MLKit from VisionCamera
const faces = await detectFaces(frame);
if (faces.length > 0) {
  const face = faces[0];
  const yaw = face.yawAngle;     // Left/right rotation (-180 to 180)
  const pitch = face.pitchAngle;  // Up/down rotation
  const roll = face.rollAngle;    // Tilt
  
  // Target angles
  const targetAngles = {
    'front': { yaw: 0, tolerance: 1 },
    'left45': { yaw: 45, tolerance: 1 },
    'left90': { yaw: 90, tolerance: 1 },
    'right45': { yaw: -45, tolerance: 1 },
    'right90': { yaw: -90, tolerance: 1 }
  };
  
  // Speed detection
  if (Math.abs(lastYaw - yaw) > 30) {
    showWarning("Please move slower");
  }
}
4. SCREEN SPECIFICATIONS
Screen 1: Login
text
┌──────────────────────┐
│                      │
│   Clinic Photo AI    │
│                      │
│   [Email Input]      │
│   [Password Input]   │
│                      │
│   [Login Button]     │
│                      │
│   Create Account →   │
│                      │
│   Forgot Password?   │
│                      │
└──────────────────────┘
Functionality:

Email/password validation

"Create Account" navigates to SignUp

"Forgot Password" sends reset email

Screen 2: Sign Up (New Clinic)
text
┌──────────────────────┐
│                      │
│   Create Account     │
│                      │
│   [Clinic Name]      │
│   [Email]            │
│   [Password]         │
│   [Confirm Password] │
│                      │
│   [Credit Card Info] │
│                      │
│   [✓] Terms & Privacy│
│                      │
│   [Create Account]   │
│                      │
└──────────────────────┘
Screen 3: Patient Search
text
┌──────────────────────┐
│ 🔍 Search patients   │
│                      │
│   + New Patient      │
│                      │
│   Recent Patients:   │
│   • John Smith       │
│   • Mary Johnson     │
│   • Robert Chen      │
│   • Sarah Lee        │
│                      │
└──────────────────────┘
Search: Filters by name, IC, registration number in real-time

Screen 4: Add Patient Form
text
┌──────────────────────┐
│   New Patient        │
│                      │
│   Full Name *        │
│   [_______________]  │
│                      │
│   IC/Passport        │
│   [_______________]  │
│                      │
│   Date of Birth      │
│   [DD/MM/YYYY ▼]     │
│                      │
│   Reg Number (auto)  │
│   [CLINIC001-2401]   │
│                      │
│   [Next]             │
│                      │
└──────────────────────┘
Screen 5: Consent Signature
text
┌──────────────────────┐
│   Patient Consent    │
│                      │
│   "I consent to      │
│    photos being taken│
│    for documentation"│
│                      │
│   ┌──────────────┐  │
│   │              │  │
│   │  Sign Here   │  │
│   │              │  │
│   └──────────────┘  │
│                      │
│   [Clear]  [Accept]  │
│                      │
└──────────────────────┘
Screen 6: Capture Instructions
text
┌──────────────────────┐
│   Capture Guide      │
│                      │
│   ⚠️ Remove glasses  │
│   ⚠️ Sweep hair back │
│                      │
│   [Diagram of 5      │
│    head positions]   │
│                      │
│   Lighting: ✅ Good  │
│                      │
│   [Start Recording]  │
│                      │
└──────────────────────┘
Screen 7: Camera View (Recording)
text
┌──────────────────────┐
│                      │
│    [🔴 0:05]         │
│                      │
│    ┌──────┐         │
│    │  👤  │ Face    │
│    │      │ outline │
│    └──────┘         │
│                      │
│   Target: Front 0°   │
│   Current: 2°        │
│                      │
│   [⟲] Retake         │
└──────────────────────┘
Screen 8: Single Photo Review
text
┌──────────────────────┐
│                      │
│   [Extracted Photo]  │
│                      │
│   Angle: Front       │
│                      │
│   [Reject]  [Accept] │
│                      │
└──────────────────────┘
Screen 9: Grid Review (All 5 Photos)
text
┌──────────────────────┐
│   Review All Photos  │
│                      │
│   ┌────┐ ┌────┐     │
│   │Front│ │L45 │     │
│   └────┘ └────┘     │
│   ┌────┐ ┌────┐     │
│   │L90 │ │R45 │     │
│   └────┘ └────┘     │
│   ┌────┐            │
│   │R90 │            │
│   └────┘            │
│                      │
│   [Retake] [Save All]│
└──────────────────────┘
Screen 10: Patient Gallery
text
┌──────────────────────┐
│   John Smith         │
│                      │
│   Feb 23, 2026       │
│   ┌────┐ ┌────┐     │
│   │ 📸 │ │ 📸 │     │
│   └────┘ └────┘     │
│                      │
│   Jan 15, 2026       │
│   ┌────┐ ┌────┐     │
│   │ 📸 │ │ 📸 │     │
│   └────┘ └────┘     │
│                      │
│   [+ New Session]    │
└──────────────────────┘
5. IMPLEMENTATION PHASES - DETAILED ROADMAP

### 📋 SAFETY PROTOCOLS (Apply Before Each Phase)

#### ⚠️ **Code Backup Protocol**
```bash
# 1. Create branch for new phase
git checkout -b phase-[number]-[feature-name]

# 2. Commit current working code
git add .
git commit -m "Phase [number] - [feature-name]: Backup before implementation"

# 3. Create safety tag
git tag -a "v1.0-phase-[number]-backup" -m "Backup before Phase [number]"
```

#### 🧪 **Testing Protocol**
- [ ] Current features still work
- [ ] No breaking changes to navigation
- [ ] App builds and runs successfully
- [ ] Backup branch created and pushed

#### 📝 **Documentation Protocol**
- [ ] Update this PRD with completed steps
- [ ] Note any deviations from plan
- [ ] Record issues and solutions

---

## 🏗️ PHASE 1: FOUNDATION (COMPLETED ✅)

### ✅ **Status: COMPLETED**
- All basic screens implemented
- Navigation structure complete
- Basic styling and design system
- Authentication flow working

### 📋 **Steps Completed**
1. ✅ Set up React Native + Expo + TypeScript
2. ✅ Configure navigation stack
3. ✅ Implement Login screen
4. ✅ Implement Sign Up screen  
5. ✅ Implement Patient Search screen
6. ✅ Implement Add Patient screen
7. ✅ Implement Consent screen
8. ✅ Implement Capture Instructions screen
9. ✅ Implement Photo Review screen
10. ✅ Implement Grid Review screen
11. ✅ Implement Patient Gallery screen
12. ✅ Test basic navigation and flows

---

## 📸 PHASE 2: CAMERA INTEGRATION (NEXT PHASE)

### 🎯 **Objective**: Implement basic camera functionality with 5-angle capture flow

### 📋 **Implementation Steps**

#### **Step 2.1: Camera Setup**
- [ ] Install react-native-vision-camera
- [ ] Configure camera permissions
- [ ] Create basic camera component
- [ ] Test camera preview

#### **Step 2.2: 5-Angle Flow**
- [ ] Implement angle sequence (Front → Left45 → Left90 → Right45 → Right90)
- [ ] Add angle indicators on screen
- [ ] Create angle progress tracker
- [ ] Test angle transitions

#### **Step 2.3: Photo Capture**
- [ ] Implement photo capture for each angle
- [ ] Save photos to local storage
- [ ] Create photo file naming convention
- [ ] Test photo capture and storage

#### **Step 2.4: Integration Testing**
- [ ] Test full 5-angle capture flow
- [ ] Verify photo quality and naming
- [ ] Test retake functionality
- [ ] Test navigation back to review screens

### 🔧 **Technical Requirements**
- react-native-vision-camera v4
- Camera permissions handling
- File system storage
- Photo naming: `LASTNAME_FIRSTNAME_YYYYMMDD_HHMM_ANGLE.jpg`

### 🧪 **Testing Checklist**
- [ ] Camera launches on all devices
- [ ] 5-angle flow works sequentially
- [ ] Photos capture and save correctly
- [ ] File naming convention followed
- [ ] Can retake individual angles
- [ ] Integration with existing screens works

---

## 🤖 PHASE 3: AI FACE DETECTION

### 🎯 **Objective**: Add MLKit face detection with real-time angle measurement

### 📋 **Implementation Steps**

#### **Step 3.1: MLKit Integration**
- [ ] Install Google MLKit face detection
- [ ] Configure face detection in camera
- [ ] Add face overlay boxes
- [ ] Test face detection accuracy

#### **Step 3.2: Angle Measurement**
- [ ] Implement yaw/pitch/roll detection
- [ ] Create angle display (current vs target)
- [ ] Add angle tolerance checking (±1°)
- [ ] Test angle accuracy

#### **Step 3.3: Real-time Guidance**
- [ ] Add green face box when detected
- [ ] Show current angle in real-time
- [ ] Display target angle indicator
- [ ] Test real-time performance

#### **Step 3.4: Speed Detection**
- [ ] Implement angular velocity calculation
- [ ] Add "move slower" warnings (>30°/sec)
- [ ] Add vibration for warnings
- [ ] Test speed detection accuracy

### 🔧 **Technical Requirements**
- MLKit face detection via VisionCamera
- Real-time angle calculation
- Speed monitoring algorithms
- Visual feedback system

### 🧪 **Testing Checklist**
- [ ] Face detection works in various lighting
- [ ] Angle measurement is accurate (±1°)
- [ ] Real-time display is smooth
- [ ] Speed warnings trigger appropriately
- [ ] Green box appears when face detected
- [ ] Performance is acceptable (no lag)

---

## 🌟 PHASE 4: ADVANCED AI FEATURES

### 🎯 **Objective**: Add intelligent photo capture and quality validation

### 📋 **Implementation Steps**

#### **Step 4.1: Auto-Capture**
- [ ] Implement auto-capture at perfect angles
- [ ] Add 5-second countdown timer
- [ ] Create best frame extraction algorithm
- [ ] Test auto-capture accuracy

#### **Step 4.2: Lighting Detection**
- [ ] Implement lighting quality analysis
- [ ] Add "adjust lighting" warnings
- [ ] Create lighting indicator (good/poor)
- [ ] Test in various lighting conditions

#### **Step 4.3: Photo Quality Validation**
- [ ] Add blur detection
- [ ] Implement face coverage checking
- [ ] Create quality score system
- [ ] Test quality validation

#### **Step 4.4: Enhanced Recording Flow**
- [ ] Implement complete recording workflow
- [ ] Add accept/reject for each photo
- [ ] Create retake same angle functionality
- [ ] Test complete flow end-to-end

### 🔧 **Technical Requirements**
- Frame extraction algorithms
- Lighting analysis algorithms
- Image quality validation
- Enhanced recording flow logic

### 🧪 **Testing Checklist**
- [ ] Auto-capture works at correct angles
- [ ] 5-second countdown functions properly
- [ ] Lighting warnings are accurate
- [ ] Photo quality validation works
- [ ] Complete flow is intuitive
- [ ] Performance remains smooth

---

## ☁️ PHASE 5: CLOUD BACKEND

### 🎯 **Objective**: Implement Supabase backend for data persistence and sync

### 📋 **Implementation Steps**

#### **Step 5.1: Supabase Setup**
- [ ] Create Supabase project (Singapore region)
- [ ] Set up database schema
- [ ] Configure authentication
- [ ] Test database connection

#### **Step 5.2: Patient Data Sync**
- [ ] Implement patient CRUD operations
- [ ] Add patient search functionality
- [ ] Create session management
- [ ] Test data sync reliability

#### **Step 5.3: Photo Storage**
- [ ] Configure Supabase storage
- [ ] Implement photo upload/download
- [ ] Add photo compression
- [ ] Test photo storage performance

#### **Step 5.4: Offline Support**
- [ ] Add local caching
- [ ] Implement sync when online
- [ ] Create conflict resolution
- [ ] Test offline/online scenarios

### 🔧 **Technical Requirements**
- Supabase client setup
- Database schema design
- Storage bucket configuration
- Offline-first architecture

### 🧪 **Testing Checklist**
- [ ] Database operations work reliably
- [ ] Photos upload/download correctly
- [ ] Authentication functions properly
- [ ] Offline support works
- [ ] Data sync is conflict-free
- [ ] Performance is acceptable

---

## 💳 PHASE 6: PAYMENTS & SUBSCRIPTIONS

### 🎯 **Objective**: Implement Stripe payment system and subscription management

### 📋 **Implementation Steps**

#### **Step 6.1: Stripe Integration**
- [ ] Install Stripe SDK
- [ ] Configure payment processing
- [ ] Create payment forms
- [ ] Test payment flow

#### **Step 6.2: Subscription Management**
- [ ] Create subscription tiers
- [ ] Implement subscription logic
- [ ] Add subscription status tracking
- [ ] Test subscription flow

#### **Step 6.3: Clinic Account Management**
- [ ] Add clinic registration
- [ ] Implement multi-staff support
- [ ] Create account settings
- [ ] Test account management

#### **Step 6.4: Payment Security**
- [ ] Implement secure payment handling
- [ ] Add receipt generation
- [ ] Create payment history
- [ ] Test security measures

### 🔧 **Technical Requirements**
- Stripe React Native SDK
- Payment form components
- Subscription logic
- Security best practices

### 🧪 **Testing Checklist**
- [ ] Payment processing works
- [ ] Subscriptions activate/deactivate properly
- [ ] Account management functions
- [ ] Security measures are effective
- [ ] Receipt generation works
- [ ] Error handling is robust

---

## 🎨 PHASE 7: POLISH & OPTIMIZATION

### 🎯 **Objective**: Refine UI/UX and optimize performance for production

### 📋 **Implementation Steps**

#### **Step 7.1: UI/UX Improvements**
- [ ] Add loading states and animations
- [ ] Implement proper error handling
- [ ] Create onboarding flow
- [ ] Add help and documentation

#### **Step 7.2: Performance Optimization**
- [ ] Optimize image processing
- [ ] Improve app startup time
- [ ] Reduce memory usage
- [ ] Test performance metrics

#### **Step 7.3: Accessibility**
- [ ] Add screen reader support
- [ ] Implement proper contrast ratios
- [ ] Add accessibility labels
- [ ] Test accessibility features

#### **Step 7.4: Production Preparation**
- [ ] Prepare app store assets
- [ ] Create privacy policy
- [ ] Add terms of service
- [ ] Test production build

### 🔧 **Technical Requirements**
- Animation libraries
- Performance monitoring
- Accessibility tools
- Production build configuration

### 🧪 **Testing Checklist**
- [ ] Animations are smooth
- [ ] Performance is optimized
- [ ] Accessibility features work
- [ ] Error handling is comprehensive
- [ ] Production build is stable
- [ ] App store requirements met

---

## 📊 PHASE TRACKING

### 📈 **Current Phase**: Phase 2 - Camera Integration
### 🎯 **Next Steps**: 
1. Complete Step 2.1: Camera Setup
2. Test camera functionality
3. Move to Step 2.2: 5-Angle Flow

### 📝 **Progress Log**
- ✅ Phase 1: Foundation - COMPLETED
- 🔄 Phase 2: Camera Integration - NEXT PHASE
- ⏳ Phase 3: AI Face Detection - PENDING
- ⏳ Phase 4: Advanced AI Features - PENDING
- ⏳ Phase 5: Cloud Backend - PENDING
- ⏳ Phase 6: Payments & Subscriptions - PENDING
- ⏳ Phase 7: Polish & Optimization - PENDING

---

## 🔄 DAILY WORKFLOW

### 📅 **Daily Routine**
1. **Morning**: Review previous day's progress
2. **Backup**: Create safety branch before changes
3. **Implement**: Work on current step
4. **Test**: Verify functionality works
5. **Document**: Update PRD with progress
6. **Commit**: Save work with clear messages

### 🎯 **Success Criteria**
- Each phase builds on previous without breaking existing features
- All features tested before moving to next phase
- Code is always backed up before major changes
- Documentation is kept up-to-date

---

## 📞 **Support & Contact**

### 🐛 **Bug Reporting**
- Document steps to reproduce
- Include screenshots/videos
- Note device and app version
- Provide expected vs actual behavior

### 💡 **Feature Requests**
- Describe the feature clearly
- Explain the use case
- Suggest implementation approach
- Prioritize importance level

### 🔄 **Change Requests**
- Clearly describe what needs changing
- Explain why the change is needed
- Suggest implementation approach
- Consider impact on other features

---

*Last Updated: 2026-02-23*
*Version: 1.0*
*Status: Phase 2 - Camera Integration (Next)*

6. DESIGN SYSTEM (Notion-Style)
Colors
css
:root {
  --background-primary: #FFFFFF;
  --background-secondary: #F5F5F7;
  --primary-blue: #0A84FF;
  --primary-blue-light: #E6F4FE;
  --success-green: #34C759;
  --warning-red: #FF3B30;
  --text-primary: #000000;
  --text-secondary: #666666;
  --border-light: #EEEEEE;
}
Typography
Headings: System Bold, 24px

Subheadings: System SemiBold, 20px

Body: System Regular, 16px

Labels: System Medium, 14px

Captions: System Regular, 12px

Spacing
Screen padding: 16px

Between sections: 24px

Between elements: 12px

Button height: 48px

Input height: 44px

Components
Buttons: Rounded (8px), primary blue (#0A84FF)

Cards: White, subtle shadow, rounded (8px), padding 16px

Inputs: White, border #EEEEEE, rounded (8px), padding 12px

Camera Overlay: Green face box, white angle text with semi-transparent background

7. COMPLIANCE (Singapore PDPA)
Requirement	Implementation
Consent	Digital signature + timestamp
Purpose Limitation	App only uses photos for documentation
Notification	Privacy policy shown on first launch
Access/Correction	Clinic can edit patient data
Accuracy	Staff reviews all photos
Protection	AES-256 encryption at rest, TLS in transit
Retention	Manual deletion only
Data Residency	Singapore data center (Supabase SG region)
Breach Notification	Email alerts configured
8. TESTING CHECKLIST
Critical Path Tests
New clinic signs up with credit card

Clinic logs in successfully

Search for patient by name

Add new patient with all fields

Capture digital signature

Start recording for Front angle

Face detected → green box appears

Angle updates in real-time

Move too fast → warning appears

Hold at 0° → auto-captures

Accept photo → moves to next angle

Complete all 5 angles

Review grid shows all photos

Retake individual angle works

Save session → photos in gallery

Export to device gallery works

View patient history

Subscription expires → access blocked

Edge Cases
Poor lighting → warning before recording

No face detected → error message

Patient wears glasses → reminder shown

Long hair covering face → reminder shown

Someone walks behind → retake required

Internet drops → shows offline message

App crashes → restores last state

9. SUCCESS METRICS
Primary Metrics
Accuracy: 95% of photos captured at correct angles (±1°)

Speed: Complete patient session under 3 minutes

User Satisfaction: 90% of staff find it easy to use

Retention: 80% clinic retention after 3 months

Secondary Metrics
Photos exported per day

Retake rate (target < 10%)

Subscription conversion rate

Support tickets per clinic

10. FUTURE ENHANCEMENTS (Phase 2)
AI-powered before/after comparison overlays

Analytics dashboard for clinics

Doctor annotations and treatment plans

Quick tagging of procedures

Multi-staff accounts per clinic

Web dashboard for remote viewing

Integration with EMR systems

Automated report generation (PDF)

END OF PRD
