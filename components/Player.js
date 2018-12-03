import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import SeekBar from '../utils/SeekBar';
import PlaybackControls from '../utils/PlaybackControls';
import Expo, {Video, Audio} from 'expo';


export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldPlay: false,
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }

  setDuration(data) {
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  // onForward() {
  //   if (this.state.selectedTrack < this.props.tracks.length - 1) {
  //     this.refs.audioElement && this.refs.audioElement.seek(0);
  //     this.setState({ isChanging: true });
  //     setTimeout(() => this.setState({
  //       currentPosition: 0,
  //       totalLength: 1,
  //       paused: false,
  //       isChanging: false,
  //       selectedTrack: this.state.selectedTrack + 1,
  //     }), 0);
  //   }
  // }
    async onPressPlay() {
        const track = this.props.tracks;
        this.setState({shouldPlay: true, paused: false, currentPosition: 0});
        let soundObject = new Audio.Sound();
        console.log("please work", track);
        try {
            await soundObject.loadAsync({
                uri: track

            });
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
            console.log(error);
        }
    }



  render() {
    const track = this.props.tracks;
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track}} // Can be a URL or a local file.
        shouldPlay={this.state.shouldPlay}
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );

    return (
      <View style={styles.container}>
        
        <PlaybackControls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          //forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.onPressPlay()}
          onPressPause={() => this.setState({shouldPlay: false,
            paused: true})}
          onBack={this.onBack.bind(this)}
          //onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 20
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};