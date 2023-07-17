import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import auth  from '@react-native-firebase/auth'

export default function Settings() {
  
    const [uid,setUid] = useState()
    const [displayName,setDisplayName] = useState()

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
          setDisplayName(currentUser.displayName);
          setUid(currentUser.uid);
        }
      }, []);
    

    const SignOut = async() => {
        await auth().signOut()
        .then(()=> Alert("User Signed Out Successfully "))
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={SignOut}>
        <Text>Hello User: {displayName}</Text>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})