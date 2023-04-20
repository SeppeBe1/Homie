import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Avatar } from 'react-native-elements';


export default function Homescreen({navigation}) {
  return (
    <View>
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={<Avatar
          size="medium"
          rounded
          source={{
            uri:
              'https://i.redd.it/lmwqtxhw9st41.jpg',
          }}
        />}
        centerComponent={{ text: 'My App', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ icon: 'cog', type: 'font-awesome', color: '#fff' }}
      />
      <View>
        <Text>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#160635',
    height: 215,
  },
});
