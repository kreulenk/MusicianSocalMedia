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
    const { text, name, imageWidth, imageHeight, uid, image, audio, numberOfLikes} = this.props;

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
          <Metadata name={name} description={text} numberOfLikes={numberOfLikes}/>
        </View>
      );
    }
    else if(audio){
        return (
            <View style={[styles.border]}>
                <HeaderNoImage name={name} />
                <Player tracks={audio}/>
                <Metadata name={name} description={text} numberOfLikes={numberOfLikes}/>
            </View>
        );
    }
    else
    {
      return (
        <View style={[styles.border]}>
          <HeaderNoImage name={name} />
          <Metadata name={name} description={text} numberOfLikes={numberOfLikes}/>
        </View>
      );
    }
  }
}

const Metadata = ({ name, description, numberOfLikes }) => (
  <View>
    <Text style={[styles.subtitle, styles.description_padding]}>{description}</Text>
    <LikeCountCommentCount numberOfLikes={numberOfLikes}/>
    <IconBar/>
  </View>
);

const LikeCountCommentCount = ({ numberOfLikes }) => (
  <View style={styles.like_count_comment_count_row}>
    <Text style={styles.like_count_comment_count_text}>{numberOfLikes} Likes</Text>
  </View>
);

const HeaderNoImage = ({ name }) => (
  <View style={[styles.header_row, styles.header_padding]}>
    <Text style={styles.name_text}>{name}</Text>
  </View>
);

const Header = ({ name, image }) => (
  <View style={[styles.header_row, styles.header_padding]}>
    <View style={styles.header_row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.name_text}>{name}</Text>
    </View>
  </View>
);

const Icon = ({ name }) => (
  <Ionicons style={{ margin: 8 }} name={name} size={26} color="#808080" />
);

const IconBar = () => (
    <View style={styles.actions_row}>
      <View style={styles.action_item}>
        <Icon name="ios-thumbs-up" />
        <Text style={styles.action_text}>Like</Text>
      </View>
      <View style={styles.action_item}>
        <Icon name="ios-chatboxes" />
        <Text style={styles.action_text}>Comment</Text>
      </View>
    </View>
);

const styles = StyleSheet.create({
  text: { 
    fontWeight: '600',
    fontSize: 16
  },
  name_text: { 
    fontWeight: '600',
    fontSize: 20
  },
  action_text: { 
    fontWeight: '600',
    fontSize: 12
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
  like_count_comment_count_text: {
    fontWeight: '400',
    fontSize: 14,
    opacity: 0.8,
  },
  like_count_comment_count_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    marginTop: 3,
    borderTopWidth: 1,
    borderColor: '#F1F1F1'
  },
  action_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 12
  },
  actions_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
    // borderTopWidth: 1,
    backgroundColor: '#F1F1F1'
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
    borderBottomWidth: 10,
    borderColor: '#D3D3D3'
  }
});
