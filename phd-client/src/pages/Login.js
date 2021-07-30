import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import { login } from '../actions/authActions';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';


function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class Login extends Component {
  static navigationOptions = {
    title: 'Enter Your Login Details',
    headerStyle: {
      backgroundColor: '#1F978B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },

};

  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

 onSubmit() {
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      login(this.state).then(
        (res) => {
          this.props.navigation.navigate('App');
        },
        (err) => this.setState({ isLoading: false }, ()=> {
          alert('Invalid Credentials', "Invalid Credentials");
        })
      );
    }
  }


 render() {
   const { errors } = this.state;
   return (
       <ScrollView style={styles.scroll}>
           <Container>
               <Label text="Email or Mobile" />
               <TextInput
                  style={styles.textInput}
                  onChangeText={(identifier)=> this.setState({identifier})}
                  value={this.state.identifier}
                  placeholder="Email/Mobile"
                />
               {errors && <Text>{errors.identifier}</Text>}
           </Container>
           <Container>
               <Label text="Password" />
               <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={(password)=> this.setState({password})}
                  value={this.state.password}
                  placeholder="Password"
                />
               {errors && <Text>{errors.password}</Text>}
           </Container>
           <View style={styles.footer}>
               <Container>
                 <Button
                   label="Log In"
                   styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                   onPress={this.onSubmit}
                   disabled={this.state.isLoading}
                />
               </Container>
               <View style={styles.inline}>
               <Text>Dont Have an Account?  </Text>
               <Button
                 label="Signup"
                 styles={{button: styles.signup, label: styles.buttonBlueText }}
                 onPress={()=> this.props.navigation.navigate('Signup')}
               />
               </View>
           </View>
       </ScrollView>
   );
 }
}

export default Login;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#E1D7D8',
    padding: 30,
    flexDirection: 'column'
          },
  label: {
    color: '#0d8898'
        },
  alignRight: {
    alignSelf: 'flex-end'
        },
  textInput: {
    height: 40,
    backgroundColor: '#FFF'
      },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
      },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
      },
  primaryButton: {
    backgroundColor: '#34A853'
      },
  footer: {
   marginTop: 80
 },
 inline: {
   flexDirection: 'row'
 },
 signup: {
   padding: 0,
 },
 buttonBlueText: {
   fontSize: 15,
   color: '#895474',
 },
});
