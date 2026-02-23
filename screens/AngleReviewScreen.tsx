import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type AngleReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AngleReview'>;

const AngleReviewScreen = () => {
  const navigation = useNavigation<AngleReviewScreenNavigationProp>();
  const route = useRoute();
  const { angle, photoUri } = route.params as { angle: string; photoUri: string };

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Dynamic styles that depend on screen dimensions
  const dynamicStyles = {
    photoContainer: {
      width: screenWidth - 40,
      height: 300,
      backgroundColor: '#F8F8F8',
      borderRadius: 12,
      marginBottom: 24,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    buttonContainer: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      gap: 16,
      width: screenWidth - 40,
    },
  };

  const handleAccept = () => {
    // Navigate to next angle or to GridReview if this was the last angle
    const angles = ['Front', 'Left 45°', 'Left 90°', 'Right 45°', 'Right 90°'];
    const currentIndex = angles.indexOf(angle);
    if (currentIndex < angles.length - 1) {
      // Navigate to next angle
      navigation.navigate('Camera' as any, {
        angle: angles[currentIndex + 1],
        photoUri: `https://via.placeholder.com/300x400?text=${encodeURIComponent(angles[currentIndex + 1])}`
      });
    } else {
      // This was the last angle, go to GridReview
      navigation.navigate('GridReview' as any);
    }
  };

  const handleReject = () => {
    // Navigate back to Camera to retake this angle
    navigation.navigate('Camera' as any, {
      angle: angle,
      photoUri: `https://via.placeholder.com/300x400?text=${encodeURIComponent(angle)}`
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review {angle} Photo</Text>
        
        {/* Photo Preview */}
        <View style={dynamicStyles.photoContainer}>
          <Image 
            source={{ uri: photoUri || 'https://via.placeholder.com/300x400' }} 
            style={styles.photo}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.angleLabel}>Angle: {angle}</Text>
        
        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject & Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  angleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#0088CC',
  },
  acceptButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
  },
  rejectButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F5F5F7',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
});

export default AngleReviewScreen;
