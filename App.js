import React from "react";
import { View, Text, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


import Weather from './src/Weather';
import Weatherdetal from './src/Weather_detal';

const HomePage = createStackNavigator({
  Home: { screen: Weather },
  Detal: { screen: Weatherdetal }
});
export default createAppContainer(HomePage);
