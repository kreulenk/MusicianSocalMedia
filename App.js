// Import React Navigation
import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import {
  createBottomTabNavigator,
  createStackNavigator,
  Sound,
} from 'react-navigation';

import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import SelectRecordScreen from './screens/SelectRecordScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import MainScreen from './screens/MainScreen';

import SurveyScreen from './screens/SurveyScreen';

import PlayScreen from './screens/PlayScreen';
import ProfileScreen from './screens/profile';

const LandingHeader = (headerProps) => (
    <View style={{}}>
        <Text>Tutti</Text>
    </View>
);

const MainHeader = (headerProps) => (
    <View style={{height: 40, backgroundColor: '#FFFFFF'}}>
        <Text>Tutti</Text>
    </View>
);

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('view-headline'),
        tabBarLabel: 'Feed',
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-to-photos'),
        tabBarLabel: 'Post'
      },
    },

    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('public'),
        tabBarLabel: 'Discover'
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('account-circle'),
        tabBarLabel: 'Profile'
      },
    },

  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: true,
      activeTintColor: 'purple',
      inactiveTintColor: 'black',
      style: {height: 80, paddingBottom: 24, paddingTop: 10}
    },
  },
);


const stackHeaderStyle = {marginTop: 28};

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Login: {
        screen: MainScreen,
        navigationOptions: { header: LandingHeader },
    },
    Survey: {
      screen: SurveyScreen,
      navigationOptions: { header: LandingHeader },
    },
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { header: MainHeader },
    },
    Message: {
      screen: DiscoverScreen,
      navigationOptions: { headerStyle: stackHeaderStyle },
    },
    // This screen will not have a tab bar
    NewPost: {
      screen: NewPostScreen,
      navigationOptions: { headerStyle: stackHeaderStyle }
    },
    RecordAudio: {
      screen: SelectRecordScreen,
      navigationOptions: { headerStyle: stackHeaderStyle }
    },
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);


// Export it as the root component
export default stackNavigator;
