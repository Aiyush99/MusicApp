import { StyleSheet, Text, View,TextInput,TouchableHighlight, ActivityIndicator, KeyboardAvoidingView, ImageBackground,Dimensions,Image, Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import auth  from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';

const { width } = Dimensions.get('window')



export default function Signup({navigation}) {
    
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '927898348853-ne92j09vjngp9ncoh7f4f42ru96lvo1n.apps.googleusercontent.com',
      offlineAccess: true
    });
  }, [])
  
  

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);
    const [showAlertState,setShowAlert] = useState(false)

    const showAlert = () => {
      setShowAlert(true);
    };
  
    const hideAlert = () => {
      setShowAlert(false);
    };

    const saveUser = async() => {
       if (!name  || !email  || !password ) {
        Alert.alert("Enter all the required fields")
       }
       else {
            setLoading(true)
            try {
               await auth().createUserWithEmailAndPassword(email,password)
              .then((res) => {
                res.user.updateProfile({
                  displayName:name
                })
              })
            } catch (error) {
              
              if (error.code === 'auth/email-already-in-use') {
                console.log("inside error")
                showAlert();
              }
          
              if (error.code === 'auth/invalid-email') {
                Alert.alert('That email address is invalid!');
              }
            } finally {
              console.log("passed")
              setLoading(false)
              setName("")
              setEmail("")
              setPassword("")
            }
      }
    }

    const onGoogleButtonPress = async () => {
      try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();
        
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
      }
        catch (error) {
           console.log(error.message)
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
              placeholder="Name"
              value={name}
              keyboardType="text"
              underlineColorAndroid='transparent'
              onChangeText={(text)=>{setName(text)}}/>
          
        </View>

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
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={saveUser}>
          <View>
      
          <Text style={styles.signUpText}>Sign Up</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.phoneBtnContainer]} onPress={() => navigation.navigate("otpscreen")}>
          <View style={{display:"flex",flexDirection:"row"}}> 
                <Icon name="mobile-phone" size={25} style={styles.icon}/>
                <Text style={styles.phnText}>Continue with phone number</Text>
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight style={[styles.googleBtnContainer]} onPress={onGoogleButtonPress}>
          <View style={{display:"flex",flexDirection:"row"}}>
                <Icon name="google" size={25} style={styles.icon}/>
                <Text style={styles.gogoleText}>Continue with Google </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.signintext]} onPress={() => navigation.navigate("signin")}>
          <Text style={styles.signUpText}>Already Have an Account? Login</Text>
        </TouchableHighlight>

        <AwesomeAlert
                show={showAlertState}
                showProgress={false}
                title="Authentication Error !!"
                message='Email Address Already Exist!'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText='Okay'
                confirmButtonColor='#F43107'
                onConfirmPressed={hideAlert}
            />

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
        // backgroundColor: '#00b5ec',
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
      phnText:{
        color: 'white',
        fontSize:17,
        marginLeft:15
      },
      gogoleText:{
        color: 'white',
        fontSize:17,
        marginLeft:15
      },
      imgbackground:{
          width:width,
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          opacity:1.5
      },
      googleBtnContainer:{
        borderColor:"grey",
        borderWidth:3,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:350,
        borderRadius:30,
      },
      phoneBtnContainer:{
        borderColor:"grey",
        borderWidth:3,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:350,
        borderRadius:30,
      },
      icon:{
        color: "#1ED661"
      }
})