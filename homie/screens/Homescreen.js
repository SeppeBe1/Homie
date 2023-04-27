import { StyleSheet, Text, View, Switch, Picker } from 'react-native';
import React, {useState} from 'react';

export default function Homescreen() {

  const [notifications, setNotifications] = useState(false);
  const notificationsVal = () => setIsEnabled(previousState => !previousState);

  const [nightmode, setnightmode] = useState(false);
  const nightmodeVal = () => setnightmode(previousState => !previousState);

  const [autooPlay, setAutoPlay] = useState(false);
  const autoPlay = () => setAutoPlay(previousState => !previousState);

  const [selectedValue, setSelectedValue] = useState("English");

  return (
    <View>
    <Text >Profile Settings</Text>
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
  </View>
  )
}

const styles = StyleSheet.create({
  switchContainter: {
    display: 'flex',
    flexDirection: 'row',
  },
})
