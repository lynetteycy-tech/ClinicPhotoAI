import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type PhotoReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoReview'>;

const PhotoReviewScreen = () => {
  const navigation = useNavigation<PhotoReviewScreenNavigationProp>();
  const route = useRoute<any>();
  const { angle, photoUri } = route.params;

  const handleReject = () => {
    // Go back to camera to retake
    navigation.goBack();
  };

  const handleAccept = () => {
    // Navigate to next angle or grid review
    navigation.navigate('GridReview');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.photoContainer}>
          <Image 
            source={{ uri: photoUri || 'https://via.placeholder.com/300x400' }} 
            style={styles.photo}
            resizeMode="cover"
          />
        </View>
        
        <Text style={styles.angleText}>Angle: {angle}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept</Text>
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
    alignItems: 'center',
  },
  photoContainer: {
    width: 300,
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  angleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  rejectButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default PhotoReviewScreen;
