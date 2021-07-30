import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage'


class PatientDetails extends Component {
  static navigationOptions = Header;


  constructor(props){
    super(props);
    this.state = {
      name: '',
      patientName: '',
      patientAge: '',
      patientMobile: '',
      patientAddress: '',
      patientId: '',
      role: '',
    }

  }

  componentDidMount(){
    AsyncStorage.multiGet(['username', 'patientName', 'patientAge', 'patientMobile', 'patientAddress', 'patientId', 'role'], (err, result)=> {
      this.setState({
          name: result[0][1],
          patientName: result[1][1],
          patientAge: result[2][1],
          patientMobile: result[3][1],
          patientAddress: result[4][1],
          patientId: result[5][1],
          role: result[6][1],
        });
      });
  }

render(){
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text style={styles.primaryText}>Hello</Text>
    <Text  style={styles.userText}>{this.state.role === 'Doctor' ? 'Dr.' : ''} {this.state.name}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Patient Details are</Text>
      <Text style={styles.patientText}>Name: {this.state.patientName}</Text>
      <Text style={styles.patientText}>Mobile: {this.state.patientMobile}</Text>
        <Text style={styles.patientText}>Age: {this.state.patientAge}        Address: {this.state.patientAddress}</Text>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
      <Button
        label="Get BP Record"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={()=>this.props.navigation.navigate('BpRecord')}
     />
     <Text>{"\n"}</Text>
      <Button
        label="Get ECG Record"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={()=>this.props.navigation.navigate('EcgRecord')}
     />
     <Text>{"\n"}</Text>
     <Button
       label="Get Temperature Record"
       styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
       onPress={()=>this.props.navigation.navigate('TemperatureRecord')}
    />
    </ScrollView>
    </ BackgroundImage>

  );
}

}

export default PatientDetails;

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
  },
  patientText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    fontSize: 16,
    color: '#FAAC58',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
});
