import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { Dimensions, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Linking, StatusBar } from 'react-native'
const UserOrder = ({ route }) => {
    const navigation = useNavigation()

    const { orders } = route.params;



    const navigateToOrderDetails = (order) => {
        const cartItems = order.cartitems || order.cartItems || [];

        // Pass cartItems to the 'OrderDetails' screen
        navigation.navigate('OrderDetails', { cartItems });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>
            {orders.length > 0 ? (
                <FlatList
                    data={orders} keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
                        return (
                            <View>

                                <View style={styles.centerView}>
                                    <Text style={styles.nameuser}>OrderID: {item.OrderID}</Text>
                                    <Text style={styles.nameuser}>Total Price: Rs {item.TotalPrice}</Text>
                                    <Text style={styles.nameuser}>Total Amount with charges: Rs {item.TotalAmount}</Text>
                                    <Text style={styles.nameuser}>Status: {item.Status}</Text>
                                    <TouchableOpacity style={styles.loginsignupbtn} onPress={() => navigateToOrderDetails(item)}>
                                        <Text style={styles.btntext}>View</Text>
                                    </TouchableOpacity>

                                </View>



                            </View>
                        );
                    }}
                />
            ) : (
                <Text>No orders found.</Text>
            )}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        marginTop: 10,
        marginLeft: 10
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
        marginLeft: 10
    },
    noUserData: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 18,
        color: 'red',
        marginLeft: 10
    },
    icon: {
        width: 60,
        height: 60,
        alignSelf: 'center',

    },
    loginsignupbtn: {
        width: 60,
        height: 50,
        backgroundColor: '#C58D8D',
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18
    },
    productItem: {
        width: Dimensions.get('window').width,
        height: 130,
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
    nameuser: {
        fontSize: 17,
        fontWeight: '500',
        color: 'black',
        marginTop: 10,
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
        marginLeft: 130,
        alignItems: 'center',
        marginBottom: 30

    },
    centerView: {
        marginLeft: 10,
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
      }


});
export default UserOrder