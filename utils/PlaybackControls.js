import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const PlaybackControls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
        source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_shuffle_black_24dp.png')}/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity onPress={onBack}>
      <Image source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_skip_previous_black_24dp.png')}/>
    </TouchableOpacity>
    <View style={{width: 20}} />
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_pause_black_24dp.png')}/>
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_play_arrow_black_24dp.png')}/>
        </View>
      </TouchableOpacity>
    }
    <View style={{width: 20}} />
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3}]}
        source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_skip_next_black_24dp.png')}/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('C:/Users/dtrem/Documents/SoundMatch/SoundMatch_app/assets/images/baseline_replay_black_24dp.png')}/>
    </TouchableOpacity>
  </View>
);

export default PlaybackControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})