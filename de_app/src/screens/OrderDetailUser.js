import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { Dimensions, FlatList, StyleSheet, Text, View, Image, Alert, SliderBox, Button, Linking, StatusBar } from 'react-native'
const OrderDetailUser = ({route}) => {
    const [userOrders, setUserOrders] = useState([]);
    const navigation = useNavigation()

    const { cartItems } = route.params
  
   
    return (
        <View style={styles.container} >
          <Text style={styles.title}>My Items</Text>
          <FlatList
                data={cartItems} data1={cartItems}  keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
                    return (
                        <View style={styles.productItem}>
                            <Image source={{ uri: item.product.productimage }} style={styles.productImage}>
                            </Image>

                            <View style={styles.centerView}>
                                <Text style={styles.name}>{item.product.producttitle}</Text>
                            
                                <View style={styles.priceView}>
                                    <Text style={styles.desc} >{"\nRs:"} {item.product.price * item.qty}</Text>
                                </View>

                            </View>


                            



                        </View>
                    );
                }}
            />
        </View>
      );
  };
export default OrderDetailUser;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:7,
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingHorizontal: 20,
      backgroundColor:'white'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
      marginTop:10,
      marginLeft:10
    },
    userDataContainer: {
      marginTop: 10,
      // alignItems: 'center',
    },
    userData: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color: 'black',
      marginBottom: 8,
      marginLeft:10
    },
    noUserData: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom:18,
      color: 'red',
      marginLeft:10
    },
    icon: {
      width: 60,
      height: 60,
      alignSelf:'center',
      
    },
    loginsignupbtn: {
      width: 120,
      height: 50,
      backgroundColor: '#C58D8D',
      alignSelf: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:20
    },
    btntext: {
      color: 'white',
      fontWeight: '600',
      fontSize: 18
    },container: {
        flex: 1,
        padding: 7,
        paddingBottom: 100,
        backgroundColor: 'white'

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "black",
        marginTop: 7,
        marginLeft: 10
    },
    productItem: {
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: '#E9D6D6',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6

    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: 'white'
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    desc: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
    },

    text: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',

    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightView: {
        marginLeft: 10,
        alignItems: 'center',
        marginTop: 10

    },
    centerView: {
        marginLeft: 10,
        width: '48%',
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,

    },
    quantityButton: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'black',
        backgroundColor: 'white',

    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 10,
        color: 'black',
        backgroundColor: 'white'
    },

    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 10, // Adjust the spacing as needed
        borderTopWidth: 1,

        paddingTop: 10,
        alignItems: 'flex-end',

        borderTopColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'red', // Background color of the bottom view
    },
  
  });
