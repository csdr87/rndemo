import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
      updatedSkills.splice(index, 1); // elimina el skill por índice
      await AsyncStorage.setItem('@skills', JSON.stringify(updatedSkills));
      setSkills(updatedSkills); // actualiza estado local
    } catch (e) {
      console.error('Error deleting skill:', e);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.headerRow}>
          <View>
            <Text style={style.greetingText}>Hello,</Text>
            <Text style={style.developerText}>Developer 👋</Text>
          </View>
          <Image source={{ uri: 'https://placecats.com/80/80' }} style={style.avatar} />
        </View>

        <View style={style.progressContainer}>
          <Progress.Circle progress={overallProgress} size={130} thickness={13} showsText={true} direction={'counter-clockwise'} />
          <Text style={style.progressText}>Completed road</Text>
        </View>

        <Text style={style.activeSkillsTitle}>Active Skills</Text>
        <Text style={style.activeSkillsSubtitle}>Your most recent progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {skills.map((skill, i) => (
            <View key={i} style={style.skillCard}>
              <View style={style.progressBarContainer}>
                <View style={style.progressBarBackground}>
                  <View style={[style.progressBarFill, { width: `${skill.progress}%` }]} />
                </View>
              </View>
              <Text style={style.skillTitle}>{skill.name}</Text>
              <Text style={style.skillProgressText}>Progreso: {skill.progress}%</Text>
              <View style={style.buttonRow}>
                <TouchableOpacity onPress={() => navigation.navigate('EditSkill', { index: i, skill })}>
                  <Text style={style.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(i)}>
                  <Text style={style.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddSkill')}
        style={style.fab}
      >
        <Text style={style.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  greetingText: {
    fontSize: 16,
    color: '#64748b',
  },
  developerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressText: {
    marginTop: 16,
    fontSize: 14,
    color: '#334155',
  },
  activeSkillsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0f172a',
  },
  skillCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 160,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  skillProgressText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // for Android shadow
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
  },
  activeSkillsSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 2,
  },
  skillChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBarContainer: {
    marginVertical: 8,
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#cbd5e1',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  editButtonText: {
    color: '#2563eb',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'red',
    marginTop: 8,
  },
});
