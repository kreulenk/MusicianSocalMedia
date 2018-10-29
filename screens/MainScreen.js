import React from 'react';
import Fire from '../Fire'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: '',
    password: '',
  };

  onPress = () => {
      Fire.signIn({username: this.state.name, password: this.state.password}).then(user => {
          console.log("user: ", user);
          this.props.navigation.navigate('Chat', { name: this.state.name });
      }).catch(err => console.log("there was error", err));
  };

  onChangeName = name => this.setState({ name });
  onChangePassword = password => this.setState({ password });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your username:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          onChangeText={this.onChangeName}
          value={this.state.name}
        />
        <Text style={styles.title}>Enter your password:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          secureTextEntry={true}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
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
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default Main;
