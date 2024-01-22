import { Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native'
import LoginSignupDialog from '../common/LoginSignupDialog'
import Login from './Login'
import uuid from 'react-native-uuid'

// import {getStorage, ref, getDownloadURL} from 'firestore/storage'

const Sofa = () => {
    const navigation=useNavigation()
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = () => {
        firestore().collection("products").get().then(snapshot => {
            if (snapshot.docs != []) {
                setProducts(snapshot.docs);
            }
        });
    };

    const checkLogin = async (item) => {
        let id = await AsyncStorage.getItem('userId');
        const cartId=uuid.v4();
        if (id!= null) {
            firestore().collection('cart').doc(cartId)
            .set({...item._data, addedBy: id, qty:1 , cartId:cartId})
            .then(res=>{
                console.log("add");

            }).catch(error=>{
                console.log("error");

            });
            // navigation.navigate("Cart")

        } else {
            setVisible(true)
        }

    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Décor Envision</Text>
            </View>
            <View>
                <FlatList data={products} renderItem={({ item, index }) => {
                    return (
                        <View style={styles.productItem}>
                            <Image source={{uri:item._data.image}} style={styles.productImage}></Image>
                            <View style={styles.centerView}>
                                <Text style={styles.name}>{item._data.name}</Text>
                                <Text style={styles.desc}>{item._data.description}</Text>
                                <View style={styles.priceView}>
                                    <Text style={styles.desc} >{"\nRS:"} {item._data.price}</Text>
                                </View>
                            </View>
                            <View style={styles.rightView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        checkLogin(item)
                                    }}>
                                    <Image source={require('../assets/wish.png')} style={styles.icon}>

                                    </Image>
                                </TouchableOpacity>
                                <Text style={styles.addToCart} 
                                onPress={() => {
                                    checkLogin(item)
                                }}>Add to Cart</Text>
                            </View>

                        </View>
                    );
                }}
                />
            </View>
         <LoginSignupDialog onCLickLoginSignup={()=>{
            navigation.navigate("Login")

         }} onCancel={()=>{
            setVisible(false)

         }} visible={visible}/>

        </View>
    );
};

export default Sofa

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 65,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        paddingLeft: 20
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '600'
    },
    productItem: {
        width: Dimensions.get('window').width = '100%',
        height: 100,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: 10,
        fontWeight: '500',
        color: 'black'
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightView: {
        marginLeft: 10,
        alignItems: 'center'
    },
    centerView: {
        marginLeft: 10,
        width: '40%'
    },
    icon: {
        width: 30,
        height: 30
    },
    addToCart: {
        padding: 10,
        borderWidth: .5,
        color: 'black',
        fontWeight: '600',
        marginTop: 10,
        borderRadius: 10
    }
})