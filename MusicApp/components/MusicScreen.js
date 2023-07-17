import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, Animated,Slider } from 'react-native'
import React,{useEffect,useRef,useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from "@react-native-firebase/firestore"
import TrackPlayer ,{Capability,Event,State,usePlaybackState,useProgress,useTrackPlayerEvents} from 'react-native-track-player';

const { width } = Dimensions.get('window')


export const setPlayer = async(argTracks) => {
  console.log("1111111111111111111111111")
  try{
    if (!Array.isArray(argTracks)) {
      throw new Error('argTracks must be an array.');
    }
     console.log("track player " , argTracks)
    //  await TrackPlayer.setupPlayer();

     await TrackPlayer.updateOptions({
      capabilities:[
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
     })

     const tracks = argTracks.map((song) => ({
      id: song.id.toString(),
      url: song.url, // Replace with the appropriate URL property from your song object
      title: song.title,
      artist: song.artist,
      image: song.image,
    }));
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
   
  }
  catch(e) {
    console.log(e)
  }
}

export default function MusicScreen() {

    const playbackstate = usePlaybackState();
    const progress = useProgress();

    
    const [TrackTitle,setTrackTitle] = useState();
    const [TrackArtist,setTrackArtist] = useState();
    const [TrackImage,setTrackImage] = useState();
    

    const [songIndex, setSongIndex] = useState(0);

    const songSlider = useRef(null)
    const scrollX = useRef(new Animated.Value(0)).current;
    // const song = firestore().collection('songs');

    const [songList, setSongList] = useState([]);
   

    const fetchData = async () => {
      const querySnapshot = await firestore().collection("songs").get();
      const songs = [];

      querySnapshot.forEach((documentSnapshot) => {
        const songData = documentSnapshot.data();
        songs.push(songData);
      });
      //  console.log("songs list " , songs)s
      setSongList(songs);
    };

   
    
    useEffect(() => {
      fetchData();
    
    }, [])
    

    useEffect(() => {
      
      if (songList.length > 0) {
        setPlayer(songList);
      }
      scrollX.addListener(({ value }) => {
        const index = Math.round(value / width);
        skipTo(index)
        setSongIndex(index)
      })
      return () => {
        scrollX.removeAllListeners();
      }
    }, [songList])

    
      const playpause = async(playbackstate) => {
       
          const currentTrack = await TrackPlayer.getCurrentTrack();
          console.log("current track is " , currentTrack)
      
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
      useTrackPlayerEvents([Event.PlaybackTrackChanged],async event => {
        if (event.type == Event.PlaybackTrackChanged && event.nextTrack != null) {
          const track = await TrackPlayer.getTrack(event.nextTrack)
          const {title,artist} = track;
          const image = {uri:track[songIndex]}
          setTrackTitle(title);
          setTrackArtist(artist);
          setTrackImage(image);
        }
      })
  
      const skipTo = async (trackID) => {
        await TrackPlayer.skip(trackID)
      }
  

      const NextSong = () => {
        songSlider.current.scrollToOffset({
          offset:(songIndex+1)*width
        })
      }

      const PrevSong = () => {
        songSlider.current.scrollToOffset({
          offset:(songIndex-1)*width
        })
      }

    const renderMusic = ({ index, item }) => {
    
        return (
          <Animated.View style={{
            width: width,
    
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            
            <View style={styles.thumbnail_container}>
              <Image source={{uri:"https://dl.dropboxusercontent.com/s/7wx4zv7qkz40urw/icon.png?dl=0"}} style={styles.thumbnail} />
            </View>
          </Animated.View>
        )
      }
  return (
    <View style={styles.container}>

    <View style={{ width: width }}>
      <Animated.FlatList
      ref={songSlider}
        data={songList}
        renderItem={renderMusic}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: { x: scrollX }
            }
          }],
          { useNativeDriver: true }
        )}
      />

    </View>

    <View>
      <Text style={styles.title}>{TrackTitle}</Text>
      <Text style={styles.artist}>{TrackArtist}</Text>
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
      <TouchableOpacity onPress={PrevSong}>
        <Ionicons name="play-skip-back" size={35} color="#1fd660" />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>playpause(playbackstate)}>
        <Ionicons name={playbackstate == State.Playing ? "pause-circle":"play-circle"} size={40} color="#1fd660" />
      </TouchableOpacity>

      <TouchableOpacity onPress={NextSong}>
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
      artist: {
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