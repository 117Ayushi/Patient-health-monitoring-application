import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { getPatientDetails } from '../actions/doctorActions';


class Doctor extends Component {
  static navigationOptions = Header;

  constructor(props){
    super(props);
    this.state = {
      name: '',
      patientName: '',
      identifier: '',
    }
    this.onGetPatientDetails = this.onGetPatientDetails.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem('username', (err, result)=> {
      this.setState({
          name: result
        });
      });
  }


onGetPatientDetails(){
  getPatientDetails(this.state.identifier).then((res)=> {
    const username = res.data.user.name;
    const age = res.data.user.age.toString();
    const address = res.data.user.address
    const mobile = res.data.user.mobile.toString();
    const id = res.data.user.id.toString();

    AsyncStorage.multiSet([['patientName', username], ['patientAge', age], ['patientAddress', address], ['patientMobile', mobile], ['patientId', id]]);
    this.props.navigation.navigate('PatientDetails');
  }).catch((err)=> {
    alert("There is no user with such details");
  })
}


render(){
  return(
    <BackgroundImage>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.primaryText}>Welcome</Text>
    <Text style={styles.userText}>Dr. {this.state.name}</Text>
    <Text>{"\n"}</Text>
    <Container>
        <Text style={styles.secondaryText}>Patient Name</Text>
        <TextInput
           placeholder="Patient Name"
           style={styles.textInput}
           onChangeText={(patientName)=> this.setState({patientName})}
           value={this.state.patientName}
         />
    </Container>
    <Container>
        <Text style={styles.secondaryText}>Email/Mobile</Text>
        <TextInput
           placeholder="Email/Mobile"
           style={styles.textInput}
           onChangeText={(identifier)=> this.setState({identifier})}
           value={this.state.identifier}
         />
    </Container>
     <Text>{"\n"}</Text>
     <Button
       label="Get Patient Details"
       styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
       onPress={this.onGetPatientDetails}
    />
    </ BackgroundImage>

  );
}

}

export default Doctor;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#1F978B',
    padding: 20,
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 40,
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
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: '#FFF',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
});
