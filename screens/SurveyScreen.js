import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultipleChoice from 'rn-multiple-choice'

import  PropTypes from 'prop-types';


export default class SurveyScreen extends React.Component {
    static navigationOptions ={
        title: 'Survey',

    }
    onPress = () =>
        this.props.navigation.navigate('Feed');

    render() {
        return (
            <View>
                <Text style = {styles.title}> Which description best describes you?</Text>
                <MultipleChoice
                    options={[
                        'Producer',
                        'Vocalist',
                        'Instrumentalist',
                        'Label/Venue'
                        ]}
                    maxSelectedOptions={3}
                    />
                <Text style = {styles.title}> Who are you looking to collaboate with?</Text>
                <MultipleChoice
                    options={[
                        'Producer',
                        'Vocalist',
                        'Instrumentalist',
                        'Label/Venue'
                    ]}
                    maxSelectedOptions={3}
                />
                <Text style = {styles.title}> What genre best describes your music?</Text>
                <MultipleChoice
                    options={[
                        'Hip-Hop/Rap',
                        'Pop',
                        'Indie',
                        'Electronic',
                        'Folk'
                    ]}
                    maxSelectedOptions={3}
                />
                <TouchableOpacity onPress={this.onPress}>
                    <Text style={styles.buttonText}> Done!</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const offset = 24;
const styles = StyleSheet.create({
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    buttonText: {
        marginLeft: offset,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
});
