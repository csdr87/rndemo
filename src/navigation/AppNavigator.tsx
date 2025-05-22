import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AddSkillScreen from '../screens/AddSkillScreen';


export type RootStackParamList = {
  Dashboard: undefined;
  AddSkill: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AddSkill" component={AddSkillScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
