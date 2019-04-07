import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import Fire from '../Fire';


const FirstRoute = () => (
    <View style={[styles.scene]} >
        <FlatList
            data={[{key: 'a', title: "Producer needed", message: "We here at ABC records are in desperate need of a producer. Check out our website to see the application"},
                    {key: 'b', title: "Sound Engineer needed", message: "At city winery we need a sound engineer. Apply below. www.apply.com"}
                    ]}
            renderItem={({item}) => <View style={styles.post}> <Text style={styles.title}>{item.title}</Text> <Text style={styles.message}>{item.message}</Text> </View>}
        />
    </View>
);
const SecondRoute = () => (
    <View style={[styles.scene]} />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    message: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    post: {
        padding: 10,
        margin: 5,
        backgroundColor: '#dcdfe5'
    }
});