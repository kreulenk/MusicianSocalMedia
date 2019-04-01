import React from 'react';
import Fire, {googleLogin} from '../Fire';
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
    name: 'kreulenk@gmail.com',
    password: 'maggie',
    error: '',
  };


  onPressSignIn = () => {
      // console.log("first", Fire.shared.uid());
      // Fire.shared.handleLogin(this.state.name, this.state.password);
      //
      googleLogin().then(console.log("dine"));
      // if (Fire.shared.uid()) {
      //     console.log(Fire.shared.uid());
      //     this.props.navigation.navigate('Main', { name: this.state.name });
      // }
  };

  onPressSignUp = () => {
    if (this.state.name.length > 0 && this.state.password.length > 0) {
      signup_user(this.state.name,this.state.password);
      this.props.navigation.navigate('Survey', { name: this.state.name });
    }
  };

  onChangeName = name => this.setState({ name });
  onChangePassword = password => this.setState({ password });

  render() {
    return (
      <View style={styles.screen}>
        <Text style={{fontSize: 40, fontWeight: 'bold', textAlign: 'center', color: 'purple', fontFamily: 'SnellRoundhand-Bold', height: 45}}>tutti</Text>
        <Text style={styles.title}>Username:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeName}
          value={this.state.name}
          p
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          secureTextEntry={true}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.onPressSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{this.state.error}</Text>
      </View>
    );
  }
}

const offset = 18;
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'stretch',
    flex: 2
  },
  title: {
    marginTop: offset,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  nameInput: {
    height: offset * 3,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    margin: 20
  },
});

export default Main;
