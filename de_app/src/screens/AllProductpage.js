import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'
import { Dimensions, StyleSheet, Image } from 'react-native'
import TouchableOpacity from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



const AllProductPage = (props) => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const collectionName = `product-${props.type.toUpperCase()}`;
        const snapshot = await firestore().collection(collectionName).get();
        const productArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productArray);
      } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
      }
    };

    getProducts();
  }, [props.type]);
  const handleProductSelect = (products) => {
    navigation.navigate('SpecificProductPage', { products }); // Navigate to the ProductPage screen with product data
  };

  return (
    <View style={styles.container}>

      <FlatList data={products} style={styles.list} renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => handleProductSelect(item)}>
            <View style={styles.productItem}>
              <Image source={{ uri: item.productimage }} style={styles.productImage}>
              </Image>

              <View style={styles.centerView}>
                <Text style={styles.name}>{item.producttitle}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.desc} >{"\nRs:"} {item.price}</Text>
                </View>
              </View>


            </View>
          </Pressable>
        );
      }}
      />


    </View>
  );

};

export default AllProductPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
    backgroundColor: '#E9D6D6',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  productImage: {
    width: 90,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor:'white'
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black'
  },
  desc: {
    fontSize: 12,
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
    width: '40%',

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