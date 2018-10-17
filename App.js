// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import SelectRecordScreen from './screens/SelectRecordScreen';
import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-box'),
      },
    },

    Record: {
      screen: SelectRecordScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('mic'),
      },
    },

    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('chat-bubble'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'red',
      inactiveTintColor: 'black',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Login: {
        screen: MainScreen,
        navigationOptions: { title: 'Soundmatch', headerTintColor: 'red' },
    },
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'Soundmatch', headerTintColor: 'red' },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

// Export it as the root component
export default stackNavigator;
