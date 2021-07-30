import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage'


class Welcome extends Component {
  static navigationOptions = Header;


  constructor(props){
    super(props);
    this.state = {
      name: '',
      role: '',
      patientId: '',
      patientName: '',
      patientAge: '',
      patientMobile: '',
      patientAddress: '',
    }
    this.onDoctorButton = this.onDoctorButton.bind(this);
  }

  onDoctorButton(){
    AsyncStorage.getItem('role', (err, result)=> {
      if(result.toLowerCase() == "doctor"){
        this.props.navigation.navigate('Doctor')
      } else {
        alert('You are not a Doctor');
      }
      });
  }

  componentDidMount(){
    AsyncStorage.multiGet(['username', 'user_id', 'age', 'mobile', 'address']).then((result)=> {
      this.setState({
        name: result[0][1],
        patientName: result[0][1],
        patientId: result[1][1],
        patientAge: result[2][1],
        patientMobile: result[3][1],
        patientAddress: result[4][1],
      });
  });
  }

render(){
  return(
    <BackgroundImage>
    <Text style={styles.primaryText}>Welcome to the</Text>
    <Text style={styles.primaryText}>PHD</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.userText}>Hello</Text>
    <Text style={styles.userText}>{this.state.name}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>You are a</Text>
    <Text>{"\n"}</Text>
      <Button
        label="Doctor"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={this.onDoctorButton}
     />
     <Text style={styles.primaryText}>OR</Text>
      <Button
        label="Patient"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={
          ()=>{
            AsyncStorage.multiSet([ ['patientId', this.state.patientId],
                                    ['patientName', this.state.patientName],
                                    ['patientAge', this.state.patientAge],
                                    ['patientMobile', this.state.patientMobile],
                                    ['patientAddress', this.state.patientAddress]
                                  ]);
            this.props.navigation.navigate('PatientWelcome')
        }
      }
     />
    </ BackgroundImage>

  );
}

}

export default Welcome;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#1F978B',
    padding: 20,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 1,
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  primaryText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
  },
  userText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    fontSize: 25,
    color: '#ee9886',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  secondaryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  }
});
