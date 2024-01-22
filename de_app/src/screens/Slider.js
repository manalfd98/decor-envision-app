import { StyleSheet, Text, View, Pressable, Image, FlatList, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';


const Slider = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getProducts = async () => {
            const collectionName = `product-SOFA`;
            const snapshot = await firestore().collection(collectionName).get();
            const productArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productArray);


        };

        getProducts();
    }, []);

    const handleProductSelect = (products) => {
        navigation.navigate('SpecificProductPage', { products }); // Navigate to the ProductPage screen with product data
      };



    return (
        <View style={styles.container}>
                <FlatList horizontal data={products} style={styles.slider}  renderItem={({ item, index }) => {
                    return (
                        
                        <Pressable style={styles.sliderConatiner} onPress={() => handleProductSelect(item)} >
                            <View style={styles.productItem}>
                                <Image source={{ uri: item.productimage }} style={styles.productImage}>
                                </Image>

                                <View>
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
export default Slider

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    slider:{
        // backgroundColor: "",
    },
    sliderConatiner:{
        margin: 8, 
        backgroundColor: "white", 
        padding: 5, 
        borderRadius: 7, 
        borderStyle:'solid', 
        borderColor:'#E9D6D6', 
        borderWidth:3,
        height:160

    },
    productItem: {
        height: 30,
        width:150,
        // alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        // flexDirection:'row',
      },
      productImage: {
        width: 90,
        height: 80,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center'
      },
      name: {
        fontSize: 15,
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
      
      icon: {
        width: 30,
        height: 30
      },
      

})