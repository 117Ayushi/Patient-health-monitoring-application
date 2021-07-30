import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  AsyncStorage,
  StatusBar,
  Image
} from 'react-native';
import {
  StackNavigator,
  SwitchNavigator
} from 'react-navigation';

import Container from './src/components/Container';
import Button from './src/components/Button';
import Label from './src/components/Label';

import LoginScreen from './src/pages/Login';
import SignupScreen from './src/pages/Signup';
import WelcomeScreen from './src/pages/Welcome';
import PatientScreen from './src/pages/Patient';
import DoctorScreen from './src/pages/Doctor';
import BloodPressureScreen from './src/pages/BloodPressure';
import ElectroCardioGraphyScreen from './src/pages/ElectroCardioGraphy';
import TemperatureScreen from './src/pages/Temperature';
import PatientDetailsScreen from './src/pages/PatientDetails';
import BpRecordScreen from './src/pages/BpRecord';
import EcgRecordScreen from './src/pages/EcgRecord';
import TemperatureRecordScreen from './src/pages/TemperatureRecord';
import BpSummaryScreen from './src/pages/BpSummary';
import EcgSummaryScreen from './src/pages/EcgSummary';
import TemperatureSummaryScreen from './src/pages/TemperatureSummary';
import PatientWelcomeScreen from './src/pages/PatientWelcome';
import BpKmeansScreen from './src/pages/BpKmeans';
import EcgKmeansScreen from './src/pages/EcgKmeans';
import TemperatureKmeansScreen from './src/pages/TemperatureKmeans';

import setAuthorizationToken from './src/utils/setAuthorizationToken';


class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async() => {
    const userToken = await AsyncStorage.getItem('jwtToken');
    await setAuthorizationToken(userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }, 3000)
  };

  render() {
    return (
      <View
        style = {styles.container}
      >
      <StatusBar />
      <Image
        source = {require('./src/images/logo.jpeg')}
        style = {styles.image}
      />
      </View>
    );
  }
}



const AppStack = StackNavigator({
  Welcome: WelcomeScreen,
  Patient: PatientScreen,
  Doctor: DoctorScreen,
  BloodPressure: BloodPressureScreen,
  ElectroCardioGraphy: ElectroCardioGraphyScreen,
  Temperature: TemperatureScreen,
  PatientDetails: PatientDetailsScreen,
  BpRecord: BpRecordScreen,
  EcgRecord: EcgRecordScreen,
  TemperatureRecord: TemperatureRecordScreen,
  BpSummary: BpSummaryScreen,
  EcgSummary: EcgSummaryScreen,
  TemperatureSummary: TemperatureSummaryScreen,
  PatientWelcome: PatientWelcomeScreen,
  BpKmeans: BpKmeansScreen,
  EcgKmeans: EcgKmeansScreen,
  TemperatureKmeans: TemperatureKmeansScreen,
}, {
  initialRouteName: 'Welcome',
});
const AuthStack = StackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
}, {
  initialRouteName: 'Login',
});

export default SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {

  }
});
