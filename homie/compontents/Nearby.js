import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import emptylike from '../assets/emptylike.png';
import groep from '../assets/groupfoto.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Nearby extends Component {

  photoData = [];

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      photoData: [],
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

   getHouse = async () => {
    const token = await AsyncStorage.getItem('token');
    const houseId = await AsyncStorage.getItem('houseId');

    const response = await fetch(`http://localhost:3000/api/v1/house/${houseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data)
    if (data.status === 'failed') {
    } else if (data.status === 'succes') {
      const cityHouse =  data.data.city;
      this.getPhotos(cityHouse);
      console.log(cityHouse)
  }
}

  getPhotos = async (cityHouse) => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");
    fetch(`http://localhost:3000/api/v1/photo/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "failed") {
          console.log(data.status);
        } else if (data.status === "success") {
          const photos = data.result;
          for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            if(photo.city !== cityHouse)
            this.photoData.push({
              image: photo.image,
              description: photo.description,
              houseName: photo.houseName,
              city: photo.city,
              dateTaken: photo.dateTaken,
              houseId: photo.houseId,
            });
          }
          this.setState({ photoData: this.photoData });
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };



  renderPosts() {
    return this.photoData.map((post, index) => {
      const currentTime = new Date();
      const timeDiffMinutes = Math.floor((currentTime - Date.parse(post.dateTaken)) / 60000); // Calculate time difference in minutes
      let timeDiff; // Time difference in the appropriate unit (minutes or hours)
  
      if (timeDiffMinutes > 60) {
        const timeDiffHours = Math.floor(timeDiffMinutes / 60); // Calculate time difference in hours
        timeDiff = `${timeDiffHours}h ago`;
      } else if (timeDiffMinutes > 0) {
        timeDiff = `${timeDiffMinutes}m ago`;
      } else {
        const timeDiffSeconds = Math.floor((currentTime - Date.parse(post.dateTaken)) / 1000); // Calculate time difference in seconds
        timeDiff = `${timeDiffSeconds}s ago`;
      }
    
    return (
      <View   style= {{ marginBottom: 30}} key={index} >
        <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Image source={post.image} style={{ width: 58, height: 58, borderRadius:50 }} />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ color: '#160635', fontFamily:'novaticaBold', fontSize: 16 }}>{post.houseName}</Text>
          <Text style={{ fontFamily:'manrope', fontSize: '14px' }}>{post.description}</Text>
          <View style={{ flexDirection:'row'}}>
            <Text style={{ color:'#939393', paddingRight: 5, fontFamily:'manrope', fontSize: 13 }}>{post.city}</Text>
            <Text style={{ color:'#939393', paddingRight:5, fontFamily:'manrope', fontSize: 13 }}>●</Text>
            <Text style={{ color:'#939393', fontFamily:'manrope', fontSize: '13px' }}>{timeDiff}</Text>
          </View>
        </View>
        <View>
          <Image source={emptylike} style={{width: 20, height: 17}}/>
        </View>
    </View>
      <View style={{ justifyContent:'center' }}>
      <Image source={post.image } style={{  minWidth: 330, minHeight: 410, maxWidth: 380, maxHeight: 460, marginBottom: 40 }} />
      </View>
    </View> 
    );
  });
  
}


    render(){
      if (this.state.photoData.length == 0) {
        return (
          <View style={{ alignItems: 'center' }}>
            <Text>No posts</Text>
          </View>
        );
      }
  return (
    <View style= {{ marginLeft: 'auto',marginRight: 'auto'}}> 
        {this.renderPosts()}
  </View>  
  );
};
}
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

