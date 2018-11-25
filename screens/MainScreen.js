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
  console.log(url);
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
    }).catch((error) => {
      console.error(error);
    }).done();
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
    signin_user(this, String(this.state.name),String(this.state.password));
  };

  onPressSignUp = () => {
    signup_user(this.state.name,this.state.password);
    this.props.navigation.navigate('Survey', { name: this.state.name });
  }

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
    padding: 10
  },
});

export default Main;
