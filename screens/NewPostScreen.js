import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TextInput, View, Text } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import Player from '../components/Player';

import Fire from '../Fire';

export default class NewPostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="#ff0000">
        <HeaderButtons.Item
          title="Share"
          onPress={() => {
            const text = navigation.getParam('text');
            const image = navigation.getParam('image');
            if (text && image) {
              navigation.goBack();
              Fire.shared.post({ text: text.trim(), image });
            } else if (text) {
              navigation.goBack();
              Fire.shared.post({ text: text.trim() });
            } else {
              alert('Need valid description');
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  state = { text: '' };

  render() {
    const { image, audio } = this.props.navigation.state.params;
    console.log("image", image, "audio", audio);
    if (image) {
      return (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Image
            source={{ uri: image }}
            style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
          />
          <TextInput
            multiline
            style={{ flex: 1, paddingHorizontal: 16 }}
            placeholder="Add a description..."
            onChangeText={text => {
              this.setState({ text });
              this.props.navigation.setParams({ text });
            }}
          />
        </View>
      );
    }
    else if (audio) {
        return (
            <View style={{ padding: 10, flexDirection: 'row' }}>
                <Player/>
                <TextInput
                    multiline
                    style={{ flex: 1, paddingHorizontal: 16 }}
                    placeholder="Add a description for your new sound..."
                    onChangeText={text => {
                        this.setState({ text });
                        this.props.navigation.setParams({ text });
                    }}
                />
            </View>
        );
    }
    else
    {
      return (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <TextInput
            multiline
            style={{ flex: 1, paddingHorizontal: 16 }}
            placeholder="Add a description..."
            onChangeText={text => {
              this.setState({ text });
              this.props.navigation.setParams({ text });
            }}
          />
        </View>
      );
    }
  }
}
