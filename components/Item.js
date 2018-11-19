import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Player from '../components/Player';

const profileImageSize = 36;
const padding = 12;

export default class Item extends React.Component {
  state = {};

  componentDidMount() {
    if (!this.props.imageWidth) {
      if (this.props.image) {
        // Get the size of the web image
        Image.getSize(this.props.image, (width, height) => {
          this.setState({ width, height });
        });
      }
    }
  }

  render() {
    const { text, name, imageWidth, imageHeight, uid, image, audio } = this.props;

    if (image)
    {
      // Reduce the name to something
      const imgW = imageWidth || this.state.width;
      const imgH = imageHeight || this.state.height;
      const aspect = imgW / imgH || 1;

      return (
        <View style={[styles.border]}>
          <HeaderNoImage name={name} />
          <Image
            resizeMode="contain"
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              aspectRatio: aspect,
              marginBottom: 12
            }}
            source={{ uri: image }}
          />
          <Metadata name={name} description={text} />
        </View>
      );
    }
    else if(audio){
        return (
            <View style={[styles.border]}>
                <HeaderNoImage name={name} />
                <Player tracks={audio}/>
                <Metadata name={name} description={text} />
            </View>
        );
    }
    else
    {
      return (
        <View style={[styles.border]}>
          <HeaderNoImage name={name} />
          <Metadata name={name} description={text} />
        </View>
      );
    }
  }
}

const Metadata = ({ name, description }) => (
  <View>
    <Text style={[styles.subtitle, styles.description_padding]}>{description}</Text>
    <IconBar />
  </View>
);

const HeaderNoImage = ({ name }) => (
  <View style={[styles.header_row, styles.header_padding]}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

const Header = ({ name, image }) => (
  <View style={[styles.header_row, styles.header_padding]}>
    <View style={styles.header_row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  </View>
);

const Icon = ({ name }) => (
  <Ionicons style={{ marginRight: 8 }} name={name} size={26} color="#808080" />
);

const IconBar = () => (
    <View style={styles.actions_row}>
      <Icon name="ios-thumbs-up" />
      <Icon name="ios-chatboxes" />
      <Icon name="ios-more" />
    </View>
);

const styles = StyleSheet.create({
  text: { 
    fontWeight: '600',
    fontSize: 16
  },
  subtitle: {
    opacity: 0.8,
    fontSize: 16
  },
  header_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actions_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 15,
  },
  header_padding: {
    paddingLeft: 12,
    paddingTop: 15,
    paddingBottom: 12
  },
  description_padding: {
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 8
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
  border: {
    borderBottomWidth: 4,
  }
});
