import React, { Component } from 'react';
import {  Dimensions, StyleSheet, Modal,  Text,  View,  TextInput,  ScrollView, AsyncStorage, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';
import  ScatterChart  from 'react-native-scatter-chart';
import kmeans from 'kmeans-node';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { getTemperatureRecordRequest } from '../actions/temperatureActions';
import config from '../config';

class TemperatureKmeans extends Component {
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
    this.setPatientDetails = this.setPatientDetails.bind(this);
    this.mappingKmeans = this.mappingKmeans.bind(this);
  }

  componentDidMount(){
    this.setPatientDetails();
  }


  setPatientDetails(){
      AsyncStorage.multiGet(['username', 'patientName', 'patientAge', 'patientMobile', 'patientAddress', 'patientId']).then((result)=>{
        this.setState({
            name: result[0][1],
            patientName: result[1][1],
            patientAge: result[2][1],
            patientMobile: result[3][1],
            patientAddress: result[4][1],
            patientId: result[5][1],
          });
      }).then(()=> {
          getTemperatureRecordRequest(this.state.patientId).then((result)=> {
            let filterRecord =[];
            result.data.records.forEach((val,index)=> {
              filterRecord.push([val.temperature])
            });
            this.setState({
              records: filterRecord,
            });
          })
      });
  }

  mappingKmeans(){
    let result = kmeans.array(this.state.records,3);
    let filterRecord=[];
    result.forEach((val,index)=> {
      filterRecord.push(val.points)
    })
    return filterRecord;
  }


render(){
  let chartData=[];
  let data = [];
  if(this.state.records.length > 6){
    data = mappingKmeans();

    chartData = [
      {
        color: 'red',
        unit: '%',
        values: data[0]
      },
      {
        color: 'green',
        unit: '%',
        values: data[1]
      },
      {
        color: 'blue',
        unit: '%',
        values: data[2]
      }
];
} else {
  data = this.state.records;
  chartData = [
    {
      color: 'red',
      unit: '%',
      values: data
    }]
}
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Patient Details are</Text>
      <Text style={styles.patientText}>Name: {this.state.patientName}</Text>
      <Text style={styles.patientText}>Mobile: {this.state.patientMobile}</Text>
        <Text style={styles.patientText}>Age: {this.state.patientAge}        Address: {this.state.patientAddress}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <ScatterChart
          backgroundColor='#ffffff'
          data={chartData}
          minY={10}
          maxY={200}
          minX={10}
          maxX={200}
          height={200}
          horizontalLinesAt={[ 0, 50, 100, 150, 200]}
          verticalLinesAt={[0, 50, 100, 150, 200]}
          unitY=''
          unitX='Temperature'
        />
     </ ScrollView>
    </ BackgroundImage>

  );
}

}

export default TemperatureKmeans;

const styles = StyleSheet.create({
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
