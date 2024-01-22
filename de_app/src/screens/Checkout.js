import { Dimensions, FlatList, StyleSheet, Text, View, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import uuid from 'react-native-uuid'


const Checkout = () => {

  const [cartList, setCartList] = useState([]);
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [fulladdress, setfulladdress] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliverycharge, setdeliverycharge] = useState('')
  const [shipping, setShipping] = useState('')
  const [userData, setUserData] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState('');
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
        setfulladdress(userData.fulladdress);

      }
    } catch (error) {
      console.error('Error fetching user data from AsyncStorage:', error);
    }
  };
  // Fetch data from Firestore
  useEffect(() => {
    if (userData) {
      const cartRef = firestore().collection(`Cart-${userData.uid}`);

      const unsubscribe = cartRef.onSnapshot((snapshot) => {
        const items = [];
        let itemsCount = 0;
        let itemsPrice = 0;

        snapshot.forEach((doc) => {
          const itemData = doc.data();
          const item = { id: doc.id, ...itemData };
          itemsCount += item.qty;
          itemsPrice += item.qty * item.product.price;
          items.push(item);
        });

        setTotalItems(itemsCount);
        setTotalPrice(itemsPrice);
        setCartItems(items);
      });

      return () => unsubscribe();
    }
  }, [userData]);
  const generateOrderId = () => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 1000
    return `${timestamp}-${randomNum}`; // Combine timestamp and random number to create the order ID

  };
  const currentdate = new Date(); // Current date and time

  const Date1 = currentdate.toDateString(); // Converts the date to a human-readable string

  const saveorder = async () => {
    try {
      const OrderID = generateOrderId();
      const orderData = {
        Date1,
        OrderID,
        payment: 'COD',
        shipping,
        deliverycharges,
        Status:"Pending",
        TotalAmount: totalamount,
        TotalQty: totalItems,
        TotalPrice: totalPrice,
        uid: userData.uid,
        Name: userData.username,
        Email: userData.email,
        fulladdress: fulladdress,
        phonenumber: userData.phonenumber,
        cartItems: cartItems,
      };

      // Check if an order already exists for the user
      const orderRef = firestore().collection('test-order').where('username', '==', userData.username);
      const snapshot = await orderRef.get();

      if (!snapshot.empty) {
        // If an order exists, update it
        const existingOrderDoc = snapshot.docs[0]; // Assuming there's only one order per user
        await existingOrderDoc.ref.update(orderData);
        Alert.alert('Order data updated successfully');
      } else {
        // If no order exists, create a new one
        await firestore().collection('test-order').add(orderData, cartItems);
        Alert.alert('Order data saved successfully');
      }

      navigation.navigate('ordersummary', { orderData });
    } catch (error) {
      console.error('Error saving or updating order data:', error);
    }
  };



  // Function to handle quantity decrease
  // Set the default shipping option
  const handleRadioChange = (option) => {
    setShipping(option);
    setSelectedShipping(option);
  };

  const handleDelete = () => {
    const cartRef = firestore().collection(`Cart-${userData.uid}`);
    cartRef.doc().delete()
      .then(() => {
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });

  };

  let deliverycharges = 0;
  switch (shipping) {
    case 'standard':
      deliverycharges = 500;
      break;
    case 'exclusive':
      deliverycharges = 1000;
      break;

  }
  const totalamount = totalPrice + deliverycharges;
  const handleCombinedClick = () => {
    if (!selectedShipping) {
      Alert.alert('Please select a shipping option');
      return;
    }

    ordersummaryID = generateOrderId();

    saveorder();
    handleDelete();


  };


  return (
    <View style={styles.container}>

      <Text style={styles.header}>Checkout Details</Text>
      <Text style={styles.header2}>Shipping Information</Text>



      {/* Standard Delivery */}
      <TouchableOpacity
        onPress={() => handleRadioChange('standard')}
        style={styles.radioButton}
      >
        <View
          style={[
            styles.radioCircle,
            {
              backgroundColor: shipping === 'standard' ? '#C58D8D' : 'transparent',
            },
          ]}
        />
        <Text style={styles.labelText}>Standard Delivery</Text>
      </TouchableOpacity>

      <Text style={styles.shippingText}>
        Order will be delivered within 20-25 days.
      </Text>
      <Text style={styles.shippingText}>Charges will be Rs.500.</Text>


      <TouchableOpacity
        onPress={() => handleRadioChange('exclusive')}
        style={styles.radioButton}
      >
        <View
          style={[
            styles.radioCircle,
            {
              backgroundColor: shipping === 'exclusive' ? '#C58D8D' : 'transparent',
            },
          ]}

        />
        <Text style={styles.labelText}>Exclusive Delivery</Text>
      </TouchableOpacity>
      <Text style={styles.shippingText}>
        Order will be delivered within 10-15 days.
      </Text>
      <Text style={styles.shippingText}>Charges will be Rs.1000.</Text>

      <View >

        <Text style={styles.text} >Shipping Address</Text>

        <Text style={styles.userData}>{fulladdress}</Text>
        <Text style={styles.header2}>Payment Information</Text>

        <View>
          <Text style={styles.text2} >Payment Type</Text>
          <Text style={styles.DevText}>Cash on Delivery Rs.{deliverycharges}</Text>
        </View>

      </View>

      <View style={styles.header}>
        <Text style={styles.totalText}>Sub Total: Rs.{totalPrice.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total with Delivery: Rs.{totalamount.toFixed(2)}</Text>
      </View>

      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleCombinedClick} >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 700 }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;

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
    marginTop: 7,
    marginLeft: 10

  },
  header2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black",
    marginTop: 18,
    marginLeft: 10

  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 80,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  desc: {

    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },

  text: {
    marginTop: 15,
    fontSize: 18,
    color: '#C58D8D',
    fontWeight: 'bold',
    marginLeft: 10

  },
  text2: {
    marginTop: 10,
    fontSize: 18,
    color: '#C58D8D',
    fontWeight: 'bold',
    marginLeft: 10

  },
  text1: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 270,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    color: 'black',

  },

  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightView: {
    marginLeft: 10,
    alignItems: 'center',
  },
  centerView: {
    marginLeft: 10,
    width: '40%',
  },
  radioButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10

  },
  radioCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C58D8D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#C58D8D',
  },
  labelText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'black',
    marginBottom: 2
  },

  shippingText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 35,
  },


  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'black'
  },

  totalText: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: 500,
    color: 'black'
  },
  DevText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 500,
    color: 'black',
    marginLeft:10
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

  btncontainer: {
    alignItems: "center"
  },
  button: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#C58D8D',
    color: 'white',
    width: 300,
    marginTop:20
    // marginLeft: 30,
  },
  userData: {
    height: 40,
    alignContent: 'center',
    color: 'black',
    borderWidth: 1,
    padding: 7,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: 'gainsboro',
    borderRadius: 6,
    borderColor: 'lightgrey',
    width: "96%",
    marginLeft: 10

  },


});