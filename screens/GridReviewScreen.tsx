import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type GridReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GridReview'>;

const GridReviewScreen = () => {
  const navigation = useNavigation<GridReviewScreenNavigationProp>();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const photos = [
    { id: 1, angle: 'Front', uri: 'https://via.placeholder.com/300x400' },
    { id: 2, angle: 'Left 45°', uri: 'https://via.placeholder.com/300x400' },
    { id: 3, angle: 'Left 90°', uri: 'https://via.placeholder.com/300x400' },
    { id: 4, angle: 'Right 45°', uri: 'https://via.placeholder.com/300x400' },
    { id: 5, angle: 'Right 90°', uri: 'https://via.placeholder.com/300x400' },
  ];

  const handlePhotoPress = (index: number) => {
    setSelectedPhotoIndex(index);
    setModalVisible(true);
  };

  const handleRetake = (angle: string) => {
    Alert.alert('Retake Photo', `Retake ${angle} photo?`, [
      {
        text: 'Yes',
        onPress: () => navigation.navigate('Camera'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleSaveAll = () => {
    Alert.alert('Success', 'All photos saved successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('PatientSearch'),
      },
    ]);
  };

  const showRetakeOptions = () => {
    Alert.alert('Select Angle to Retake', 'Choose which angle to retake:', [
      {
        text: 'Front',
        onPress: () => handleRetake('Front'),
      },
      {
        text: 'Left 45°',
        onPress: () => handleRetake('Left 45°'),
      },
      {
        text: 'Left 90°',
        onPress: () => handleRetake('Left 90°'),
      },
      {
        text: 'Right 45°',
        onPress: () => handleRetake('Right 45°'),
      },
      {
        text: 'Right 90°',
        onPress: () => handleRetake('Right 90°'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedPhotoIndex(selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : photos.length - 1);
    } else {
      setSelectedPhotoIndex(selectedPhotoIndex < photos.length - 1 ? selectedPhotoIndex + 1 : 0);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPhotoIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review All Photos</Text>
        
        <View style={styles.grid}>
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.photoBox} 
              onPress={() => handlePhotoPress(0)}
            >
              <Image 
                source={{ uri: photos[0].uri }} 
                style={styles.thumbnail}
              />
              <Text style={styles.photoLabel}>{photos[0].angle}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.photoBox} 
              onPress={() => handlePhotoPress(1)}
            >
              <Image 
                source={{ uri: photos[1].uri }} 
                style={styles.thumbnail}
              />
              <Text style={styles.photoLabel}>L45</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.photoBox} 
              onPress={() => handlePhotoPress(2)}
            >
              <Image 
                source={{ uri: photos[2].uri }} 
                style={styles.thumbnail}
              />
              <Text style={styles.photoLabel}>L90</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.photoBox} 
              onPress={() => handlePhotoPress(3)}
            >
              <Image 
                source={{ uri: photos[3].uri }} 
                style={styles.thumbnail}
              />
              <Text style={styles.photoLabel}>R45</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.photoBox} 
              onPress={() => handlePhotoPress(4)}
            >
              <Image 
                source={{ uri: photos[4].uri }} 
                style={styles.thumbnail}
              />
              <Text style={styles.photoLabel}>R90</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={showRetakeOptions}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAll}>
            <Text style={styles.saveButtonText}>Save All</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Photo Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPhotoIndex !== null && (
              <>
                <Image 
                  source={{ uri: photos[selectedPhotoIndex].uri }} 
                  style={styles.enlargedPhoto}
                  resizeMode="contain"
                />
                <Text style={styles.enlargedPhotoLabel}>{photos[selectedPhotoIndex].angle}</Text>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                    <Text style={styles.modalButtonText}>Back</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.modalButton} 
                    onPress={() => navigatePhoto('prev')}
                  >
                    <Text style={styles.modalButtonText}>← Prev</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.modalButton} 
                    onPress={() => navigatePhoto('next')}
                  >
                    <Text style={styles.modalButtonText}>Next →</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  photoBox: {
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  photoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  retakeButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    margin: 20,
    maxHeight: '80%',
  },
  enlargedPhoto: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  enlargedPhotoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default GridReviewScreen;
