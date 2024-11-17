import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../rangoMobile/src/screens/HomeScreen';
import RestaurantsScreen from '../rangoMobile/src/screens/RestaurantsScreen';
import RestaurantFormScreen from '../rangoMobile/src/screens/RestaurantFormScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={HomeScreen}
                    options={{ title: 'Bem-vindo' }}
                />
                <Stack.Screen
                    name="Restaurants"
                    component={RestaurantsScreen}
                    options={{ title: 'Restaurantes' }}
                />
                <Stack.Screen
                    name="RestaurantForm"
                    component={RestaurantFormScreen}
                    options={{ title: 'Cadastro de Restaurante' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
