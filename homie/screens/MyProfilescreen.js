import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Header, Button, CheckBox } from 'react-native-elements'
import arrowLeft from '../assets/icons/arrowLeft.svg'
import editIcon from '../assets/icons/edit.svg'
import emailIcon from '../assets/icons/email.svg'
import phoneIcon from '../assets/icons/phone.svg'
import passwordIcon from '../assets/icons/password.svg'
import editFieldIcon from '../assets/icons/editField.svg'
import statusAvailable from '../assets/icons/statusAvailable.svg'
import statusBusy from '../assets/icons/statusBusy.svg'
import statusNotdisturb from '../assets/icons/statusNotdisturb.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import dropdownIconUp from '../assets/icons/dropdownUp.png'
import crossIcon from "../assets/icons/close.svg"
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon'
import checkboxEmpty from "../assets/icons/greenCheckbox_empt.svg"
import checkboxChecked from "../assets/icons/greenCheckbox.svg"


import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require('../assets/fonts/Moon.otf'),
    manrope: require('../assets/fonts/Manrope.ttf'),
    novatica: require('../assets/fonts/Novatica.ttf'),
    novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
  });
};

export default function Myprofilescreen({navigation}) {

  const [isEmailAddressVisible, setIsEmailAddressVisible] = useState(false);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);

  const toggleEmail = () => {
    setIsEmailAddressVisible(!isEmailAddressVisible);
  };

  const togglePhone = () => {
    setIsPhoneNumberVisible(!isPhoneNumberVisible);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Available');

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckmarkClick = () => {
    setIsChecked(!isChecked); // Toggle the checked status
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View>

<View style={styles.topHeader}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center' }}>
    <View style={{ position: 'relative' }}>
      <Image
        source={require('../assets/profielfoto.svg')}
        style={{ width: 88, height: 88, borderRadius: 50 }}
      />
      <TouchableOpacity
        style={{ position: 'absolute', top: 0, right: 0 }}
        onPress={() => console.log('Edit profile clicked')}
      >
        <Image source={editIcon} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <View>
      <Text style={{ color: '#fff', fontFamily: 'novaticaBold', fontSize: '16px', textAlign: 'center' }}>Jade Apers</Text>
      </View>
      </View>
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 120, right: 95 }}>
      {selectedStatus === 'Available' && <Image source={statusAvailable} style={{ width: 11, height: 11, marginRight: 5 }} />}
      {selectedStatus === 'Busy' && <Image source={statusBusy} style={{ width: 11, height: 11, marginRight: 5 }} />}
      {selectedStatus === 'Do Not Disturb' && <Image source={statusNotdisturb} style={{ width: 11, height: 11, marginRight: 5 }} />}
        
      {isDropdownVisible ? (
              <Image source={dropdownIconUp} style={{ width: 15, height: 8 }} />
            ) : (
              <Image source={dropdownIcon} style={{ width: 15, height: 8 }} />
            )}
      </TouchableOpacity>
  </View>
  </View>

  {isDropdownVisible && (
  <View style={styles.dropdownMenu}>
    <TouchableOpacity onPress={() => setSelectedStatus('Available')} style={styles.dropdownItem}>
      <Image source={statusAvailable} style={{ width: 11, height: 11, marginRight: 5 }} />
      <Text style={styles.dropdownText}>Available</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setSelectedStatus('Busy')} style={styles.dropdownItem}>
      <Image source={statusBusy} style={{ width: 11, height: 11, marginRight: 5 }} />
      <Text style={styles.dropdownText}>Busy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setSelectedStatus('Do Not Disturb')} style={styles.dropdownItem}>
      <Image source={statusNotdisturb} style={{ width: 11, height: 11, marginRight: 5 }} />
      <Text style={styles.dropdownText}>Do not disturb</Text>
    </TouchableOpacity>
  </View>
)}
    
  <View style={{ backgroundColor: '#F2F2F2'}}>
    <View style={styles.profileItemFirst}>
      <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
        <View style={styles.profileItemTitle}>
          <Image source={emailIcon} style={{width: 20, height: 16, marginHorizontal: 10, marginTop: 13, marginBottom: 10}}/>
          <Text style={styles.titleText}>Email address</Text>
        </View>
        <TouchableOpacity onPress={toggleEmail}>
        <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
        </TouchableOpacity>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>jadeapers@hotmail.com</Text>
    </View>
    <View style={styles.profileItem}>
    <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
      <View style={styles.profileItemTitle}>
      <Image source={phoneIcon} style={{width: 21, height: 21, margin: 10}}/>
      <Text style={styles.titleText}>Phonenumber</Text>
      </View>
      <TouchableOpacity onPress={togglePhone}>
        <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
      </TouchableOpacity>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>+32 412 34 76 06</Text>
    </View>
    <View style={styles.profileItem}>
    <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
      <View style={styles.profileItemTitle}>
      <Image source={passwordIcon} style={{width: 18, height: 20, margin: 10}}/>
      <Text style={styles.titleText}>Password</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("changepassword")}>
      <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
      </TouchableOpacity>
      </View>
    </View>
  </View>



  <Modal visible={isEmailAddressVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
         // onPress={toggleEmail}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 342,
              height: 238,
              borderRadius: 10,
              textAlign: "center",
              padding: 21,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
              onPress={toggleEmail}
            >
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={styles.popupText}>
              <Text style={styles.titleText} >
                Change email address
              </Text>
              <TextInput
                style={{fontFamily: 'manrope', marginBottom: '37px', fontSize: '16px', color:'#A5A5A5'}}
                placeholder="jadeapers@hotmail.com"
                onTouchStart={(event) => event.stopPropagation()} // Prevent event propagation for input field touch
              />
              <TouchableOpacity onPress={handleCheckmarkClick}>
              <View style={styles.modalCheckboxContainer}>
                <Image
                  source={isChecked ? checkboxChecked : checkboxEmpty}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.modalCheckboxText}>Make visible for public</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => console.log('save new email address')}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={isPhoneNumberVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
         // onPress={togglePhone}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 342,
              height: 238,
              borderRadius: 10,
              textAlign: "center",
              padding: 21,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
              onPress={togglePhone}
            >
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={styles.popupText}>
              <Text style={styles.titleText} >
                Change phone number
              </Text>
              <TextInput
                style={{fontFamily: 'manrope', marginBottom: '37px', fontSize: '16px', color:'#A5A5A5'}}
                placeholder="+32 412 34 76 06"
                onTouchStart={(event) => event.stopPropagation()} // Prevent event propagation for input field touch
              />
              <TouchableOpacity onPress={handleCheckmarkClick}>
              <View style={styles.modalCheckboxContainer}>
                <Image
                  source={isChecked ? checkboxChecked : checkboxEmpty}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.modalCheckboxText}>Make visible for public</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => console.log('save changed phone number')}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

  </View>
  
  )
}



const styles = StyleSheet.create({

  topHeader:{
    backgroundColor: '#160635',
    height: '225px', 
    padding: '25px'
  },

  profileItemFirst: {
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 15,
    marginHorizontal: '25px',
    marginTop: '25px',
    marginBottom: '5px'
  },

  profileItem: {
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 15,
    marginHorizontal: '25px',
    marginVertical: '5px'
  },

  profileItemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'flex-start',
    padding: 10
  },

  dropdownMenu: {
    position: 'absolute',
    top: 182,
    right: 0,
    width: 158,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1, 
    marginRight: 7
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontFamily: 'manrope',
    fontSize: 16,
    marginLeft: 5,
  },

  titleText: {
    fontFamily: 'moon', 
    fontWeight: 'bold', 
    fontSize: '16px', 
    color: '#160635', 
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'left'
  },

  button: {
    textAlign: 'center',
    backgroundColor: '#B900F4',
    borderRadius: 100,
    width: 319,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: 'moon',
    fontWeight: 'bold'
  },
  modalCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

  modalCheckboxText: {
    fontFamily: 'manrope', 
    fontSize: '16px', 
    marginLeft: 2
  }
})
