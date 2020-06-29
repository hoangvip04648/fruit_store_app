import React, { useRef,useState,useEffect } from 'react'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet,TouchableOpacity,Text } from 'react-native';;
const { width: screenWidth } = Dimensions.get('window')
import {rootUrl} from '../../config'
export const Slider = (props) => {
    const [entries,setEntries] = useState([]);
    useEffect(()=>{
        setEntries(props.images)
    })
    const carouselRef = useRef(null)

    const goForward = () => {
        carouselRef.current.snapToNext()
    }

    const _renderItem = ({item, index}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{uri:`${rootUrl}/product-image/${item}`}||{uri:item}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
               
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goForward}>
               
            </TouchableOpacity>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth}
                data={entries}
                renderItem={_renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:5,
        flex: 1,
        shadowOffset:{width:1,height:1},
        elevation:1
    },
    item: {
    alignSelf:'center',
      width: screenWidth-10,
      height: screenWidth-60,
     
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
     
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain',
    },
    title:{
        textAlign:'center',
        transform:[{translateY:-40}],
        color:'white',
        fontWeight:"700",
        fontSize:18,
        textShadowColor:'black',
        textShadowOffset:{width:1,height:-1},
        textShadowRadius:10
    }
  })