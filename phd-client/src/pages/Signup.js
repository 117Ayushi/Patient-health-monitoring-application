import React, { Component } from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, CheckBox } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import { userSignupRequest, isUserExists } from '../actions/signupActions';

function validateInput(data) {
  let errors = {};

  if (isEmpty(data.age)) {
    errors.age = 'This field is required';
  }
  if (isEmpty(data.mobile)) {
    errors.mobile = 'This field is required';
  }
  if (isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (isEmpty(data.name)) {
    errors.name = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}



class Signup extends Component {
  static navigationOptions = {
  title: '   Register here   ',
  headerStyle: {
      backgroundColor: '#1F978B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
};

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      role: 'Patient',
      mobile: '',
      address: '',
      age: '',
      errors: {},
      isLoading: false,
      invalid: false,
      isChecked: false,
    }
    this.toggleChange = this.toggleChange.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
  }


  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onPress(){
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      userSignupRequest(this.state).then(
        () => {  this.props.navigation.navigate('Login')   },
        (err) => {  this.setState({ errors: err.response.data, isLoading: false })  }
      );
    }
  }

  checkUserExists() {
    let field = "email";
    let val = this.state.email;
    if (val !== '') {
      isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  toggleChange = () => {
   if(this.state.isChecked === false){
      this.setState({
        isChecked: !this.state.isChecked,
        role : "Doctor"
      });
  } else {
    this.setState({
      isChecked: !this.state.isChecked,
      role : "Patient"
    });
  }
  }

  onSwitch(){
    this.props.navigation.navigate('Login');
  }



  render() {
    const { errors } = this.state;
    return (
        <ScrollView style={styles.scroll}>
            <Container>
                <Label text="Name" />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(name)=> this.setState({name})}
                  value={this.state.name}
                  placeholder="name"
                 />
                 {errors && <Text>{errors.name}</Text>}
            </Container>
            <Container>
                <Label text="Email" />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(email)=> {this.setState({email: email})}
                  }
                  value={this.state.email}
                  onBlur={()=>this.checkUserExists("email")}
                  placeholder="email"
                />
                {errors && <Text>{errors.email}</Text>}
            </Container>
            <Container>
                <Label text="Mobile" />
                <TextInput
                  style={styles.textInput}
                  value={this.state.mobile}
                  onChangeText={(mobile)=> this.setState({mobile})}
                  placeholder="mobile"
                />
                {errors && <Text>{errors.mobile}</Text>}
            </Container>
            <Container>
                <Label text="Address" />
                <TextInput
                  style={styles.textInput}
                  value={this.state.address}
                  onChangeText={(address)=> this.setState({address})}
                  placeholder="address"
                />
                {errors && <Text>{errors.address}</Text>}
            </Container>
            <Container>
                <Label text="Age" />
                <TextInput
                  style={styles.textInput}
                  value={this.state.age}
                  onChangeText={(age)=> this.setState({age})}
                  placeholder="age"
                />
                {errors && <Text>{errors.age}</Text>}
            </Container>
            <Container>
                <Label text="Password" />
                <TextInput
                   secureTextEntry={true}
                   style={styles.textInput}
                   value={this.state.password}
                   onChangeText={(password)=> this.setState({password})}
                   placeholder="password"
                />
                {errors && <Text>{errors.password}</Text>}
            </Container>
            <Container>
                <Label text="Password Confirmation" />
                <TextInput
                  secureTextEntry={true}
                  style={styles.textInput}
                  value={this.state.passwordConfirmation}
                  onChangeText={(passwordConfirmation)=> this.setState({passwordConfirmation})}
                  placeholder="Re-enter your password"
                />
                {errors && <Text>{errors.passwordConfirmation}</Text>}
            </Container>
              <View style = {styles.inline}>
                <CheckBox
                  value={this.state.isChecked}
                  onChange={this.toggleChange}
                  name="role"
                />
                <Text style = {styles.text}>Doctor</Text>
                <Text>    (Only if you are doctor)</Text>
                </View>
            <View style={styles.footer}>
                <Container>
                  <Button
                    label="Sign Up"
                    styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                    onPress={this.onPress}
                    disabled={this.state.isLoading || this.state.invalid}
                  />
                </Container>
                <View style={styles.inline}>
                <Text>Already Have an Account?  </Text>
                <Button
                  label="Login"
                  styles={{button: styles.login, label: styles.buttonBlueText }}
                  onPress={this.onSwitch}
                />
                </View>
            </View>
        </ScrollView>
    );
  }
}


export default Signup;


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
    height: 25,
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
    marginTop: 80,
    marginBottom: 120
  },
  inline: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 20
  },
  buttonBlueText: {
    fontSize: 15,
    color: '#895474',
  },
  login: {
    padding: 0,
  }
});
