import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to ClinicPhotoAI
          </Text>
          <Text className="text-lg text-gray-600">
            AI-powered clinic photo management
          </Text>
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            className="bg-primary-500 p-6 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('Camera')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              📸 Take Photo
            </Text>
            <Text className="text-primary-100 text-sm text-center mt-2">
              Capture new clinic photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary-500 p-6 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('Gallery')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              🖼️ Gallery
            </Text>
            <Text className="text-secondary-100 text-sm text-center mt-2">
              View and manage photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-success-500 p-6 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('Analysis')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              🔬 Analysis
            </Text>
            <Text className="text-success-100 text-sm text-center mt-2">
              AI photo analysis results
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-700 p-6 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('Profile')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              👤 Profile
            </Text>
            <Text className="text-gray-300 text-sm text-center mt-2">
              Account settings
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 p-4 bg-blue-50 rounded-xl">
          <Text className="text-sm text-blue-800 font-medium mb-2">
            Quick Tip
          </Text>
          <Text className="text-sm text-blue-700">
            Take clear photos with good lighting for best AI analysis results.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
