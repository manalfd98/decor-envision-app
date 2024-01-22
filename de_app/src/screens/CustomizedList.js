import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid'

const CustomizedList = ({ route }) => {
    
    const { cartItems } = route.params;
    const productTitle = cartItems.product.producttitle;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Customized Product Information</Text>
            </View>


            <View style={styles.productItem}>
                <Image source={{ uri: cartItems.product.productimage }} style={styles.productImage}></Image>

                <View style={styles.centerView}>
                    <Text style={styles.name}>{productTitle}</Text>
                    <View style={styles.priceView}>
                        <Text style={styles.desc} >{"\nRs:"} {cartItems.product.price}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.productDetailsContainer}>
                <Text style={styles.productDetailItem}>Height: {cartItems.newheight}</Text>
                <Text style={styles.productDetailItem}>Width: {cartItems.newwidth}</Text>
                <Text style={styles.productDetailItem}>Length: {cartItems.newlength}</Text>
                <Text style={styles.productDetailItem}>Color: {cartItems.newcolor}</Text>
                <Text style={styles.productDetailItem}>Product Description: {cartItems.description}</Text>
            </View>
            </View>

    )
}

export default CustomizedList

const styles = StyleSheet.create({
    container: {
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
        marginTop: 10,
        marginLeft: 10
    },


    name: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black'
    },
   
    title: {
        fontSize: 22,
        color: 'black',
        fontWeight: '700'
    },
    productItem: {
        width: Dimensions.get('window').width = '100%',
        height: 100,
        backgroundColor: '#E9D6D6',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 90,
        height: 80,
        borderRadius: 10,
        marginLeft: 10
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black'
    },
    desc: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black'
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productDetailsContainer: {
        backgroundColor: '#F2F2F2',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    productDetailItem: {
        fontSize: 18,
        marginBottom: 8,
        color: 'black',
        fontWeight:'500'
    },icon: {
        width: 30,
        height: 30
    },centerView: {
        marginLeft: 10,
        width: '40%',

    },
})