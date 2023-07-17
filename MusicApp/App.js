// https://aboutreact.com/react-native-firebase-cloud-firestore-db
import { StyleSheet, Text, SafeAre, SafeAreaView,View } from 'react-native';
import React,{useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native"
import BottomTabs from './components/BottomTabs';
import SignUp from "./components/Signup"
import SignIn from "./components/signin"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleMusicScreen from './components/SingleMusicScreen';
import auth  from '@react-native-firebase/auth';
import TrackPlayer ,{Capability,Event,RepeatMode,State,usePlaybackState,useProgress,useTrackPlayerEvents} from 'react-native-track-player';

import OTPScreen from './components/OTPScreen';

  const Stack = createNativeStackNavigator();


export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

   useEffect(() => {
    TrackPlayer.setupPlayer();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber)
    return subscriber; // unsubscribe on unmount
   }, [])
   
   if (initializing) return null;
   
   
   if (!user) {
  return (
    
     <NavigationContainer>
      <Stack.Navigator initialRouteName='signin'>
        <Stack.Screen component={SignIn} name="signin" options={{
          headerShown:false
        }}/>
        <Stack.Screen component={SignUp} name="signup" options={{
          headerShown:false
        }}/>
        <Stack.Screen component={OTPScreen} name="otpscreen" options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    
  
           );
      }

      else {
        return (
    
          <NavigationContainer>
           <Stack.Navigator initialRouteName='bottom'>
             <Stack.Screen component={BottomTabs} name="bottom" options={{
               headerShown:false
             }} />
             <Stack.Screen component={SingleMusicScreen} name="single" options={{
               headerShown:false
             }} />
           </Stack.Navigator>
           
         </NavigationContainer>
         
       
                );
      }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#222831',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});