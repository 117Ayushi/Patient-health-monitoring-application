import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage'


class PatientWelcome extends Component {
  static navigationOptions = Header;


  constructor(props){
    super(props);
    this.state = {
      name: '',
      role: '',
    }
  }


  componentDidMount(){
    AsyncStorage.getItem('username', (err, result)=> {
      this.setState({
          name: result
        });
      });
  }

render(){
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text style={styles.userText}>Hello</Text>
    <Text style={styles.userText}>{this.state.name}</Text>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Have you gone through test</Text>
    <Text>{"\n"}</Text>
      <Button
        label="New Test Entry"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={()=>this.props.navigation.navigate('Patient')}
     />
     <Text style={styles.primaryText}>OR</Text>
     <Text style={styles.secondaryText}>Want to check old records</Text>
     <Text>{"\n"}</Text>
      <Button
        label="Get Previous Record"
        styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
        onPress={()=>this.props.navigation.navigate('PatientDetails')}
     />
     </ScrollView>
    </ BackgroundImage>

  );
}

}

export default PatientWelcome;

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
