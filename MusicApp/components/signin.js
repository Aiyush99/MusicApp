import { StyleSheet, Text, View,TextInput,TouchableHighlight, ActivityIndicator, KeyboardAvoidingView,ImageBackground,Image,Dimensions,Alert } from 'react-native'
import React,{useState} from 'react'
import auth  from '@react-native-firebase/auth';

const { width } = Dimensions.get('window')
export default function Signup({navigation}) {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);

    const fetchUser = async() => {
      if ( !email  || !password ) {
        Alert.alert("Enter all the required fields")
       }
       else {
          setLoading(true)
          try {
            const response = await auth().signInWithEmailAndPassword(email,password)
            console.log(response)
          } catch (error) {
            if (error.code === 'auth/user-not-found') {
              Alert.alert('Invalid Email or Password');
            }
          } finally {
            setLoading(false)
            setEmail('')
            setPassword('')
          }
      }
    }

  return (
    
    <View style={styles.container}>
        <ImageBackground source={require("../assets/audio.jpg")} resizeMode='cover' style={styles.imgbackground}>

        <Image style={{width:"30%",height:"15%",borderRadius:60}} source={require("../assets/logo.jpg")}/>
        <Text style={{color:"white",fontSize:35,fontWeight:"bold"}}>Music App</Text>
        <Text style={{color:"white",fontSize:15,fontWeight:"bold",marginBottom:20}}>Now Feel The Music </Text>
        <View style={styles.inputContainer}>
          
          <TextInput style={styles.inputs}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text)=>{setEmail(text)}}/>
        </View>
        
        <View style={styles.inputContainer}>
       
          <TextInput style={styles.inputs}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => {setPassword(text)}}/>
        </View>

        {loading ? <ActivityIndicator size='large' color="green"/>
        :<>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={fetchUser}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.signUpText]} onPress={() => navigation.navigate("signup")}>
          <Text style={styles.signUpText}>Don't Have an Account? Register</Text>
        </TouchableHighlight>
        </>
        }
        </ImageBackground>
      </View>
     
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
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
      signintext:{
        color:"white",
        fontSize:20
      },
      imgbackground:{
        width:width,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:1.5
    },
})