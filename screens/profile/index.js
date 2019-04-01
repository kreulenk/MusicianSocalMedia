import React from 'react'
import Profile from './Profile';
import contact from '../../assets/mocks/contact.json'
import contactA from '../../assets/mocks/contactA.json'
import contactB from '../../assets/mocks/contactB.json'
import {Text, View} from "react-native";

var contacts = [];
contacts.push(JSON.parse(JSON.stringify(contact)));
contacts.push(JSON.parse(JSON.stringify(contactA)));
contacts.push(JSON.parse(JSON.stringify(contactB)));

export default class extends React.Component {
  state = {};

  render() {
    var username = this.props.navigation.getParam('name');
    var personalizedContactData = undefined;
    for (var contact of contacts) {
      if (contact.username === username) {
        personalizedContactData = contact;
      }
    }
    if (!personalizedContactData) {
      personalizedContactData = contacts[0];
    }

    return (
        <View>
          <Text style={{fontSize: 40, fontWeight: 'bold', textAlign: 'center', color: 'purple', fontFamily: 'SnellRoundhand-Bold', height: 45}}>tutti</Text>
          <Profile {...personalizedContactData} />
        </View>
    );
  }
}
