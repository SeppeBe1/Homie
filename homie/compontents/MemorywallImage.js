import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';


const MemorywallImage = () => {
    return (
        <Modal isVisible={isVisible}>
          <View style={styles.popupContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.popupContent}>
              <Text>Popup Content</Text>
            </View>
          </View>
        </Modal>
      );
};

export default MemorywallImage;
