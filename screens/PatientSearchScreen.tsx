import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type PatientSearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PatientSearch'>;

interface Patient {
  id: string;
  name: string;
  icNumber?: string;
  registrationNumber: string;
  createdAt: string;
}

const PatientSearchScreen = () => {
  const navigation = useNavigation<PatientSearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      icNumber: 'S1234567D',
      registrationNumber: 'CLINIC001-2401',
      createdAt: '2024-02-23',
    },
    {
      id: '2',
      name: 'Mary Johnson',
      icNumber: 'S2345678E',
      registrationNumber: 'CLINIC001-2402',
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      name: 'Robert Chen',
      icNumber: 'S3456789F',
      registrationNumber: 'CLINIC001-2403',
      createdAt: '2024-01-28',
    },
    {
      id: '4',
      name: 'Sarah Lee',
      registrationNumber: 'CLINIC001-2404',
      createdAt: '2024-01-20',
    },
  ]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.icNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

  const handleAddPatient = () => {
    navigation.navigate('AddPatient');
  };

  const handlePatientSelect = (patient: Patient) => {
    Alert.alert('Patient Selected', `Selected: ${patient.name}`, [
      {
        text: 'View Gallery',
        onPress: () => navigation.navigate('PatientGallery', { patientId: patient.id }),
      },
      {
        text: 'New Session',
        onPress: () => navigation.navigate('AddPatient'),
      },
      {
        text: 'Test Camera Workflow',
        onPress: () => navigation.navigate('CaptureInstructions'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => handlePatientSelect(item)}
    >
      <View>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDetails}>{item.registrationNumber}</Text>
        {item.icNumber && (
          <Text style={styles.patientDetails}>IC: {item.icNumber}</Text>
        )}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchLabel}>🔍 Search patients</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, IC, or registration number"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddPatient}>
          <Text style={styles.addButtonText}>+ New Patient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {filteredPatients.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Recent Patients:</Text>
            <FlatList
              data={filteredPatients}
              renderItem={renderPatientItem}
              keyExtractor={(item) => item.id}
              style={styles.patientList}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No patients found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or add a new patient</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    height: 48,
    backgroundColor: '#0088CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  patientList: {
    flex: 1,
  },
  patientItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default PatientSearchScreen;
