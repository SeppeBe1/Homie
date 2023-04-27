import { StyleSheet, Text, View, Switch, Picker, TouchableOpacity, Image } from 'react-native';
import React, {useState} from 'react';

export default function Homescreen() {

  const [notifications, setNotifications] = useState(false);
  const notificationsVal = () => setNotifications(previousState => !previousState);

  const [nightmode, setnightmode] = useState(false);
  const nightmodeVal = () => setnightmode(previousState => !previousState);

  const [autooPlay, setAutoPlay] = useState(false);
  const autoPlay = () => setAutoPlay(previousState => !previousState);

  const [selectedValue, setSelectedValue] = useState("English");

  return (
    <View style={styles.body}>
       <View style={styles.h2Container}>
        <Image source={require('../assets/icons/phone.png')} style={styles.arrowRight}/>
        <Text style={styles.h2} >App preferences</Text>
      </View>

      <View style={styles.hr}/>
      <View style={styles.switchContainter}>
        <Text>Notifications</Text>
        <Switch onValueChange={notificationsVal} value={notifications} />
      </View>
      <View style={styles.switchContainter}>
        <Text>Nightmode</Text>
        <Switch onValueChange={nightmodeVal} value={nightmode}/>
      </View>
      <View style={styles.switchContainter}>
        <Text>Language</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 20, width: 60, alignItems: "center" ,fontSize: 12, paddingLeft: 'auto', paddingRight: 'auto',}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="ENG" value="English" />
          <Picker.Item label="NL" value="Nederlands" />
        </Picker>
      </View>

      <View style={styles.h2Container}>
        <Image source={require('../assets/icons/question.png')} style={styles.arrowRight}/>
        <Text style={styles.h2} >HELP</Text>
      </View>

      <View style={styles.hr}/>
      <View style={styles.arrowText}>
        <Text>FAQ</Text>
        <TouchableOpacity>
          <Image source={require('../assets/icons/arrowRight.png')} style={styles.arrowRight}/>
        </TouchableOpacity>
      </View>
      <View style={styles.arrowText}>
        <Text>Support</Text>
        <TouchableOpacity>
          <Image source={require('../assets/icons/arrowRight.png')} style={styles.arrowRight} />
        </TouchableOpacity>
      </View>

      <View style={styles.h2Container}>
        <Image source={require('../assets/icons/paper.png')} style={styles.arrowRight}/>
        <Text style={styles.h2} >LEGISILATION</Text>
      </View>

      <View style={styles.hr}/>
      <View style={styles.arrowText}>
        <Text>Privacy policy</Text>
        <TouchableOpacity>
          <Image source={require('../assets/icons/arrowRight.png')} style={styles.arrowRight} />
        </TouchableOpacity>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({

  body: {
    marginLeft:29,
    marginRight:29,
  },

  Text:{
    fontSize: 19,
  },

  h2: {
    fontSize:23,
    fontWeight: 'bold',
  },

  h2Container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  switchContainter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  arrowText: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  arrowRight: {
    height: 10,
    width: 10,
  },

  hr:{
    height: 2,
    backgroundColor: '#E5CDF3',
  }
})
