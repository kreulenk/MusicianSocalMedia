import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import Fire from '../Fire';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class DiscoverScreen extends Component {

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Jobs' },
            { key: 'second', title: 'Events' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});