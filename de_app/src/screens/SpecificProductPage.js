import { Dimensions, FlatList, StyleSheet, Text, View, Image, Alert, SliderBox, Button, Linking, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import SceneComponent from '../babylon/SceneComponent';
import ARView from './ARView';



const SpecificProductPage = ({ route }) => {
    const navigation = useNavigation()

    const { products } = route.params;
    const [cartadata, setcartdata] = useState([]);

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

    //
    const [CartItems, setCartItems] = useState([]);
    const [producttitle, setproducttitle] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        if (userData) {
            const cartRef = firestore().collection(`Cart-${userData.uid}`);

            const unsubscribe = cartRef.onSnapshot((snapshot) => {
                const items = [];
                let itemsCount = 0;
                let itemname;
                snapshot.forEach((doc) => {
                    const itemData = doc.data();
                    const item = { id: doc.id, ...itemData };
                    itemsCount += item.qty;


                    items.push(item);
                });
                setTotalItems(itemsCount);
                setCartItems(items);


            });

            return () => unsubscribe();

        } else {
            // User is logged out, reset the totalItems to zero
            setTotalItems(0);
            setCartItems([]); // Assuming you have a cartItems state as well
        }
    }, [userData]);

    const [totalwish, settotalwish] = useState(0);
    useEffect(() => {
        if (userData) {
            const cartRef = firestore().collection(`WishList-${userData.uid}`);

            const unsubscribe = cartRef.onSnapshot((snapshot) => {
                const items = [];
                let itemsCount = 0;
                let itemname;
                snapshot.forEach((doc) => {
                    const itemData = doc.data();
                    const item = { id: doc.id, ...itemData };
                    itemsCount += item.qty;

                    items.push(item);
                });
                settotalwish(itemsCount);

            });

            return () => unsubscribe();

        } else {
            // User is logged out, reset the totalItems to zero
            settotalwish(0);

        }
    }, [userData]);


    const addtowishlist = async (item) => {
        if (!userData) {
            Alert.alert(
                'You are not logged in',
                'Please log in to add items to the wishlist.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Log In',
                        onPress: () => {
                            // Navigate to the login page
                            navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
                        },
                    },
                ]
            );
            return;
        }

        const cartRef = firestore().collection(`WishList-${userData.uid}`);

        // Check if the item with the same title already exists in the cart
        const existingCartItemQuery = await cartRef
            .where('product.producttitle', '==', products.producttitle)
            .get();

        if (!existingCartItemQuery.empty) {
            Alert.alert('Item already in wishlist');
            return;
        }

        const cartId = uuid.v4();

        // If the item does not exist in the cart, add it
        cartRef
            .doc(cartId)
            .set({
                ...item,
                qty: 1,
                addedBy: userData.uid,
                cartId: cartId,
                product: products
            })
            .then((res) => {
                Alert.alert('Your Item added successfully');
                // After adding the item, update the cart data state
                // Call the function to refresh the cart data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const AddtoCart = async (item) => {
        if (!userData) {
            Alert.alert(
                'You are not logged in',
                'Please log in to add items to the wishlist.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Log In',
                        onPress: () => {
                            // Navigate to the login page
                            navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
                        },
                    },
                ]
            );
            return;
        }

        const cartRef = firestore().collection(`Cart-${userData.uid}`);

        // Check if the item with the same title already exists in the cart
        const existingCartItemQuery = await cartRef
            .where('product.producttitle', '==', products.producttitle)
            .get();

        if (!existingCartItemQuery.empty) {
            Alert.alert('Item already in wishlist');
            return;
        }

        const cartId = uuid.v4();

        // If the item does not exist in the cart, add it
        cartRef
            .doc(cartId)
            .set({
                ...item,
                qty: 1,
                addedBy: userData.uid,
                cartId: cartId,
                product: products
            })
            .then((res) => {
                Alert.alert('Your Product added Wishlist');
                // After adding the item, update the cart data state
                // Call the function to refresh the cart data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };




    const handleCustomization = (products) => {
        navigation.navigate('Customization', { products });
    };
    const click = () => {
        navigation.navigate('cart');
    };

    const viewAR = () => {
        const url = products.ARLink;
        Linking.openURL(url);
    };


    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('user')
                }}>
                    <Image source={require('../assets/user.png')} style={styles.wishIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    click();
                }}>
                    <Image source={require('../assets/cart.png')} style={styles.wishIcon} />
                    <Text style={styles.cartCount}>{totalItems}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('wishlist');
                    }}>
                    <Image source={require('../assets/wish.png')} style={styles.wishIcon} />
                    <Text style={styles.cartCount}>{totalwish}</Text>

                </TouchableOpacity>
            </View>


            <View style={styles.topHalf} >
                <View style={styles.productItem}>
                    <Image source={{ uri: products.productimage }} style={styles.productImage}></Image>
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                    </Text>

                </View>

                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require('../assets/aricon.png')} style={{ width: 18, marginBottom: 10, height: 20 }}></Image>
                    <Text onPress={() => {
                        viewAR();
                    }} style={styles.arview}>View in AR</Text>
                </TouchableOpacity>

                {/* <View >
                    <Text>AR View</Text>
                    <SceneComponent style={{ flex: 1 }} />
                </View> */}
                <ScrollView style={{ backgroundColor: "#E9D6D6", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.productName}>{products.producttitle}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                addtowishlist();
                            }} >
                            <Image source={require('../assets/wish.png')} style={styles.wishbutton} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.productPrice}>Rs {products.price}</Text>
                    <Text style={styles.productDes}>Description </Text>
                    <Text style={styles.productDescription}>{products.description}</Text>
                    <Text style={styles.productDescription}>Color: {products.color} </Text>
                    <Text style={styles.productDescription}>Material: {products.material}</Text>
                    <Text style={styles.productDescription}>Fabric: {products.fabric} </Text>


                    <View style={styles.btncontainer}>

                        <TouchableOpacity style={styles.cusbutton}
                            onPress={() => {
                                handleCustomization(products);
                            }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 700 }}
                            >
                                Customization
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                AddtoCart();
                            }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 700 }}
                            >
                                Add to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>

            {/* Add more product details here */}



        </View>

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    header: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
        // height: 65,
        // backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align icons to the right
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 8

    },


    tab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImage: {
        marginBottom: 8,
        width: 200,
        height: 160,
        marginLeft: 10,
        alignSelf: 'center',
        marginTop: 15
    },
    productName: {
        fontSize: 30,
        fontWeight: 800,
        marginTop: 8,
        marginLeft: 30,
        color: 'black',


    },
    productPrice: {
        fontSize: 20,
        marginTop: 3,
        marginLeft: 30,
        fontWeight: 600,
        color: 'black'
    },
    productDes: {
        fontSize: 22,
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 700,
        color: 'black',
    },
    productDescription: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 30,
        color: 'black',
        marginRight: 10
    },
    topHalf: {
        flex: 1,

        backgroundColor: 'white', // Color for the top half
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 250,
        marginTop: 15,

    },
    // wishIcon: {
    //     width: 35,
    //     height: 32,
    //     margin: 3,
    //     left: 130
    // },
    wishIcon: {
        width: 35,
        height: 32,
        resizeMode: 'contain',
        marginHorizontal: 5, // Reduce the space between icons horizontally
    },
    wishbutton: {
        width: 35,
        height: 32,
        resizeMode: 'contain',
        marginHorizontal: 9,
        marginTop: 10,
    },
    cartCount: {
        backgroundColor: '#C58D8D',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 6,
        position: 'absolute',
        top: 9,
        right: 4,
        fontWeight: 700
    },
    btncontainer: {
        alignItems: "center"
    },
    button: {
        borderWidth: 1,
        padding: 18,
        borderColor: 'pink',
        borderRadius: 20,
        backgroundColor: '#C58D8D',
        color: 'white',
        width: 300,
    },
    cusbutton: {
        borderWidth: 1,
        padding: 18,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: 'black',
        color: 'white',
        width: 300,
        marginTop: 15,
        marginBottom: 5,
    },
    arview: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        marginLeft: 8
    }


});



export default SpecificProductPage