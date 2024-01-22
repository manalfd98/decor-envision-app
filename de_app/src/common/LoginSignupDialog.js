import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const LoginSignupDialog = ({onCancel, onCLickLoginSignup,visible}) => {
  return (
    <Modal visible={visible} transparent>
        <View style={styles.modalView}>
          <View style={styles.mainView}>
            <Text style={styles.msg}>
              {"Want to add product in cart?\n Please Login or Sign Up "}
            </Text>
            <TouchableOpacity style={styles.loginsignupbtn}>
            <Text style={styles.btntext}
            onPress={()=>{
              onCLickLoginSignup()
            }}>Login OR Sign UP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginsignupbtn,{backgroundColor:'gray', marginBottom:10}]}>
            <Text style={styles.btntext}
            onPress={()=>{
              onCancel()
            }}>Cancel</Text>
            </TouchableOpacity>

          </View>

        </View>

    </Modal>
  )
}

export default LoginSignupDialog

const styles = StyleSheet.create({
    modalView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    mainView:{
      width:'90%',
      backgroundColor:'white',
      borderRadius:10
    },
    msg:{
      color:'black',
      width:'80%',
      alignSelf:'center',
      marginTop:20,
      fontSize:20,
      fontWeight:'600',
      alignItems:'center'
  

    },
    loginsignupbtn:{
      width:'90%',
      height:50,
      backgroundColor:'purple',
      alignSelf:'center',
      marginTop:30,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
    },
    btntext:{
      color:'white',
      fontWeight:'600',
      fontSize:18

    }

})