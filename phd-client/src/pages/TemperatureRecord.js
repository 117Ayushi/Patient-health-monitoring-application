import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Table from 'react-native-simple-table'


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { getTemperatureRecordRequest } from '../actions/temperatureActions';

class TemperatureRecord extends Component {
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
      records: [],
    }
    this.mapping = this.mapping.bind(this);
  }

  componentDidMount(){
    AsyncStorage.multiGet(['username', 'patientName', 'patientAge', 'patientMobile', 'patientAddress', 'patientId'], (err, result)=> {
      this.setState({
          name: result[0][1],
          patientName: result[1][1],
          patientAge: result[2][1],
          patientMobile: result[3][1],
          patientAddress: result[4][1],
          patientId: result[5][1],
        }, ()=> {
          getTemperatureRecordRequest(this.state.patientId).then((res)=> {
            this.setState({
              records: res.data.records,
            });
          }).catch((err)=> {
            alert("Error to fetch the patient record")
          })
        });
      });
  }

  mapping(){
  let d =[];
  this.state.records.forEach((val, index)=> {
    d[index] = val;
    let a = d[index].date.split('T');
    d[index].date = a[0];
  });
  return d;
  }

render(){
  const columns = [
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    width: 100
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 100
  },
  {
    title: 'Result',
    dataIndex: 'patient_condition',
    width: 160
  },
];

let dataSource = this.mapping();
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Patient Details are</Text>
      <Text style={styles.patientText}>Name: {this.state.patientName}</Text>
      <Text style={styles.patientText}>Mobile: {this.state.patientMobile}</Text>
        <Text style={styles.patientText}>Age: {this.state.patientAge}        Address: {this.state.patientAddress}</Text>
        <Text>{"\n"}</Text>
        <Table height={320} columnWidth={60} columns={columns} dataSource={dataSource} />
        <Text>{"\n"}</Text>
        <Button
          label="Get Summary"
          styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
          onPress={()=>{this.props.navigation.navigate('TemperatureSummary') }}
        />
     </ ScrollView>
    </ BackgroundImage>

  );
}

}

export default TemperatureRecord;

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
    fontSize: 14,
    color: '#FAAC58',
    marginLeft: 20,
    marginRight: 20,
  },
});
