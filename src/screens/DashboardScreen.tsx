import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as Progress from 'react-native-progress';

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <Progress.Circle progress={0.6} size={130} thickness={13} showsText={true} direction={'counter-clockwise'}/>
          <Text style={style.progressText}>Completed road</Text>
        </View>

        <Text style={style.activeSkillsTitle}>Active Skills</Text>
        <Text style={style.activeSkillsSubtitle}>Your most recent progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['React', 'Logic', 'Hooks'].map((skill, i) => (
            <View key={i} style={style.skillCard}>
              <View style={style.skillChartRow}>
                <View style={style.progressBarContainer}>
                  <View style={style.progressBarBackground}>
                    <Progress.Bar
                      progress={(40 + i * 15) / 100}
                      width={136}
                      borderRadius={4}
                      color="#2563eb"
                      unfilledColor="#cbd5e1"
                      borderWidth={0}
                    />
                  </View>
                </View>
              </View>
              <Text style={style.skillTitle}>{skill}</Text>
              <Text style={style.skillProgressText}>Progress: {40 + i * 15}%</Text>
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
});
