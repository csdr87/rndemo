import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AddSkillScreen from '../screens/AddSkillScreen';
import EditSkillScreen from '../screens/EditSkillScreen';


export type RootStackParamList = {
  Dashboard: undefined;
  AddSkill: undefined;
  EditSkill: { index: number; skill: { name: string; progress: number } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AddSkill" component={AddSkillScreen} />
    <Stack.Screen name="EditSkill" component={EditSkillScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
