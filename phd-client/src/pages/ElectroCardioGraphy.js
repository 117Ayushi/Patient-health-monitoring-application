import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage, Picker, Image} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';



import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { ecgRecordRequest } from '../actions/ecgActions';

class ElectroCardioGraphy extends Component {
  static navigationOptions = Header;


  constructor(props){
    super(props);
    this.state = {
      name: '',
      user_id: '',
      heart_rate: '',
      image: null,
      uploading: false,
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


  _takePhoto = async () => {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.setState({
        image: pickerResult,
      });
    };

  _pickImage = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.setState({
        image: pickerResult,
      });
    };


onSubmit(){
  let uri = this.state.image.uri;
  let formData = new FormData();
  formData.append('name', this.state.name);
  formData.append('user_id', this.state.user_id);
  formData.append('heart_rate', this.state.heart_rate);

  this.setState({ uploading: true });

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  ecgRecordRequest(formData).then((res)=> {
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
    this.setState({
      uploading: false,
    })
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
    <Text style={styles.heading}>Heart Rate</Text>
    <Picker style={styles.heartRatePicker}
      selectedValue={this.state.heart_rate}
      onValueChange={(itemValue, itemIndex) => this.setState({heart_rate: itemValue})}
      >
      <Picker.Item label="50" value="50" />
      <Picker.Item label="60" value="60" />
      <Picker.Item label="70" value="70" />
      <Picker.Item label="80" value="80" />
      <Picker.Item label="90" value="90" />
      <Picker.Item label="100" value="100" />
      <Picker.Item label="110" value="110" />
      <Picker.Item label="120" value="120" />
      <Picker.Item label="130" value="130" />
      <Picker.Item label="140" value="140" />
      <Picker.Item label="150" value="150" />
      <Picker.Item label="160" value="160" />
      <Picker.Item label="170" value="170" />
      <Picker.Item label="180" value="180" />
      <Picker.Item label="190" value="190" />
      <Picker.Item label="200" value="200" />
      <Picker.Item label="210" value="210" />
    </Picker>
    <Text>{"\n"}</Text>
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
      <Text style={styles.high}>Upload Report    </Text>
      <Ionicons onPress={this._pickImage} name="md-images" size={40} color="#FFF" />
      <Text>        </Text>
      <Ionicons onPress={this._takePhoto} name="md-camera" size={40} color="#FFF" />
    </View>
    <Text>{"\n"}</Text>
    <Button
      label="OK"
      styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
      onPress={this.onSubmit}
   />
   </ScrollView>
    </ BackgroundImage>

  );
}

}

export default ElectroCardioGraphy;

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
  heading: {
    marginLeft: 100,
    fontSize: 20,
    color: '#d7c3bf',
    fontWeight: 'bold',
  },
  heartRatePicker: {
    marginLeft: 100,
    backgroundColor: '#FFF',
    borderColor:  'black',
    marginRight: 100,
    borderRadius: 20,
  },
  high: {
    fontSize: 20,
    color: '#d7c3bf',
    fontWeight: 'bold',
  },

});
