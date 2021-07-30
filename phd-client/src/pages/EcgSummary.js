import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  TextInput,  AsyncStorage, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Pie from 'react-native-pie';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { getCountRequest } from '../actions/ecgActions';

class EcgSummary extends Component {
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
      series: [],
      label: [],
    }
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
          getCountRequest(this.state.patientId).then((res)=> {
            let count = res.data.count;
            let series = [];
            let label = [];
            res.data.records.forEach((val, index)=> {
              series[index] = (val["count"]/count)*100 ;
              label[index]= val["patient_condition"];
            });
            this.setState({
              series,
              label,
            });
          }).catch((err)=> {
            alert("No record found")
          });
        });
        });
  }



render(){
  const colors = ['#AF2045', '#089631', '#033E6F']
  return(
    <BackgroundImage>
    <ScrollView>
    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Patient Details are</Text>
      <Text style={styles.patientText}>Name: {this.state.patientName}</Text>
      <Text style={styles.patientText}>Mobile: {this.state.patientMobile}</Text>
        <Text style={styles.patientText}>Age: {this.state.patientAge}        Address: {this.state.patientAddress}</Text>
        <Text>{"\n"}</Text>
        <View style={styles.textContainer}>
        {this.state.label.map((name, i) => (
          <Text
          key={name}
          style={{color: colors[i], fontSize: 16}}
          >
          {name}
          </Text>
        ))}
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.container}>
        <Pie
           radius={120}
           innerRadius={40}
           series={this.state.series}
           colors={colors}
           />
           </View>
           <Text>{"\n"}</Text>
           <Button
             label="Apply kmeans"
             styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
             onPress={()=>{ this.props.navigation.navigate('EcgKmeans')}}
           />
           </ScrollView>
    </ BackgroundImage>
  );
}

}

export default EcgSummary;

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
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 40,
},
});
