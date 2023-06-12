import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import emptylike from '../assets/emptylike.png';
import filledlike from '../assets/like.png';
import hiddencontent from '../assets/icons/hiddencontent.svg';
import { useNavigation } from '@react-navigation/native';

  /*   <TouchableOpacity onPress={hideAllImages}>
          <Text>Hide Images</Text>
        </TouchableOpacity>*/

//export default class Nearby extends Component {
  const Nearby = () => {
    const navigation = useNavigation();
    const [hideImages, setHideImages]= useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

      const hideAllImages = () => {
        setHideImages(true);
      }; 

      const toggleLike = () => {
        if (liked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
        setLiked(!liked);
      };

  return (   
    <View>
    <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("externhomeaccount")}>
      <Image source={require('../assets/groupfoto.jpg')} style={{ width: 58, height: 58, borderRadius:50 }} />
      </TouchableOpacity>
    </View>
    <View style={{ marginLeft: 15, flex: 1 }}>
    <TouchableOpacity style={{ width:'fit-content' }} onPress={() => navigation.navigate("externhomeaccount")}>
      <Text style={{ color: '#160635', fontFamily:'novaticaBold', fontSize: '16px' }}>Casa Frankie</Text>
    </TouchableOpacity>
      {!hideImages && (
              <>
                <Text style={{ fontFamily: 'manrope', fontSize: 14 }}>Time for dinner!</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#939393', paddingRight: 5, fontFamily: 'manrope', fontSize: 13 }}>Antwerpen</Text>
                  <Text style={{ color: '#939393', paddingRight: 5, fontFamily: 'manrope', fontSize: 13 }}>●</Text>
                  <Text style={{ color: '#939393', fontFamily: 'manrope', fontSize: 13 }}>20 m ago</Text>
                </View>
              </>
            )}
          </View>
          {!hideImages && (
            <View >
          <TouchableOpacity onPress={toggleLike} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={liked ? filledlike : emptylike} style={{ width: 20, height: 17 }} />
            {liked && <Text style={{ marginLeft: 5, fontFamily: 'manrope', fontSize: 13 }}>{likeCount}</Text>}
          </TouchableOpacity>
          </View>
          )}
</View>
  <View style={{ justifyContent:'center', marginBottom: 40 }}>
  {!hideImages && (
  <Image source={require('../assets/groupfoto.jpg')} style={{  width: 340, height: 460, marginBottom: 40 }} />
  )}
  {hideImages && (
    <View style={styles.overlay}>
    <Image source={require('../assets/groupfoto.jpg')} style={{ width: 340, height: 460, marginBottom: 40 }} />
    <View style={styles.overlayContent}>
      <Image source={hiddencontent} style={{ width: 38, height: 32 }} />
      <Text style={styles.overlayTextTitle}>Hidden content</Text>
      <Text style={styles.overlayText}>Take a picture of your Homie moment to see this picture!</Text>
    </View>
  </View>
  )}
  </View>
  </View> 
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'relative',
    width: 340,
    height: 460,
  },
  overlayContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(22, 6, 53, 0.9)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  overlayTextTitle: {
    fontFamily: 'novaticaBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  overlayText: {
    color: '#fff',
    fontFamily: 'manrope',
    fontSize: 14,
    textAlign: 'center',
    padding: 20
  },
} )

export default Nearby;
