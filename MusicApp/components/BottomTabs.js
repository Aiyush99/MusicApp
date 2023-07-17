import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicScreen  from './MusicScreen'
import Settings from './Settings';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{backgroundColor:'#222831'},
        tabBarActiveTintColor:"#1fd660",
        elevation:4
       }}>
        <Tab.Screen  component={MusicScreen} name="music" options={{
          tabBarIcon:({color,size})=>(
            <Ionicons name="home" color={color} size={size}/>
          )
        }}/>
        <Tab.Screen  component={Search} name="search" options={{
           tabBarIcon:({color,size})=>(
            <Ionicons name="search" color={color} size={size}/>
          )
        }}/>

        <Tab.Screen  component={Settings} name="settings" options={{
           tabBarIcon:({color,size})=>(
            <Ionicons name="settings" color={color} size={size}/>
          )
        }}/>

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})