import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import pic1 from '../assets/pic1.jpg'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Signup from './Signup'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const navigation = useNavigation()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleLogin = () => {
    // Replace this with your actual login logic
    const isValidEmail = (email) => {
      // Basic email validation regex
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
  
    const isValidPassword = (password) => {
      // Password must be at least 6 characters long
      return password.length >= 4;
    };
    // Validate email
    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }
  
    // Validate password
    if (!isValidPassword(password)) {
      Alert.alert('Please enter a valid password (at least 6 characters).');
      return;
    }
    firestore()
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .get()
      .then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          // Save the user data to AsyncStorage
          try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
          } catch (error) {
            console.error('Error saving user data to AsyncStorage:', error);
          }

          Alert.alert('Login Successful', 'You are now logged in.', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Main'); // Navigate to the home screen
              },
            },
          ]);
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      });
  };



  return (
    <View style={styles.container}>
      <Image source={pic1} style={styles.banner}></Image>
      <View style={styles.card}>
        <Text style={styles.title}>LOGIN</Text>
        <Text style={styles.text} >Email</Text>

        <TextInput value={email} onChangeText={txt => setemail(txt)} style={styles.input} placeholder='Enter Email' />
        <Text style={styles.text} >Password</Text>

        <TextInput value={password}  secureTextEntry onChangeText={txt => setpassword(txt)} style={styles.input} placeholder='Enter Password' />
        <TouchableOpacity style={styles.loginsignupbtn} >
          <Text style={styles.btntext}
            onPress={() => {
              handleLogin();


            }}>Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginsignupbtn, { backgroundColor: 'black'}]}>
          <Text style={[styles.btntext, { color: 'white'}]}
            onPress={() => {
              navigation.navigate("Signup")

            }}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  banner: {
    width: '100%',
    height: 200

  },
  card: {
    width: '96%',
    marginTop: 10,
    height: '80%',
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'white',
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    color: 'black',
    alignSelf: 'center'
  }
  , title: {
    fontSize: 29,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 600,
    marginTop: 30
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black', paddingLeft: 20, marginTop: 10,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    color: 'black'

  }, loginsignupbtn: {
    width: '90%',
    height: 50,
    backgroundColor: '#C58D8D',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btntext: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18

  }
})