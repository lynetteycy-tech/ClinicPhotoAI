import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Test credentials for demo
  const TEST_EMAIL = 'admin@clinic.com';
  const TEST_PASSWORD = 'clinic123';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Validate test credentials
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        // Navigate to Patient Search on successful login
        navigation.replace('PatientSearch');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Use admin@clinic.com / clinic123');
      }
    }, 1000);
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Hospital Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.hospitalIcon}>
            <Text style={styles.hospitalSymbol}>🏥</Text>
          </View>
          <Text style={styles.title}>Clinic Photo AI</Text>
          <Text style={styles.subtitle}>Medical Photography System</Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.testCredentials}>
            <Text style={styles.testCredentialsText}>
              Test Credentials:
            </Text>
            <Text style={styles.testCredentialsInfo}>
              Email: {TEST_EMAIL}
            </Text>
            <Text style={styles.testCredentialsInfo}>
              Password: {TEST_PASSWORD}
            </Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.links}>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.link}>Create Account →</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.link}>Forgot Password?</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  hospitalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0088CC', // Telegram blue
  },
  hospitalSymbol: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 32,
  },
  testCredentials: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  testCredentialsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  testCredentialsInfo: {
    fontSize: 11,
    color: '#6C757D',
    marginBottom: 2,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 48,
    backgroundColor: '#0088CC', // Telegram blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  links: {
    alignItems: 'center',
  },
  link: {
    color: '#0088CC', // Telegram blue
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default LoginScreen;
