import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Home from '../tabs/Home'
import Search from '../tabs/Search'
import Cart from '../tabs/Cart'
import WishList from '../tabs/WishList'
import User from '../tabs/User'

const Main = () => {

    const [activeTab, setActiveTab] = useState(0)
    


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>

            {activeTab == 0 ? (<Home />) : activeTab == 1 ? (<Search />) : activeTab == 2 ? (<Cart />) : activeTab == 3 ? (<WishList />) : (<User />)}
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.tab}
                    onPress={() => {
                        setActiveTab(0)
                    }}>
                    <Image source={require('../assets/home.png')} style={[styles.tabIcon, { tintColor: activeTab == 0 ? '#AE8585' : '#944545' }]}></Image>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.tab} onPress={() => {
                    setActiveTab(1)
                }}>
                    <Image source={require('../assets/search.png')} style={[styles.tabIcon, { tintColor: activeTab == 1 ? '#AE8585' : '#944545' }]}></Image>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.tab} onPress={() => {
                    setActiveTab(2)
                }}>
                    <Image source={require('../assets/cart.png')} style={[styles.tabIcon, { tintColor: activeTab == 2 ? '#AE8585' : '#944545' }]}></Image>

                </TouchableOpacity>

                <TouchableOpacity style={styles.tab} onPress={() => {
                    setActiveTab(3)
                }}>
                    <Image source={require('../assets/wish.png')} style={[styles.tabIcon, { tintColor: activeTab == 3 ? '#AE8585' : '#944545' }]}></Image>

                </TouchableOpacity>

                <TouchableOpacity style={styles.tab} onPress={() => {
                    setActiveTab(4)
                }}>
                    <Image source={require('../assets/user.png')} style={[styles.tabIcon, { tintColor: activeTab == 4 ? '#AE8585' : '#944545' }]}></Image>
                </TouchableOpacity>




            </View>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 80,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#E9D6D6',
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    tab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: 30,
        height: 30
    },
    cartCount: {
        backgroundColor: '#C58D8D',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 6,
        position: 'absolute',
        top: 15,
        right: 6,
        fontWeight: 700,
    },
})