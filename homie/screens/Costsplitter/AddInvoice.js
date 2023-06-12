import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddInvoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImage } = route.params;
  const [invoiceName, setInvoiceName] = useState(
    selectedImage ? selectedImage.split("/").pop() : ""
  );
  const [invoiceAmount, setInvoiceAmount] = useState("€");
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [isInvoiceDateEntered, setIsInvoiceDateEntered] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isInvoiceAmountEntered, setIsInvoiceAmountEntered] = useState(false);
  const datePickerRef = useRef();
  const [startDate, setStartDate] = useState(new Date());

  const handleInvoiceDateChange = (date) => {
    setShowDatePicker(false);
    if (date) {
      const selectedDate = new Date(date); // Convert the date string to a Date object
      setInvoiceDate(selectedDate);
      setIsInvoiceDateEntered(true);
    }
  };

  const handleInvoiceNameChange = (text) => {
    setInvoiceName(text);
  };

  const handleInvoiceAmountChange = (text) => {
    const cleanedText = text.replace(/[€\s,]/g, "");
    const formattedText = cleanedText.replace(/,/, ".");
    const amountWithEuroSign = "€" + formattedText;
    setInvoiceAmount(amountWithEuroSign);
    setIsInvoiceAmountEntered(true);
  };

  const showDatePickerModal = () => {
    datePickerRef.current.setOpen(true);
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Annuleer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewInvoices")}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Add an invoice</Text>
        <View style={styles.emptyIcon} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, invoiceName !== "" && { color: "#000" }]}
          placeholder="Invoice Name"
          placeholderTextColor="#9B9B9B"
          value={invoiceName}
          onChangeText={handleInvoiceNameChange}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            style={[
              styles.input,
              styles.invoiceAmountInput,
              isInvoiceAmountEntered && { color: "#000" },
            ]}
            placeholder="Amount of invoice"
            placeholderTextColor="#9B9B9B"
            onChangeText={handleInvoiceAmountChange}
            value={invoiceAmount}
          />
          <TouchableOpacity onPress={showDatePickerModal}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose Date"
              className="datepickerWeb"
              style={styles.datePickerContainer}
            />
          </TouchableOpacity>
        </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "moon",
    fontSize: 14,
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
  input: {
    color: "#9B9B9B",
    marginBottom: 20,
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 5,
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
  datePickerText: {
    color: "#9B9B9B",
    flex: 1,
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  invoiceAmountInput: {
    flex: 0.3, // Adjust the value as needed to control the width ratio between the inputs
    marginRight: 20, // Add margin to separate the inputs
  },
});

export default AddInvoice;
