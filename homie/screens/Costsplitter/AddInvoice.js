import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BoyImage from "../../assets/boy.jpg";
import Boy2Image from "../../assets/boy2.jpg";
import GirlImage from "../../assets/girl.jpg";
import furniture from "../../assets/icons/furniture.svg";
import groceries from "../../assets/icons/groceries.svg";
import trips from "../../assets/icons/trips.svg";
import elektricity from "../../assets/icons/elektricity.svg";
import gas from "../../assets/icons/gas.svg";
import water from "../../assets/icons/water.svg";
import maintainance from "../../assets/icons/maintainance.svg";
import others from "../../assets/icons/others.svg";
import SaveAndCancel from "../../compontents/SaveAndCancel"; // Voeg deze importregel toe

const AddInvoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImage } = route.params;
  const [invoiceName, setInvoiceName] = useState(
    selectedImage ? selectedImage.split("/").pop() : ""
  );
  const [invoiceAmount, setInvoiceAmount] = useState("€");
  const [isInvoiceAmountEntered, setIsInvoiceAmountEntered] = useState(false);
  const [isInvoiceNameEntered, setIsInvoiceNameEntered] = useState(false);
  const datePickerRef = useRef(null);
  const [selectedDateText, setSelectedDateText] = useState("Choose Date");
  const [invoiceDate, setInvoiceDate] = useState(null); // null indicates no date selected
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [isUserSelectionVisible, setIsUserSelectionVisible] = useState(false);
  const [isPaidBySelected, setIsPaidBySelected] = useState(false);
  const [paidByInputValue, setPaidByInputValue] = useState("");
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategorySelectionVisible, setIsCategorySelectionVisible] =
    useState(false);

  const fileInfo = {
    invoiceName: invoiceName,
  };

  useEffect(() => {
    if (selectedUserName) {
      setPaidByInputValue(selectedUserName);
    } else {
      setPaidByInputValue("");
    }
  }, [selectedUserName]);

  const handleInvoiceNameChange = (text) => {
    setInvoiceName(text);
    setIsInvoiceNameEntered(text !== "");
  };

  const handleInvoiceAmountChange = (text) => {
    const cleanedText = text.replace(/[€\s,]/g, "");
    const formattedText = cleanedText.replace(/,/, ".");
    const amountWithEuroSign = "€ " + formattedText;
    setInvoiceAmount(amountWithEuroSign);
    setIsInvoiceAmountEntered(cleanedText !== ""); // Check if there is text after the € sign
  };

  const showDatePickerModal = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleDateChange = (date) => {
    setInvoiceDate(date);
    setSelectedDateText(date.toLocaleDateString());
  };

  const CustomDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <DatePicker
          selected={invoiceDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Choose Date"
          className="datepickerWeb"
          style={styles.datePickerContainer}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showDatePickerModal}
        >
          <Text
            style={[
              styles.datePickerButtonText,
              invoiceDate ? { color: "#000" } : null,
            ]}
          >
            {selectedDateText}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const users = [
    { value: "user1", label: "User 1", image: BoyImage },
    { value: "user2", label: "User 2", image: Boy2Image },
    { value: "user3", label: "User 3", image: GirlImage },
    { value: "user4", label: "User 4", image: GirlImage },
  ];

  const categories = [
    { value: "furniture", label: "Furniture", icon: furniture },
    { value: "groceries", label: "Groceries", icon: groceries },
    { value: "trips", label: "Trips", icon: trips },
    { value: "elektricity", label: "Elektricity", icon: elektricity },
    { value: "gas", label: "Gas", icon: gas },
    { value: "water", label: "Water", icon: water },
    { value: "maintainance", label: "Maintainance", icon: maintainance },
    { value: "others", label: "Others", icon: others },
  ];

  const handlePaidByFocus = () => {
    setIsUserSelectionVisible(true);
  };

  const handlePaidByBlur = () => {
    setTimeout(() => {
      setIsUserSelectionVisible(false);
      setIsPaidBySelected(true);
    }, 200);
  };

  const handleCategoryFocus = () => {
    setIsCategorySelectionVisible(true);
  };

  const handleCategoryBlur = () => {
    setTimeout(() => {
      setIsCategorySelectionVisible(false);
    }, 200);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category.value);
    handleCategoryBlur();
  };

  return (
    <ScrollView style={styles.container}>
      <SaveAndCancel navigation={navigation} title="Add an invoice" />

      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            isInvoiceAmountEntered ? { color: "#000" } : { color: "#9B9B9B" },
          ]}
          placeholder="Invoice Name"
          placeholderTextColor={isInvoiceAmountEntered ? "#000" : "#9B9B9B"}
          value={invoiceName}
          onChangeText={handleInvoiceNameChange}
        />

        <View style={styles.rowContainer}>
          <TextInput
            style={[
              styles.input,
              isInvoiceAmountEntered ? { color: "#000" } : { color: "#9B9B9B" },
            ]}
            placeholder="Amount of invoice"
            placeholderTextColor="#9B9B9B"
            onChangeText={handleInvoiceAmountChange}
            value={invoiceAmount}
          />
          <TouchableOpacity onPress={showDatePickerModal}>
            <CustomDatePicker />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, isPaidBySelected ? { color: "#000" } : null]}
          placeholder="Paid by"
          placeholderTextColor="#9B9B9B"
          value={paidByInputValue}
          onFocus={handlePaidByFocus}
          onBlur={handlePaidByBlur}
        />

        {isUserSelectionVisible && (
          <View style={styles.paidBox}>
            <Text
              style={{
                paddingTop: 12,
                textAlign: "left",
                fontFamily: "manrope",
                fontWeight: "light",
              }}
            >
              Paid by...
            </Text>
            <View style={styles.pickerContainer}>
              {users.map((user, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedUser(user.value);
                    setSelectedUserName(user.label);
                    setIsPaidBySelected(true);
                    handlePaidByBlur();
                    setSelectedUserImage(user.image);
                  }}
                >
                  <Image source={user.image} style={styles.userImage} />
                  <Text style={styles.userName}>{user.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            isCategorySelectionVisible ? { color: "#000" } : null,
          ]}
          placeholder="Category"
          placeholderTextColor="#9B9B9B"
          value={selectedCategory}
          onFocus={handleCategoryFocus}
          onBlur={handleCategoryBlur}
        />

        {isCategorySelectionVisible && (
          <View style={styles.categoryBox}>
            <Text
              style={{
                fontFamily: "manrope",
                fontSize: 12,
                fontWeight: "light",
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              Select a category...
            </Text>
            <View style={styles.categoryPicker}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategorySelection(category)}
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image source={category.icon} style={styles.categoryImage} />
                  <Text style={styles.userName}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  input: {
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
    height: 56,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    fontFamily: "manrope",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    zIndex: 0,
  },
  uploadedImage: {
    width: 342,
    height: 332,
    borderRadius: 10,
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerButtonText: {
    color: "#9B9B9B",
    fontSize: 16,
  },
  invoiceAmountInput: {
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },

  categoryPicker: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 100,
  },

  paidBox: {
    alignItems: "center",
    height: 120,
    width: 220,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: -15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
  },
  categoryBox: {
    alignItems: "left",
    height: 320,
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: -15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 998,
    paddingLeft: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginTop: 12,
  },

  categoryImage: {
    width: 25,
    height: 25,
    paddingBottom: 12,
  },
  userName: {
    marginTop: 5,
    fontSize: 12,
    color: "#9B9B9B",
    paddingBottom: 12,
  },
});

export default AddInvoice;
