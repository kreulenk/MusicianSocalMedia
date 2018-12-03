import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultipleChoice from 'rn-multiple-choice'


export default class SurveyScreen extends React.Component {
    static navigationOptions ={
        title: 'Survey',

    };
    onPress = () =>
        this.props.navigation.navigate('Feed');

    render() {
        return (
            <ScrollView style={styles.screen}>
                <Text style = {styles.title}> Which description best describes you?</Text>
                <MultipleChoice
                    options={[
                        'Producer',
                        'Vocalist',
                        'Instrumentalist',
                        'Label/Venue'
                        ]}
                    maxSelectedOptions={4}
                    style = {styles.multiple_choice}
                />
                <Text style = {styles.title}> Who are you looking to collaborate with?</Text>
                <MultipleChoice
                    options={[
                        'Producer',
                        'Vocalist',
                        'Instrumentalist',
                        'Label/Venue'
                    ]}
                    maxSelectedOptions={4}
                    style = {styles.multiple_choice}
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
                    maxSelectedOptions={5}
                    style = {styles.multiple_choice}
                />
                <TouchableOpacity onPress={this.onPress}>
                    <Text style={styles.buttonText}> Done!</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}

const offset = 24;
const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        // flexDirection: 'column',
        // // justifyContent: 'center',
        // // alignItems: 'stretch',
        marginTop: 40,
        marginBottom: 40
    },
    title: {
        marginTop: offset * 2,
        marginBottom: offset / 2,
        marginLeft: offset,
        marginRight: offset,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    multiple_choice: {
        marginLeft: offset * 1.3,
        marginRight: offset * 1.3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        margin: offset
    }
});
