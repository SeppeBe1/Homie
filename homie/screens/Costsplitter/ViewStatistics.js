import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

import * as Font from "expo-font";

import crossIcon from "../../assets/icons/close.svg";
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import editIcon from "../../assets/icons/editField.svg";
import { TextInput } from "react-native-gesture-handler";

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

const ViewStatistics = () => {
  const [filter, setFilter] = useState("All");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [periodFilter, setPeriodFilter] = useState("Monthly");
  const [yearlyData, setYearlyData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
    setMonthlyData(generateMonthlyData());
    setYearlyData(generateYearlyData());
  
  }, []);

  
const chartConfigMonth = {
  backgroundColor: '#f5f5f5',
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  decimalPlaces: 2,
  barPercentage: 0.5,
  barRadius: 10,
  color: (opacity = 1) => `rgba(22, 6, 53, ${opacity})`,
  propsForBackgroundLines: {
    fill: 'rgba(22, 6, 53, 1)', // Set the background color for bars here
  },
  propsForLabels: {
    fontFamily: 'novaticaBold'
  },
};

const chartConfigYear = {
  backgroundColor: '#f5f5f5',
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  decimalPlaces: 2,
  barPercentage: 1.5,
  barRadius: 30,
  color: (opacity = 1) => `rgba(22, 6, 53, ${opacity})`,
  propsForBackgroundLines: {
    fill: 'rgba(22, 6, 53, 1)', // Set the background color for bars here
  },
  propsForLabels: {
    fontFamily: 'novaticaBold'
  },
  xAxisLabelCount: 0, // Set the number of visible horizontal labels to 0
  contentInset: { left: -20, right: -20 },
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

  const renderStatistics = () => {
    // Logic to render statistics based on the selected filter
    if (filter === "Energy") {
      return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Energy and electricity costs</Text>
        <Picker
          style={styles.periodFilterPicker}
          selectedValue={periodFilter}
          onValueChange={(itemValue) => handlePeriodFilterChange(itemValue)}
        >
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Yearly" value="Yearly" />
        </Picker>
        </View>
        {periodFilter === "Monthly" ? (
          <BarChart 
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  data: monthlyData,
                },
              ],
            }}
            width={365}
            height={280}
            yAxisLabel="€"
            chartConfig={chartConfigMonth}
            showBarTops= {false}
            fromZero= {true}
            showValuesOnTopOfBars= {false}
            style={styles.chart}

          />
          ) : (
            <BarChart
          data={{
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
              {
                data: yearlyData,
              },
            ],
          }}
          width={365}
          height={280}
          yAxisLabel="€"
          chartConfig={chartConfigYear}
          style={styles.chart}
          fromZero= {true}
          showBarTops= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
          );
          } else if (filter === "Water") {
            return (
              <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
            <Text style={styles.chartTitle}>Water costs</Text>
            <Picker
              style={styles.periodFilterPicker}
              selectedValue={periodFilter}
              onValueChange={(itemValue) => handlePeriodFilterChange(itemValue)}
            >
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
            </View>
              {periodFilter === "Monthly" ? (
                  <BarChart 
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: monthlyData,
                      },
                    ],
                  }}
                  width={365}
                  height={280}
                  yAxisLabel="€"
                  chartConfig={chartConfigMonth}
                  showBarTops= {false}
                  showValuesOnTopOfBars= {false}
                  fromZero= {true}
                  style={styles.chart}
                />
                ) : (
                  <BarChart
                data={{
                  labels: ['2020', '2021', '2022', '2023'],
                  datasets: [
                    {
                      data: yearlyData,
                    },
                  ],
                }}
                width={365}
                height={280}
                yAxisLabel="€"
                fromZero= {true}
                chartConfig={chartConfigYear}
                style={styles.chart}
                showBarTops= {false}
                showValuesOnTopOfBars= {false}
                withHorizontalLabels= {true}
              />
                )}
              </View>
            );
          } else {
            return (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                <Text style={styles.chartTitle}>All costs</Text>
                <Picker
                  style={styles.periodFilterPicker}
                  selectedValue={periodFilter}
                  onValueChange={(itemValue) => handlePeriodFilterChange(itemValue)}
                >
                  <Picker.Item label="Monthly" value="Monthly" style={styles.pickerItem} />
                  <Picker.Item label="Yearly" value="Yearly" style={styles.pickerItem} />
                </Picker>
                </View>
                {periodFilter === "Monthly" ? (
                  <BarChart 
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: monthlyData,
                      },
                    ],
                  }}
                  width={365}
                  height={280}
                  fromZero= {true}
                  style={styles.chart}
                  yAxisLabel="€"
                  chartConfig={chartConfigMonth}
                  showBarTops= {false}
                  showValuesOnTopOfBars= {false}

                />
                ) : (
                  <BarChart
                data={{
                  labels: ['2020', '2021', '2022', '2023'],
                  datasets: [
                    {
                      data: yearlyData,
                    },
                  ],
                }}
                width={365}
                height={280}
                yAxisLabel="€"
                fromZero= {true}
                chartConfig={chartConfigYear}
                style={styles.chart}
                showBarTops= {false}
                showValuesOnTopOfBars= {false}
                withHorizontalLabels= {true}
              />
                )}
                  </View>
            );
          }
          return null;
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
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Energy" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("Energy")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "Energy" && styles.activeFilterButtonText,
                ]}
              >
                Energy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Water" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("Water")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "Water" && styles.activeFilterButtonText,
                ]}
              >
                Water
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "All" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("All")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "All" && styles.activeFilterButtonText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            </View>
            <View>
        </View>
          {renderStatistics()}
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
          onPress={togglePopUp}
        >
          <View style={styles.popupText}>
            <TouchableOpacity style={{ position: "absolute", top: 16, right: 16 }} onPress={togglePopUp}>
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={styles.popupHeading}>General information</Text>
              <Text style={styles.popupDescription}>Supplier</Text>
              <TextInput style={styles.popupSubtext}>Bolt</TextInput>
              <Text style={styles.popupDescription}>Payer</Text>
              <TextInput style={styles.popupSubtext}>Yanelle</TextInput>
              <Text style={styles.popupDescription}>Advance</Text>
              <TextInput style={styles.popupSubtext}>€75,00</TextInput>
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

  popupText: {
    backgroundColor: "white",
    width: 342,
    height: 325,
    borderRadius: 10,
    textAlign: "center",
    padding: 20,
  },

  popupHeading: {
    fontFamily: "novatica",
    fontWeight: "bold",
    fontSize: 40,
    color: "#160635",
  },

  popupSubtext: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "#160635",
  },

  popupTitle: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 13,
    color: "#160635",
  },

  popupDescription: {
    fontFamily: "manrope",
    fontSize: 13,
    color: "black",
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
