import React from 'react';
import { View } from 'react-native';
import SpacexLaunchListScreen from '../../features/SpacexLaunchExplorer/screens/SpacexLaunchListScreen'; // Import the feature screen

const HomeScreen = () => {
  return <View style={{flex:1, backgroundColor:'#fff'}} >
    <SpacexLaunchListScreen />
  </View>
};

export default HomeScreen;
