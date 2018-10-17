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

export default class SelectPhotoScreen extends Component {
  state = {};

  _simplePost = async () => {
    this.props.navigation.navigate('NewPost', {});
  };

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  _takerecording = async () => {
    const status = await getPermission(Permissions.AUDIO_RECORDING);
    if (status) {
        await recording.prepareToRecordAsync(options);
        await recording.startAsync();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._simplePost} style={styles.text}>
          New Simple Post
        </Text>
        <Text onPress={this._selectPhoto} style={styles.text}>
          Select Photo
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          Take Photo
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
