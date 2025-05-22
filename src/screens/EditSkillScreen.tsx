import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditSkillScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { index, skill } = route.params;

  const [skillName, setSkillName] = useState(skill.name);
  const [progress, setProgress] = useState(skill.progress);

  const handleUpdate = async () => {
    try {
      const stored = await AsyncStorage.getItem('@skills');
      const skills = stored ? JSON.parse(stored) : [];
      skills[index] = { name: skillName, progress };
      await AsyncStorage.setItem('@skills', JSON.stringify(skills));
      navigation.goBack();
    } catch (e) {
      console.error('Error updating skill:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Skill</Text>
      <TextInput
        style={styles.input}
        value={skillName}
        onChangeText={setSkillName}
      />
      <Text style={styles.label}>Progress: {progress}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={progress}
        onValueChange={setProgress}
        step={1}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditSkillScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8, color: '#1e293b' },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
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
  slider: {
    width: '100%',
  },
});
