import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Modal, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

import * as Font from "expo-font";

import crossIcon from "../../assets/icons/close.svg";
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import editIcon from "../../assets/icons/editField.svg";
import greenArrowIcon from "../../assets/icons/dropdown_green.svg"

import StatisticsComponent from "../../compontents/StatisticsMonthly";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require('../../assets/fonts/Moon.otf'),
    manrope: require('../../assets/fonts/Manrope.ttf'),
    novatica: require('../../assets/fonts/Novatica.ttf'),
    novaticaBold: require('../../assets/fonts/Novatica-Bold.ttf')
  });
};

const generateMonthlyData = () => {
  // Generate random monthly data for the chart
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(Math.floor(Math.random() * 1000) + 500);
  }
  return data;
};

const generateYearlyData = () => {
  // Generate random yearly data for the chart
  const data = [];
  for (let i = 0; i < 4; i++) {
    data.push(Math.floor(Math.random() * 10000) + 5000);
  }
  return data;
};

const handleFilterChange = (selectedFilter) => {
  setFilter(selectedFilter);
};

const handlePeriodFilterChange = (selectedPeriodFilter) => {
  setPeriodFilter(selectedPeriodFilter);
};

const names = ["Yanelle", "Jade", "Boy", "Seppe"];

const filterButtons = [
  "All",
  "Energy",
  "Water",
  "Furniture",
  "Groceries",
  "Trips",
  "Gas",
  "Maintenance",
  "Others",
];

const ViewStatistics = () => {
  const [filter, setFilter] = useState("All");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [periodFilter, setPeriodFilter] = useState("Monthly");
  const [yearlyData, setYearlyData] = useState([]);
  const [selectedName, setSelectedName] = useState("Yanelle");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
    setMonthlyData(generateMonthlyData());
    setYearlyData(generateYearlyData());
  
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleNameSelection = (name) => {
    setSelectedName(name);
    toggleDropdown();
    };

  const renderNameOptions = () => {
    return names.map((name, index) => (
      <TouchableOpacity key={index} style={styles.nameOption} onPress={() => handleNameSelection(name)}>
        <Text style={{ textAlign: 'center' }}>{name}</Text>
      </TouchableOpacity>
    ));
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handlePeriodFilterChange = (selectedPeriod) => {
    setPeriodFilter(selectedPeriod);
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <View style={{ backgroundColor: '#160635' }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
            <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
          </TouchableOpacity>
          <Text style={styles.heading}>Statistics</Text>
        </View>
        <View style={styles.headingTip}>
          <Text style={styles.subtitle}>Today:</Text>
          <Text style={styles.subtext}>Your house is spending more than you usually do</Text>
          <Text style={styles.subtitle2}>Tip:</Text>
          <Text style={styles.subtext}>
            Clean your freezer regularly, as ice formation causes you to consume more energy.
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              filter === button && styles.activeFilterButton
            ]}
            onPress={() => handleFilterChange(button)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === button && styles.activeFilterButtonText
              ]}
            >
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}>
            <StatisticsComponent
              filter={filter}
              handleFilterChange={handleFilterChange}
              periodFilter={periodFilter}
              handlePeriodFilterChange={handlePeriodFilterChange}
              monthlyData={monthlyData}
              yearlyData={yearlyData}
            />
            </View>
            <View>
        </View>
        <View style={styles.generalInfo}>
            <TouchableOpacity onPress={togglePopUp} style={{ zIndex: 2, }}>
              <Image source={editIcon} style={{ width: 20, height: 20, position: 'absolute', right: 2, padding: 2 }} />
            </TouchableOpacity>
          <Text style={styles.subtitle3}>General information</Text>
          <Text style={styles.subtext}>Supplier: Bolt</Text>
          <Text style={styles.subtext}>Payer: Yanelle</Text>
          <Text style={styles.subtext}>Advance: €75,00/month</Text>
        </View>
        <TouchableOpacity
              style={[
                styles.btn,
              ]}
              onPress={() => navigation.navigate("viewinvoices")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                ]}
              >
                View invoices
              </Text>
            </TouchableOpacity>
      </View>
      </View>

      <Modal visible={isPopUpVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
          activeOpacity={1}
        >
          <View style={styles.popupText}>
            <TouchableOpacity style={{ position: "absolute", top: 16, right: 16 }} onPress={togglePopUp}>
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={styles.popupHeading}>General information</Text>
              <View style={styles.generalInfoContainer}>
                <Text style={styles.popupDescription}>Supplier</Text>
                <TextInput placeholder="Bolt" style={styles.popupSubtext}/>
              </View>
              <View style={styles.generalInfoContainer}>
              <Text style={styles.popupDescription}>Payer</Text>
              <View style={styles.dropdownContainer}>
                  <Text style={styles.popupSubtext}>{selectedName}</Text>
                  <TouchableOpacity style={styles.dropdownArrowContainer} onPress={toggleDropdown}>
                    <Image source={greenArrowIcon} style={styles.dropdownArrow} />
                  </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                  <View style={styles.dropdownOptionsContainer}>{renderNameOptions()}</View>
                )}
              </View>
              <View style={[styles.generalInfoContainer, {zIndex: -1}]}>
              <Text style={styles.popupDescription}>Advance</Text>
              <TextInput placeholder="€75,00" style={styles.popupSubtext}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#160635',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    padding: 30,
  },

  generalInfoContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5
  },

  popupText: {
    backgroundColor: "#F2F2F2",
    width: 342,
    height: 320,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40
  },

  popupHeading: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 20,
    color: "#160635",
    textAlign: "left",
    marginBottom: 10

  },

  popupSubtext: {
    fontFamily: "manrope",
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    textAlign: 'center'
  },

  popupDescription: {
    fontFamily: "manrope",
    fontSize: 12,
    color: "black",
    textAlign: 'center',
    padding: 5,
  },

  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  selectedName: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center'
  },
  dropdownArrow: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    position: 'absolute',
    right: '-110px',
    top:'-8px'
  },
  dropdownOptionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  nameOption: {
    paddingVertical: 5,
  },
  nameOptionText: {
    fontSize: 14,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F57ED4",
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: "#F57ED4",
    borderColor: "#F57ED4",
  },
  filterButtonText: {
    color: "#F57ED4",
    fontSize: 14,
    fontFamily: 'moon', 
    fontWeight: 'bold'
  },
  activeFilterButtonText: {
    color: "white",
    fontFamily: 'moon', 
    fontSize: '14px', 
    fontWeight: 'bold'
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B900F4",
    marginRight: 10,
  },

  heading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 50,
    fontFamily: 'novaticaBold',
  },
  headingTip: {
    backgroundColor: "#fff", 
    borderRadius: 30,
    padding: 15,
    marginTop: 25, 
    marginBottom: 35,
    marginHorizontal: 20
  },
  generalInfo: {
    backgroundColor: "#fff", 
    borderRadius: 30,
    padding: 15,
    marginBottom: 5
  },
  subtitle: {
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "#B900F4",
    fontSize: 14,
    paddingTop: 5
  },
  subtitle2: {
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
    paddingTop: 10
  },
  subtitle3: {
    fontFamily: "novaticaBold",
    fontWeight: "bold",
    color: "#160635",
    fontSize: 15,
    padding: 2
  },
  subtext: {
    fontFamily:'manrope',
    fontSize: 14,
  },
  chartTitle: {
    fontFamily: 'moon',
    fontSize:'14px',
    fontWeight: 'bold'
  },
  chart: {
    marginTop: '35px',
    marginBottom: '15px'
  },

  periodFilterPicker: {
    width: 85,
    height: 40,
    color: "#000",
    borderWidth: 0, // Remove the border
    borderColor: 'transparent',
    backgroundColor: '#F2F2F2',
    fontFamily: 'manrope'
  },
  pickerItem: {
    fontSize:'10px'
  }
});

export default ViewStatistics;
