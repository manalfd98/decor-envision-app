import { Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


const WishList = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  const [userData, setUserData] = useState(null);
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
  // Fetch data from Firestore
  useEffect(() => {
    if (userData) {
      const cartRef = firestore().collection(`WishList-${userData.uid}`);

      const unsubscribe = cartRef.onSnapshot((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          const itemData = doc.data();
          const item = { id: doc.id, ...itemData };
          
          items.push(item);
        });

        
        setCartItems(items);
      });

      return () => unsubscribe();
    }
  }, [userData]);
  const handleDelete = (itemId) => {
    if (userData) {
      const wishlistRef = firestore().collection(`WishList-${userData.uid}`);
      
      wishlistRef
        .doc(itemId)
        .delete()
        .then(() => {
          // Item deleted successfully
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    } else {
      console.error('User data not available');
    }
  };
  const handleMoveToCart = async (item) => {
    if (userData) {
      const cartRef = firestore().collection(`Cart-${userData.uid}`);
  
      // Check if the product is already in the cart
      const snapshot = await cartRef.where('product.producttitle', '==', item.product.producttitle).get();
  
      if (!snapshot.empty) {
        // Product is already in the cart
        Alert.alert('Product is already in the cart');
        return;
      }
  
      // If not in the cart, add it
      cartRef
        .add({
          product: item.product,
          qty: 1, // You can set the desired quantity here
        })
        .then((res) => {
          Alert.alert('Product Added to Cart');
        })
        .then(() => {
          // Item added to cart successfully
          handleDelete(item.id); // Remove the item from the wishlist
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
        });
    } else {
      console.error('User data not available');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WishList </Text>
      <FlatList
        data={cartItems} keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
          return (
            <View style={styles.productItem}>
              <Image source={{ uri: item.product.productimage }} style={styles.productImage}>
              </Image>

              <View style={styles.centerView}>
                <Text style={styles.name}>{item.product.producttitle}</Text>
                <Text style={styles.text}>{item.producttext}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.desc} >{"\nRs:"} {item.product.price * item.qty}</Text>
                </View>

              </View>


              <View style={styles.rightView}>
                <TouchableOpacity
                  onPress={() => handleMoveToCart(item)}
                  style={styles.addToCartButton}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                >
                  <Image source={require('../assets/deletebtn.png')} style={styles.deleteButton} />
                </TouchableOpacity>
              </View>


            </View>
          );
        }}
      />


    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 7,
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
  },
  productImage: {
    width: 70,
    height: 68,
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
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: 'black'
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'black'
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
  deleteButton: {
    width: 35,
    height: 29,
    resizeMode: 'contain',
    marginHorizontal: 4,
    alignItems: 'center'

  },

  addToCartButton: {
    backgroundColor: '#C56D6D',
    borderRadius: 5,
    padding: 8,
    marginTop: -14,
    marginBottom: 10
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});
