import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider'; // Asegúrate de instalar esta librería
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Dashboard: undefined;
  // add other routes here if needed
};

const AddSkillScreen = () => {
  const [skillName, setSkillName] = useState('');
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    if (!skillName) { return; }

    try {
      const stored = await AsyncStorage.getItem('@skills');
      const skills = stored ? JSON.parse(stored) : [];
      const newSkill = { name: skillName, progress };
      await AsyncStorage.setItem('@skills', JSON.stringify([...skills, newSkill]));
      setSkillName('');
      setProgress(0);
      console.log('Skill saved');
      navigation.navigate('Dashboard');
    } catch (e) {
      console.error('Error saving skill:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skill Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., React Native"
        value={skillName}
        onChangeText={setSkillName}
      />
      <Text style={styles.label}>Initial Progress: {progress}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={progress}
        onValueChange={setProgress}
        step={1}
        minimumTrackTintColor="#2563eb"
        maximumTrackTintColor="#94a3b8"
        thumbTintColor="#2563eb"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add Skill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSkillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1e293b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  slider: {
    width: '100%',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
