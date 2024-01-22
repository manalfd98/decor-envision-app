import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, FlatList, StyleSheet, Image, SliderBox, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';




const User = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation()

  useEffect(() => {
    // Fetch user data from AsyncStorage when the component mounts
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data from AsyncStorage:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      // Remove user data from AsyncStorage when logging out
      await AsyncStorage.removeItem('userData');

      // Clear the userData state
      setUserData(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const handleLogin = async () => {
    navigation.navigate('Login');
    
    // After a successful login, immediately refresh the user data
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data from AsyncStorage:', error);
    }
  };
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch user data from AsyncStorage when the component mounts
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
  
          // Check if userData and uid are present before fetching orders
          if (userData?.uid) {
            const querySnapshot = await firestore()
              .collection('Orders')
              .where('uid', '==', userData.uid)
              .get();
  
            const ordersData = querySnapshot.docs.map(doc => ({
              orderId: doc.id,
              ...doc.data(),
            }));
  
            setOrders(ordersData);
          } else {
            console.error('User data or uid not available.');
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);
  
  const navigateToUserOrders = () => {
    navigation.navigate('UserOrder', { orders: orders });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userData ? (
        <View style={styles.userDataContainer}>
          <Image source={require('../assets/user.png')} style={styles.icon}></Image>
          <Text style={styles.userData}>Name: {userData.username}</Text>
          <Text style={styles.userData}>Email: {userData.email}</Text>
          <Text style={styles.userData}>Address: {userData.fulladdress}</Text>
          
          <TouchableOpacity style={styles.loginsignupbtn} >
            <Text style={styles.btntext}
              onPress={navigateToUserOrders}>My Orders</Text>
          </TouchableOpacity>
          {/* <Button  title="My Orders" onPress={navigateToUserOrders} /> */}
          {/* Display other user data */}

          <TouchableOpacity style={styles.loginsignupbtn} >
            <Text style={styles.btntext}
              onPress={handleLogout}>Logout </Text>
          </TouchableOpacity>

          {/* <Button title="Logout" onPress={handleLogout} /> */}
        </View>
      ) : (
        <View>
          <Text style={styles.noUserData}>
            No user data found. Please log in.
          </Text>
          <TouchableOpacity style={styles.loginsignupbtn} >
            <Text style={styles.btntext}
              onPress={handleLogin}>Login </Text>
          </TouchableOpacity>
          {/* <Button title="Login" onPress={handleLogin} /> */}
        </View>
      )}
    </View>
  );
};

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
  }

});
export default User;