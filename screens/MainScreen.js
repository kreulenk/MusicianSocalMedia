import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function signup_user(username_,password_){
  return fetch('https://sound-match.herokuapp.com/register',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      username:username_,
      password:password_
    }),
  }).then((response) => response.json());
}

function signin_user(screen, username_, password_){
  var url = 'https://sound-match.herokuapp.com/authenticate/' + username_ + '/' +password_;
  var myresponse = "ss";
  fetch(url, {
         method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
    myresponse= String(responseJson.message);
    if (myresponse=="successfully authenticated user") {
      screen.props.navigation.navigate('Main', { name: screen.state.name });
      return true;
    } else {
      screen.setState({error: 'Invalid username or password'});
      return false;
    }
  })
  .catch((error) => {
    console.error(error);
  })
  .done();
  return true;
}

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: '',
    password: '',
    error: '',
  };

  onPressSignIn = () => {
    if (this.state.name.length > 0 && this.state.password.length > 0) {
      signin_user(this, String(this.state.name),String(this.state.password));
    }
  };

  onPressSignUp = () => {
    if (this.state.name.length > 0 && this.state.password.length > 0) {
      signup_user(this.state.name,this.state.password);
      this.props.navigation.navigate('Survey', { name: this.state.name });
    }
  }

  onChangeName = name => this.setState({ name });
  onChangePassword = password => this.setState({ password });

  render() {
    return (
      <View style={styles.screen}>
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
    color: 'red',
    textAlign: 'center',
  },
  nameInput: {
    height: offset * 3,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    margin: 20
  },
});

export default Main;
