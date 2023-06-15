import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const UploadedFiles = ({ category }) => {
  const files = [
    { name: "Bestand 1", path: "path/to/file1" },
    { name: "Bestand 2", path: "path/to/file2" },
    { name: "Bestand 3", path: "path/to/file3" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.fileItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        style={{ paddingTop: 30 }}
        data={files}
        keyExtractor={(item) => item.path}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    fontFamily: "manrope",
    fontSize: 16,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 7,
    marginHorizontal: 24,
  },
});

export default UploadedFiles;
