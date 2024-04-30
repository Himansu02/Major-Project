import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IotContainer from '../IotContainer';
import CropPrediction from '../CropPrediction';
import CropStackNavigator from './CropStackNavigator';

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
        component={IotContainer}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="CropPrediction"
        component={CropStackNavigator}
        options={{ tabBarLabel: 'Crop Prediction' }}
      />
    </Tab.Navigator>
  );
}