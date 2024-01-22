import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const Categories = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.categoryPage}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SofaProducts')
                        }} style={styles.categoryContainer}>
                        <Image
                            source={require("../assets/sofa.png")} style={{ width: 50, height: 50 }}>
                        </Image>
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize:16, fontWeight:"800", color:'black' }}
                        >Sofa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Bed')
                    }} style={styles.categoryContainer}>
                        <Image
                            source={require("../assets/bed.png")} style={{ width: 50, height: 50 }}>
                        </Image>
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize:16, fontWeight:"800", color:'black' }}
                        >Bed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Chair')
                        }} style={styles.categoryContainer}>
                        <Image
                            source={require("../assets/chair.png")} style={{ width: 60, height: 50 }}>
                        </Image>
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize:16, fontWeight:"800", color:'black' }}
                        >Chair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Table')
                    }} style={styles.categoryContainer}>
                        <Image
                            source={require("../assets/table.png")} style={{ width: 50, height: 50 }}>
                        </Image>
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize:16, fontWeight:"800", color:'black' }}
                        >Table</Text>
                    </TouchableOpacity>


                </ScrollView>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    categoryPage: {
        backgroundColor: "#E9D6D6",
    },
    
    categoryContainer: {
        margin: 8, 
        backgroundColor: "white", 
        padding: 20, 
        borderRadius: 7, 
        borderStyle:'solid', 
        borderColor:'#e9d6d6', 
        borderWidth:2
    },
    image: {
        width: '50%',
        height: 50,
    },
    categoryDetail: {
        marginTop: 10,
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Categories;