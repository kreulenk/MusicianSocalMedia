import { Ionicons } from '@expo/vector-icons';
import { Constants, ImagePicker, Audio, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import getPermission from '../utils/getPermission';
import Fire from '../Fire';

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

export default class ChatScreen extends Component {
    state = { name: '' };
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            name: Fire.shared.uid,
            _id: Fire.shared.uid,
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }
    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
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