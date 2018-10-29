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
            <ScrollView>
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
                <Text style = {styles.title}> Who are you looking to collaborate with?</Text>
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

            </ScrollView>
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
    }
});
