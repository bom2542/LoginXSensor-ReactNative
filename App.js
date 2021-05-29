/* Basic Library */
import React, { useEffect } from "react";

/* External Node */
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase'

/* Internal File */
import Login from './screens/LoginScreen';
import SignUp from "./screens/SignUpScreen";
import Reset from "./screens/ResetScreen";
import ScannerQRScreen from "./screens/ScannerQRScreen";
import GenerateQRScreen from "./screens/GenerateQRScreen";
import Logout from "./screens/LogoutScreen";

/* Constant */
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Bottom tab navigation before login */
function MainSensor() {
    return (
        <Tab.Navigator initialRouteName="SensorQR" tabBarOptions={{ activeTintColor: '#e91e63',}}>
            <Tab.Screen name="GenerateQR" component={GenerateQRScreen} options={{
                tabBarLabel: 'Generate',
                tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="plus" color={color} size={size} /> ),
            }}/>
            <Tab.Screen name="ScanQR" component={ScannerQRScreen} options={{
                tabBarLabel: 'Scan',
                tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="qrcode" color={color} size={size} /> ),
            }}/>
            <Tab.Screen name="Logout" component={Logout} options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="user" color={color} size={size} /> ),
            }}/>
        </Tab.Navigator>
    );
}

export default function App({ navigation }) {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Sensor');
      }
    });
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Reset" component={Reset} />
          <Stack.Screen name="Sensor" component={MainSensor} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
