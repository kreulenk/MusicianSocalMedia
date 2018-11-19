import { Ionicons } from '@expo/vector-icons';
import Expo, { Constants, ImagePicker, Audio, Permissions, } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getPermission from '../utils/getPermission';

import Player from '../components/Player';

export const TRACKS = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3",
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'http://oranslectio.files.wordpress.com/2013/12/39-15-mozart_-adagio-fugue-in-c-minor-k-546.mp3',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
];


const options = {
  allowsEditing: true,
};

const IconBar = () => (
    <View style={styles.row}>
      <Icon name="ios-mic" />
      <Icon name="ios-play" />
    </View>
);

const Icon = ({ name }) => (
  <Ionicons style={{ marginRight: 8 }} name={name} size={26} color="#808080" />
);

let recording = null;
let URI = null;

export default class SelectRecordScreen extends Component {
    state = {isRecording: false};

    _toggleRecording = async () => {
        if (this.state.isRecording){
            this._stoprecording();
        } else {
            this._takeRecording();
        }
    };

    _takeRecording = async () => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
        });
        Audio.setIsEnabledAsync(true);
        const status = await getPermission(Permissions.AUDIO_RECORDING);
        if (status){
            recording = new Audio.Recording();
            try {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync(); //Starts the recording
                this.setState({
                    isRecording: true
                })
                // You are now recording!
            } catch (error) {
                console.log(error);
            }
        }
    };

  _stoprecording = async () => {
    const status = await getPermission(Permissions.AUDIO_RECORDING);

    if (status) {
        const URI = recording.getURI();
        const result = await recording.stopAndUnloadAsync();
        if (!result.cancelled) {
            this.setState({
                isRecording: false //State so that the UI can know if we are currently recording or not
            });

            let soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync({
                    uri: URI
                });
                //await soundObject.playAsync();
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }
          this.props.navigation.navigate('NewPost', { audio: URI });
        }
    }
  };

  render() {
      const before = <Text onPress={this._toggleRecording} style={styles.text}>
          Start Recording
      </Text>;
      const after = <Text onPress={this._toggleRecording} style={styles.text}>
          Stop Recording
      </Text>;
    return (
      <View style={styles.container}>
          {
              !this.state.isRecording ? before : after
          }
          <Player tracks={URI} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
   },
});
