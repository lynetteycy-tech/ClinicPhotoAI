import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PatientSearchScreen from '../screens/PatientSearchScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import ConsentScreen from '../screens/ConsentScreen';
import CaptureInstructionsScreen from '../screens/CaptureInstructionsScreen';
import CameraScreen from '../screens/CameraScreen';
import PhotoReviewScreen from '../screens/PhotoReviewScreen';
import AngleReviewScreen from '../screens/AngleReviewScreen';
import GridReviewScreen from '../screens/GridReviewScreen';
import PatientGalleryScreen from '../screens/PatientGalleryScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0088CC',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="PatientSearch" 
          component={PatientSearchScreen}
          options={{ title: 'Patients' }}
        />
        <Stack.Screen 
          name="AddPatient" 
          component={AddPatientScreen}
          options={{ title: 'New Patient' }}
        />
        <Stack.Screen 
          name="Consent" 
          component={ConsentScreen}
          options={{ title: 'Patient Consent' }}
        />
        <Stack.Screen 
          name="CaptureInstructions" 
          component={CaptureInstructionsScreen}
          options={{ title: 'Capture Guide' }}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PhotoReview" 
          component={PhotoReviewScreen}
          options={{ title: 'Review Photo' }}
        />
        <Stack.Screen 
          name="AngleReview" 
          component={AngleReviewScreen}
          options={{ title: 'Review Angle Photo' }}
        />
        <Stack.Screen 
          name="GridReview" 
          component={GridReviewScreen}
          options={{ title: 'Review All Photos' }}
        />
        <Stack.Screen 
          name="PatientGallery" 
          component={PatientGalleryScreen}
          options={{ title: 'Patient Gallery' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
