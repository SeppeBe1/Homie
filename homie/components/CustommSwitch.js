// import React, { useState } from 'react';
// import { Switch, View, StyleSheet, Text } from 'react-native';

// const CustommSwitch = ({ label, value, onValueChange }) => {
//   const [isEnabled, setIsEnabled] = useState(value);
//   const green = '#3BEDBF'
//   const offwhite = '#FAFAFA'
//   const purlple = '#B900F4'

//   const toggleSwitch = () => {
//     const newValue = !isEnabled;
//     setIsEnabled(newValue);
//     onValueChange(newValue);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Test</Text>
//       <Switch
//        trackColor={{ false: offwhite, true: green }}
//        thumbColor={isEnabled ? green : offwhite}
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
  

// });

// export default CustommSwitch;
