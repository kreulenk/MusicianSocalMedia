import { Ionicons } from '@expo/vector-icons';
import { Constants, ImagePicker, Audio, Permissions } from 'expo';
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

export default class SelectRecordScreen extends Component {
  state = {};

  _takerecording = async () => {
    const status = await getPermission(Permissions.AUDIO_RECORDING);
    if (status) {
        await recording.prepareToRecordAsync(options);
        await recording.startAsync();
    }
  };

  // _stoprecording = async () => {
  //   const status = await getPermission(Permissions.AUDIO_RECORDING);
  //   if (status) {
  //       const return = await recording.stopAndUnloadAsync();
  //       if (!result.cancelled) {
  //         this.props.navigation.navigate('NewPost', { image: result.uri });
  //       }
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._takeRecording} style={styles.text}>
          Start Recording
        </Text>
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
