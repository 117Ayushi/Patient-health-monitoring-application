import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage, Picker} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { temperatureRecordRequest } from '../actions/temperatureActions';

class Temperature extends Component {
  static navigationOptions = Header;


  constructor(props){
    super(props);
    this.state = {
      name: '',
      user_id: '',
      temperature: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
        AsyncStorage.multiGet(['username', 'user_id']).then((result)=> {
          this.setState({
            name: result[0][1],
            user_id: result[1][1],
          });
        });
  }


  onSubmit(){
    temperatureRecordRequest(this.state).then((res)=> {
        this.props.navigation.navigate('Patient');
        alert(`Hi ${this.state.name} your test report submit successfully`);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Welcome' }),
            NavigationActions.navigate({ routeName: 'PatientWelcome' }),
          ],
        }));
    }).catch((err)=> {
      alert(`Hi ${this.state.name} your session expired. Please login again.`);
    })
  }


render(){
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.primaryText}>Hi</Text>
    <Text style={styles.userText}>{this.state.name}</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Enter Your Test Details</Text>
    <Text>{"\n"}</Text>
    <Text style={styles.low}>Temperature</Text>
    <Picker style={styles.temperaturePicker}
      selectedValue={this.state.temperature}
      onValueChange={(itemValue, itemIndex) => this.setState({temperature: itemValue})}
    >
      <Picker.Item label="94" value="94" />
      <Picker.Item label="95" value="95" />
      <Picker.Item label="96" value="96" />
      <Picker.Item label="97" value="97" />
      <Picker.Item label="98" value="98" />
      <Picker.Item label="99" value="99" />
      <Picker.Item label="100" value="100" />
      <Picker.Item label="101" value="101" />
      <Picker.Item label="102" value="102" />
      <Picker.Item label="103" value="103" />
      <Picker.Item label="104" value="104" />
      <Picker.Item label="105" value="105" />
      <Picker.Item label="106" value="106" />
      <Picker.Item label="107" value="107" />
    </Picker>
    <Text>{"\n"}</Text>
    <Text>{"\n"}</Text>
    <Button
      label="OK"
      styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
      onPress={this.onSubmit}
   />
   </ ScrollView>
    </ BackgroundImage>

  );
}

}

export default Temperature;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#1F978B',
    padding: 20,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
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
  inline: {
    flexDirection: 'row',
  },
  low: {
    marginLeft: 100,
    fontSize: 20,
    color: '#d7c3bf',
    fontWeight: 'bold',
  },
  temperaturePicker: {
    marginLeft: 100,
    backgroundColor: '#FFF',
    borderColor:  'black',
    marginRight: 100,
    borderRadius: 20,
  },

});
