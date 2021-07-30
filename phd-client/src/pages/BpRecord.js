import React, { Component } from 'react';
import { Dimensions, StyleSheet, Modal, Text,  View,  TextInput,  ScrollView, AsyncStorage, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';


import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { getBpRecordRequest } from '../actions/bpActions';
import config from '../config';

class BpRecord extends Component {
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
      source: null,
      showPopup: false,
    }
    this.mapping = this.mapping.bind(this);
    this.getImage = this.getImage.bind(this);
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
          getBpRecordRequest(this.state.patientId).then((res)=> {
            this.setState({
              records: res.data.records,
            });
          }).catch((err)=> {
            alert("Error to fetch the patient record")
          })
        });
      });
  }

  getImage(imageId) {
        this.setState({
          source: `${config.url}/${imageId}`,
          showPopup: true,
        });
      }

  mapping(){
  let d =[];
  this.state.records.forEach((val, index)=> {
    d[index] = val;
    let a = d[index].date.split('T');
    d[index].date = a[0];
    d[index] = Object.values(d[index]);
    d[index] = d[index].slice(3);
  });
  return d;
  }

render(){
  const columns = ['Diastolic BP', 'Systolic BP', 'Result', 'Date', 'Report'];
  const columnWidth = [60, 55, 125, 75, 45];

  let dataSource = this.mapping();

  const element = (imageId, index) => (
    <TouchableOpacity onPress={() => this.getImage(imageId)}>
      <View>
        <Text style={{color: 'blue'}}>click</Text>
      </View>
    </TouchableOpacity>
  );

  return(
    <BackgroundImage>
    <ScrollView>
    <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showPopup}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({showPopup: false});
              }}>
              <Text style={{textAlign: "right"}}><Ionicons  name="md-close" size={32} color="#000" /></Text>
            </TouchableOpacity>
              <Image style={styles.reportImage} source={{uri: this.state.source}} />
            </View>
          </View>
        </Modal>


    <Text>{"\n"}</Text>
    <Text style={styles.secondaryText}>Patient Details are</Text>
      <Text style={styles.patientText}>Name: {this.state.patientName}</Text>
      <Text style={styles.patientText}>Mobile: {this.state.patientMobile}</Text>
        <Text style={styles.patientText}>Age: {this.state.patientAge}        Address: {this.state.patientAddress}</Text>
        <Text>{"\n"}</Text>
        <Table >
          <Row data={columns} style={styles.head} widthArr={columnWidth} />
            {
              dataSource.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellData != undefined ? cellIndex == 4 ? element(cellData, index) : cellData : "No data"} width= {columnWidth[cellIndex]}/>
                  ))
                }
                </TableWrapper>
              ))
            }
            </Table>
        <Text>{"\n"}</Text>
        <Button
          label="Get Summary"
          styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
          onPress={()=>{ this.props.navigation.navigate('BpSummary') }}
        />
     </ ScrollView>
    </ BackgroundImage>
  );
}

}

export default BpRecord;

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
  head:
  {
    height: 40,
    backgroundColor: '#efefef',
    borderRightColor: '#dfdfdf',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  reportImage: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },

});
