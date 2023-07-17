import { FlatList, StyleSheet, Text, TextInput, View,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore"
export default function Search({navigation}) {

  const [search,setSearch] = useState();
 

  const [filteredData,setFilteredData] = useState([])
  const [songList, setSongList] = useState([]);

  const fetchSongs = async () => {
    const querySnapshot = await firestore().collection("songs").get();
    const songs = [];

    querySnapshot.forEach((documentSnapshot) => {
      const songData = documentSnapshot.data();
      songs.push(songData);
    });
    //  console.log("songs list " , songs)s
    setSongList(songs);
  };

  const searchSong = (searchText) => {
    fetchSongs();
    if(searchText) {
      const filter = songList.filter(obj=>{
        return obj.title.toLowerCase().includes(searchText); 
      
      })
      console.log(filter)
      setFilteredData(filter)
    }
    }

 const PlayMusic = (data) => {
  
    navigation.navigate("single",{
      id:data.id,
      title:data.title,
      artist:data.artist,
      image:data.image,
      url:data.url
     })
 }

  ItemSeperator = () => {
    return <View style={styles.seperator}></View>
  }

  const songsList = ({item}) => (
    <View style={styles.item}>
      <View style={styles.container}>
        <Image source={item.image} style={styles.avatar}/>
      </View>
      <TouchableOpacity onPress={()=>PlayMusic(item)}>
      <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <View>
     
     <TextInput placeholder='SearchHere' onChangeText={(text)=>{searchSong(text)}} placeholderTextColor="#405573" autofocus={false} style={{width:"70%",color:"#405573",fontSize:15,padding:10,marginLeft:38,marginTop:35,borderBottomWidth:1,borderBottomColor:"#405573"}}/>

     {/* {search.map(obj=>{
      return (
        <View>
          <Text>title {obj.title}</Text>
        </View>
      )
     })} */}
     <FlatList
     data={filteredData}
     ItemSeparatorComponent={ItemSeperator}
     keyExtractor={(item) => item.id}
     renderItem={songsList}
     showsVerticalScrollIndicator={false}
     />
    </View>
  )
}

const styles = StyleSheet.create({

  seperator:{
    height:1,
    width:"100%",
    backgroundColor:"#ccc "
  },
  item:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:13,
    marginTop:20
  },
  container:{
    backgroundColor:"#D9D9D9",
    borderRadius:100,
    height:39,
    width:39,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:30,
   
  },
  avatar:{
    height:95,
    width:95,
    borderRadius:50,
    resizeMode:"cover",
    marginLeft:20
  },
  text:{
    fontWeight:'600',
    fontSize:16,
    marginLeft:13
  }
})