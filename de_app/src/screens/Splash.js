import { Button, Image, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import splash from '../assets/splash.png'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'


const Splash = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Main")
        }, 2000)

    }, [])

    const getStarted = () => {
        navigation.navigate('Main');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#D0C4B7' }}>

            <ImageBackground source={splash} style={{ height: '100%',width:'100%'}}>

                <TouchableOpacity style={styles.getbutton}
                    onPress={() => {
                        getStarted();
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 700 }}
                    >
                        Get Started
                    </Text>

                </TouchableOpacity>
            </ImageBackground>



                {/* <Image source={splash} style={styles.img}></Image> */}


        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    img: {
        height: '100%',
        width: '100%'
    },
    getbutton: {
        borderWidth: 1,
        padding: 12,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: 'black',
        color: 'white',
        width: 200,
        marginTop:690,
        marginLeft:96
      
    }
})