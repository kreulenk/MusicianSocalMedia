import { Ionicons } from '@expo/vector-icons';
import { Constants, ImagePicker, Audio, Permissions, Camera } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


import getPermission from '../utils/getPermission';

const options = {
  allowsEditing: true,
};

const color = '#3D3D3D';

const IconBar = () => (
    <View style={styles.row}>
      <Icon name="ios-mic" />
      <Icon name="ios-play" />
    </View>
);

const Icon = ({ name }) => (
  <Ionicons name={name} size={40} color={color} />
);

export default class SelectPhotoScreen extends Component {
  state = {};

  _simplePost = async () => {
    var navigationProps = {
      name: this.props.navigation.getParam('name')
    };
    this.props.navigation.navigate('NewPost', navigationProps);
  };

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        var navigationProps = {
          image:  result.uri,
          name: this.props.navigation.getParam('name')
        };
        this.props.navigation.navigate('NewPost', navigationProps);
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        var navigationProps = {
          image:  result.uri,
          name: this.props.navigation.getParam('name')
        };
        this.props.navigation.navigate('NewPost', navigationProps);
      }
    }
  };

  _takeRecording = async () => {
    this.props.navigation.navigate('RecordAudio', {});
  };

  render() {
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.option} onPress={this._simplePost} >
            <Icon name="ios-paper" />
            <Text style={styles.text}>
              Text Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={this._takeRecording}>
            <Icon name="ios-mic" />
            <Text style={styles.text}>
              Record Audio
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.option} onPress={this._selectPhoto}>
            <Icon name="ios-photos" />
            <Text style={styles.text}>
              Select Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={this._takePhoto}>
            <Icon name="ios-camera" />
            <Text style={styles.text}>
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    padding: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color,
   },
   option: {
     width: 125,
     height: 100,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     margin: 15,
   }
});
