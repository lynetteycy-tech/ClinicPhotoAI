import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Dimensions, Modal, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ConsentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Consent'>;

const ConsentScreen = () => {
  const navigation = useNavigation<ConsentScreenNavigationProp>();
  const [clinicRegNumber, setClinicRegNumber] = useState('CLINIC001-2401');
  const [patientName, setPatientName] = useState('John Smith');
  const [patientIC, setPatientIC] = useState('S1234567D');
  const [signatureText, setSignatureText] = useState('');
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePaths, setSignaturePaths] = useState<Array<{x: number, y: number}[]>>([]);
  const textInputRef = useRef<TextInput>(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Dynamic styles that depend on screen dimensions
  const modalStyles = {
    signatureModalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    signatureModalContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 24,
      width: screenWidth - 40,
      maxHeight: screenHeight - 100,
      alignItems: 'center' as const,
    },
    signatureModalTitle: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      color: '#000000',
      marginBottom: 8,
    },
    signatureModalSubtitle: {
      fontSize: 14,
      color: '#666666',
      marginBottom: 24,
    },
    signatureModalBox: {
      width: screenWidth - 64,
      height: 200,
      borderWidth: 2,
      borderColor: '#EEEEEE',
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      marginBottom: 24,
      position: 'relative' as const,
    },
    signatureModalInput: {
      flex: 1,
      fontSize: 18,
      color: '#000000',
      textAlign: 'center' as const,
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    signatureModalButtons: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      width: screenWidth - 64,
      gap: 12,
    },
    signatureModalCancelButton: {
      flex: 1,
      height: 44,
      backgroundColor: '#F5F5F7',
      borderRadius: 8,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    signatureModalCancelText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '600' as const,
    },
    signatureModalClearButton: {
      flex: 1,
      height: 44,
      backgroundColor: '#FF3B30',
      borderRadius: 8,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    signatureModalClearText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600' as const,
    },
    signatureModalDoneButton: {
      flex: 1,
      height: 44,
      backgroundColor: '#0088CC',
      borderRadius: 8,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    signatureModalDoneText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600' as const,
    },
  };

  const handleTouchStart = (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent;
    console.log('Touch start at:', locationX, locationY);
    setIsDrawing(true);
    // Add new path for this stroke
    setSignaturePaths(prev => [...prev, [{x: locationX, y: locationY}]]);
  };

  const handleTouchMove = (evt: any) => {
    if (isDrawing) {
      const { locationX, locationY } = evt.nativeEvent;
      console.log('Touch move at:', locationX, locationY);
      setSignaturePaths(prev => {
        const newPaths = [...prev];
        // Add point to the last path
        if (newPaths.length > 0) {
          const lastPath = newPaths[newPaths.length - 1];
          const lastPoint = lastPath[lastPath.length - 1];
          
          // Add current point
          lastPath.push({x: locationX, y: locationY});
          
          // Add interpolated points between last and current for smoother line
          if (lastPoint) {
            const distance = Math.sqrt(
              Math.pow(locationX - lastPoint.x, 2) + 
              Math.pow(locationY - lastPoint.y, 2)
            );
            
            // Add intermediate points if distance is large
            if (distance > 5) {
              const steps = Math.floor(distance / 2);
              for (let i = 1; i < steps; i++) {
                const ratio = i / steps;
                const interpX = lastPoint.x + (locationX - lastPoint.x) * ratio;
                const interpY = lastPoint.y + (locationY - lastPoint.y) * ratio;
                lastPath.push({x: interpX, y: interpY});
              }
            }
          }
        }
        return newPaths;
      });
    }
  };

  const handleTouchEnd = () => {
    console.log('Touch end');
    setIsDrawing(false);
    if (signaturePaths.length > 0 && signaturePaths.some(path => path.length > 1)) {
      setSignatureText('✅ Signature captured');
    }
  };

  const handleSignaturePress = () => {
    setSignatureModalVisible(true);
  };

  const handleTextChange = (text: string) => {
    setSignatureText(text);
  };

  const handleSignatureDone = () => {
    if (signatureText || (signaturePaths.length > 0 && signaturePaths.some(path => path.length > 1))) {
      setSignatureModalVisible(false);
    } else {
      Alert.alert('Error', 'Please provide your signature');
    }
  };

  const handleSignatureCancel = () => {
    setSignatureModalVisible(false);
  };

  const handleClear = () => {
    setSignatureText('');
    setSignaturePaths([]);
    setIsDrawing(false);
    Alert.alert('Clear', 'Signature cleared');
  };

  const handleAccept = () => {
    if (!signatureText && !(signaturePaths.length > 0 && signaturePaths.some(path => path.length > 1))) {
      Alert.alert('Error', 'Please provide patient signature');
      return;
    }
    // Navigate to capture instructions
    navigation.navigate('CaptureInstructions');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Patient Consent</Text>
        
        {/* Clinic Registration Number */}
        <View style={styles.clinicInfoContainer}>
          <Text style={styles.clinicInfoLabel}>Clinic Registration:</Text>
          <TextInput
            style={styles.clinicRegInput}
            value={clinicRegNumber}
            onChangeText={setClinicRegNumber}
            placeholder="Enter clinic registration number"
          />
        </View>
        
        <View style={styles.consentBox}>
          <Text style={styles.consentText}>
            "I consent to photos being taken for documentation"
          </Text>
        </View>
        
        {/* Patient Details */}
        <View style={styles.patientDetailsContainer}>
          <Text style={styles.patientDetailsLabel}>Patient Details:</Text>
          <View style={styles.patientInfo}>
            <Text style={styles.patientInfoText}>Name: {patientName}</Text>
            <Text style={styles.patientInfoText}>IC: {patientIC}</Text>
          </View>
        </View>
        
        {/* Signature Area */}
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Patient Signature:</Text>
          <TouchableOpacity 
            style={styles.signatureBox} 
            onPress={handleSignaturePress}
            activeOpacity={0.7}
          >
            {signatureText ? (
              <View style={styles.signaturePreview}>
                <Text style={styles.signaturePreviewText}>✅ Signature Captured</Text>
                <Text style={styles.signaturePreviewSubtext}>Tap to edit</Text>
              </View>
            ) : (
              <View style={styles.signaturePlaceholder}>
                <Text style={styles.signaturePlaceholderText}>Tap here to sign</Text>
                <Text style={styles.signatureHint}>Signature will enlarge for signing</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Signature Modal */}
        <Modal
          visible={signatureModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleSignatureCancel}
        >
          <View style={modalStyles.signatureModalContainer}>
            <View style={modalStyles.signatureModalContent}>
              <Text style={modalStyles.signatureModalTitle}>Patient Signature</Text>
              <Text style={modalStyles.signatureModalSubtitle}>{patientName} - {patientIC}</Text>
              
              <View style={modalStyles.signatureModalBox} 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
                {/* Drawing Canvas */}
                {signaturePaths.length > 0 && (
                  <View style={styles.signatureCanvas}>
                    {signaturePaths.map((path, pathIndex) => (
                      path.map((point, pointIndex) => (
                        <View
                          key={`${pathIndex}-${pointIndex}`}
                          style={[
                              styles.signatureDot,
                              {
                                left: point.x - 2,
                                top: point.y - 2,
                              }
                            ]}
                        />
                      ))
                    ))}
                  </View>
                )}
                
                {/* Status Overlay */}
                {signaturePaths.length > 0 && signaturePaths.some(path => path.length > 1) ? (
                  <View style={styles.signatureCaptured}>
                    <Text style={styles.signatureText}>✅ Signature Captured</Text>
                    <Text style={styles.signatureSubtext}>Tap Clear to redraw</Text>
                  </View>
                ) : (
                  <View style={styles.signaturePlaceholder}>
                    <Text style={styles.signaturePlaceholderText}>Sign here with your finger</Text>
                    <Text style={styles.signatureHint}>Draw your signature above</Text>
                  </View>
                )}
              </View>
              
              <View style={modalStyles.signatureModalButtons}>
                <TouchableOpacity 
                  style={modalStyles.signatureModalCancelButton} 
                  onPress={handleSignatureCancel}
                >
                  <Text style={modalStyles.signatureModalCancelText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={modalStyles.signatureModalClearButton} 
                  onPress={() => {
                    setSignatureText('');
                    setSignaturePaths([]);
                    setIsDrawing(false);
                  }}
                >
                  <Text style={modalStyles.signatureModalClearText}>Clear</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={modalStyles.signatureModalDoneButton} 
                  onPress={handleSignatureDone}
                >
                  <Text style={modalStyles.signatureModalDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  clinicInfoContainer: {
    marginBottom: 24,
  },
  clinicInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  clinicRegInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  consentContainer: {
    marginBottom: 24,
  },
  consentBox: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  consentText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  patientDetailsContainer: {
    marginBottom: 24,
  },
  patientDetailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  patientInfo: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
  },
  patientInfoText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  signatureContainer: {
    marginBottom: 24,
  },
  signatureLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  signatureBox: {
    height: 150,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  signaturePreview: {
    alignItems: 'center',
  },
  signaturePreviewText: {
    fontSize: 16,
    color: '#0088CC',
    fontWeight: '600',
    marginBottom: 4,
  },
  signaturePreviewSubtext: {
    fontSize: 12,
    color: '#666666',
  },
  signaturePlaceholder: {
    alignItems: 'center',
  },
  signaturePlaceholderText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  signatureHint: {
    fontSize: 12,
    color: '#999999',
  },
  signatureCaptured: {
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 16,
    color: '#0088CC',
    fontWeight: '600',
    marginBottom: 4,
  },
  signatureSubtext: {
    fontSize: 12,
    color: '#666666',
  },
  signatureCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  signatureDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  clearButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666666',
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

export default ConsentScreen;
