import { Ionicons } from '@expo/vector-icons';
import Expo, { Constants, ImagePicker, Audio, Permissions, } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getPermission from '../utils/getPermission';

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
            console.log(URI);
            this.setState({
                isRecording: false //State so that the UI can know if we are currently recording or not
            });

            let soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync({
                    uri: URI
                });
                await soundObject.playAsync();
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }

          // this.props.navigation.navigate('NewPost', { image: result.uri });
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
