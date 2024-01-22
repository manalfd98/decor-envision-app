
import { Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const OrderFinalpage = ({ route }) => {
  const navigation = useNavigation();
  const { orderData } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Placed</Text>

      <View style={styles.head}>
        <Image source={require('../assets/greencheck.png')} style={{ width: "30%", height: "25%" }}></Image>
        <Text style={styles.text}>Thank You! {orderData.Name}</Text>
        <Text style={styles.text}>For Shopping With us..</Text>
        <Text style={styles.text}>Date: {orderData.Date1}</Text>
        <Text style={styles.text}>OrderID: {orderData.OrderID}</Text>
        <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Main")
          }
          }
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 700 }}>
              Back To Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};



export default OrderFinalpage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding:7
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black",
    marginTop: 7,
    marginLeft: 10

  },
  head:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:90

  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,

  },
  btncontainer: {
    alignItems: "center",
    marginTop: 20,


  },
  button: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#C58D8D',
    color: 'white',
    width: 300,
    marginTop: 20,
    marginBottom: 20
  },
});
