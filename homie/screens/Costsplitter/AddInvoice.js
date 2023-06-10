import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import arrowLeft from "../../assets/icons/arrowLeft.svg";

const AddInvoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImage } = route.params;
  const [invoiceName, setInvoiceName] = useState(
    selectedImage ? selectedImage.split("/").pop() : ""
  );
  const [invoiceAmount, setInvoiceAmount] = useState("");

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "white", fontFamily: "moon", fontSize: 14 }}>
              Annuleer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewInvoices")}>
            <Text style={{ color: "white", fontFamily: "moon", fontSize: 14 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Add an invoice</Text>
        <View style={styles.emptyIcon} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Invoice Name"
          placeholderTextColor="#9B9B9B"
          value={invoiceName}
          onChangeText={setInvoiceName}
        />
        <TextInput
          style={styles.input}
          placeholder="Invoice Amount"
          placeholderTextColor="#9B9B9B"
          onChangeText={setInvoiceAmount}
        />
      </View>

      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  arrowLeftIcon: {
    width: 8,
    height: 15,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "novaticaBold",
    fontSize: 20,
    paddingBottom: 40,
  },

  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  emptyIcon: {
    width: 8,
    height: 15,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  cancelButton: {
    backgroundColor: "#B900F4",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  cancelButtonText: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#B900F4",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  saveButtonText: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#ffffff",
  },
});

export default AddInvoice;
