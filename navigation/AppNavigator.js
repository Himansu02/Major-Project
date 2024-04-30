import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IotContainer from '../IotContainer';
import CropPrediction from '../CropPrediction';
import CropStackNavigator from './CropStackNavigator';
import Home from '../rohan/HomeComponent.js';
import MessageContainer from '../rohan/MessageContainer.js';

const Tab = createMaterialTopTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Iot"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "#4FAD2A" },
        tabBarIndicatorStyle: { backgroundColor: '#fff' }
      }}
    >
      <Tab.Screen
        name="Iot"
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="CropPrediction"
        component={CropStackNavigator}
        options={{ tabBarLabel: 'Emergency Contacts' }}
      />
    </Tab.Navigator>
  );
}