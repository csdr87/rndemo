import React, { useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './DashboardScreen.styles'; // <--- Importa los estilos

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [skills, setSkills] = useState<{ name: string; progress: number }[]>([]);

  const overallProgress =
    skills.length > 0
      ? skills.reduce((acc, skill) => acc + skill.progress, 0) / (skills.length * 100)
      : 0;

  useFocusEffect(
    React.useCallback(() => {
      const loadSkills = async () => {
        try {
          const stored = await AsyncStorage.getItem('@skills');
          const parsed = stored ? JSON.parse(stored) : [];
          setSkills(parsed);
        } catch (e) {
          console.error('Error loading skills:', e);
        }
      };

      loadSkills();
    }, [])
  );

  const handleDelete = async (index: number) => {
    try {
      const stored = await AsyncStorage.getItem('@skills');
      const updatedSkills = stored ? JSON.parse(stored) : [];
      updatedSkills.splice(index, 1);
      await AsyncStorage.setItem('@skills', JSON.stringify(updatedSkills));
      setSkills(updatedSkills);
    } catch (e) {
      console.error('Error deleting skill:', e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.developerText}>Developer 👋</Text>
          </View>
          <Image source={{ uri: 'https://placecats.com/80/80' }} style={styles.avatar} />
        </View>

        <View style={styles.progressContainer}>
          <Progress.Circle progress={overallProgress} size={130} thickness={13} showsText={true} direction={'counter-clockwise'} />
          <Text style={styles.progressText}>Completed road</Text>
        </View>

        <Text style={styles.activeSkillsTitle}>Active Skills</Text>
        <Text style={styles.activeSkillsSubtitle}>Your most recent progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {skills.map((skill, i) => (
            <View key={i} style={styles.skillCard}>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${skill.progress}%` }]} />
                </View>
              </View>
              <Text style={styles.skillTitle}>{skill.name}</Text>
              <Text style={styles.skillProgressText}>Progreso: {skill.progress}%</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => navigation.navigate('EditSkill', { index: i, skill })}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(i)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddSkill')}
        style={styles.fab}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
