import { Dimensions, FlatList, StyleSheet, Text, View, Image, SliderBox, Button, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import pic from '../assets/banner1.jpg'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import Categories from '../screens/Categories'
import Slider from '../screens/Slider'
import SceneComponent from '../babylon/SceneComponent'


const Home = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Décor Envision</Text>
            </View>


            <Image source={require('../assets/pic1.jpg')} style={{ width: "100%", height: "25%" }}></Image>
            
            <Text style={styles.homehed}>
                Explore Categories
            </Text>

            <Categories />
            <Text style={styles.homehed2}>Try in 3D</Text>

            <Slider />

        </View>
    );
};

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        height: 90,
        borderRadius: 10,
        marginLeft: 10
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
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
    },
    homehed: {
        fontSize: 18,
        marginTop: 14,
        marginBottom: 13,
        marginLeft: 10,
        fontWeight: "800",
        color: 'black'

    },
    homehed2: {
        fontSize: 18,
        marginTop: 11,
        marginLeft: 10,
        fontWeight: "800",
        color: 'black'

    },
    homehed3: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "800",
        color: 'black'

    }
})