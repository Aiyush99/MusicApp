import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, Animated,Slider } from 'react-native'
import React,{useEffect,useRef,useState} from 'react'
import {useRoute} from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons';

import TrackPlayer ,{Capability,Event,RepeatMode,State,usePlaybackState,useProgress,useTrackPlayerEvents} from 'react-native-track-player';

const { width, height } = Dimensions.get('window')

import {setPlayer} from "./MusicScreen"
  

export default function SingleMusicScreen() {

    const route = useRoute();
    let data  = {};

    data = route.params;

const playbackstate = usePlaybackState();
const progress = useProgress();

      const playpause = async(playbackstate) => {
   
        const currentTrack = await TrackPlayer.getCurrentTrack();
    
    
        if(currentTrack != null ) {
         
         
            if (playbackstate === State.Playing) {
                await TrackPlayer.pause();
            }
            else {
              console.log(playbackstate)
              console.log("pause")
                await TrackPlayer.play();
            }
        }
    }
  

    useEffect(() => {
       console.log("0000000000000000000",data)
        setPlayer([data]); 
      }, [])

   
  return (
    <View style={styles.container}>
 
   
    <View style={{
            width: width,
    
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={styles.thumbnail_container}>
              <Image source={{uri:route.params.image}} style={styles.thumbnail} />
              {/* <Text>{TrackTitle}</Text> */}
            </View>
          </View>
    <View>
      <Text style={styles.title}>{route.params.title}</Text>
      <Text style={styles.artistName}>{route.params.artist}</Text>
    </View>

    <View style={{ marginBottom: 70 }}>
      <Slider
        style={styles.progress}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#1fd660"
        minimumTrackTintColor="#1fd660"
        maximumTrackTintColor="FFF"
        onSlidingComplete={async(value) => { 
          await TrackPlayer.seekTo(value);
        }}
      />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {new Date(progress.position * 1000).toLocaleTimeString().substring(3)}
        </Text>
        <Text style={styles.progressText}>
        {new Date((progress.duration) * 1000).toLocaleTimeString().substring(3)}
        </Text>
      </View>
    </View>

    <View style={styles.controlContainer}>
      <TouchableOpacity>
        <Ionicons name="play-skip-back" size={35} color="#1fd660" />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>playpause(playbackstate)}>
        <Ionicons name={playbackstate == State.Playing ? "pause-circle":"play-circle"} size={40} color="#1fd660" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="play-skip-forward" size={35} color="#1fd660" />
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({

    container: {
      backgroundColor: '#222831',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      thumbnail_container: {
        width: 300,
        height: 340,
        marginBottom: 5,
        shadowColor: "#ccc",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84
      },
      thumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 15
      },
      title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#eeeeee'
      },
      artistName: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: '#eeeeee'
      },
      progress: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
      },
      progressTextContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: "space-between"
      },
      progressText: {
        color: "#fff"
      },
      controlContainer: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
        marginBottom: 15
      }
})