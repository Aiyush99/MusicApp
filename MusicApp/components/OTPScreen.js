import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,TextInput,Dimensions } from 'react-native'
import React,{useState} from 'react'

const { width } = Dimensions.get('window')
export default function OTPScreen() {

    const [loading,setLoading] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

  return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/audio.jpg")} resizeMode='cover' style={styles.imgbackground}>
        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
              placeholder="Enter Mobile Number"
              keyboardType="text"
              underlineColorAndroid='transparent'/>
          
        </View>

        {loading ? <ActivityIndicator size='large' color="green"/>
        :<>
        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]}>
          <Text style={styles.signUpText}>Submit</Text>
        </TouchableOpacity>
        </>
        }
        </ImageBackground>
      </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgbackground:{
        width:width,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:1.5
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:350,
        borderRadius:30,
      },
      signupButton: {
        backgroundColor: "#1ED661",
      },
      signUpText: {
        color: 'white',
        fontSize:20
      },
})