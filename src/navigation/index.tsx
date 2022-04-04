import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    )
}

export const Navigation = () => {
    return (
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    );
  }