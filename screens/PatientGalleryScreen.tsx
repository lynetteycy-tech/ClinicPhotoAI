import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type PatientGalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PatientGallery'>;

interface Session {
  id: string;
  date: string;
  photos: string[];
}

const PatientGalleryScreen = () => {
  const navigation = useNavigation<PatientGalleryScreenNavigationProp>();
  const route = useRoute<any>();
  const { patientId } = route.params;

  const mockSessions: Session[] = [
    {
      id: '1',
      date: 'Feb 23, 2026',
      photos: [
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
      ],
    },
    {
      id: '2',
      date: 'Jan 15, 2026',
      photos: [
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
        'https://via.placeholder.com/100x100',
      ],
    },
  ];

  const handleNewSession = () => {
    navigation.navigate('AddPatient');
  };

  const handleSessionPress = (session: Session) => {
    Alert.alert('Session', `Session from ${session.date}`, [
      {
        text: 'View Photos',
        onPress: () => console.log('View photos'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const renderSessionItem = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.sessionItem}
      onPress={() => handleSessionPress(item)}
    >
      <Text style={styles.sessionDate}>{item.date}</Text>
      <View style={styles.photoGrid}>
        {item.photos.slice(0, 4).map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={styles.sessionPhoto}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>John Smith</Text>
        
        <FlatList
          data={mockSessions}
          renderItem={renderSessionItem}
          keyExtractor={(item) => item.id}
          style={styles.sessionList}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity style={styles.newSessionButton} onPress={handleNewSession}>
          <Text style={styles.newSessionButtonText}>+ New Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 24,
  },
  sessionList: {
    flex: 1,
  },
  sessionItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sessionDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sessionPhoto: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  newSessionButton: {
    height: 48,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  newSessionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PatientGalleryScreen;
