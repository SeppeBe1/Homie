import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Image, Modal, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

import * as Font from "expo-font";

const loadFonts = async () => {
    await Font.loadAsync({
      moon: require('../assets/fonts/Moon.otf'),
      manrope: require('../assets/fonts/Manrope.ttf'),
      novatica: require('../assets/fonts/Novatica.ttf'),
      novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
    });
  };

const StatisticsComponent = ({ filter, periodFilter, monthlyData, yearlyData, handlePeriodFilterChange }) => {
    const navigation = useNavigation();

    useEffect(() => {
      loadFonts();
    }, []);
    
    const chartConfigMonth = {
      // Chart configuration for monthly data
      // ...
        backgroundColor: '#f5f5f5',
        backgroundGradientFrom: '#f5f5f5',
        backgroundGradientTo: '#f5f5f5',
        fillShadowGradient: '#160635',
        fillShadowGradientOpacity: 1,
        decimalPlaces: 1,
        barPercentage: 0.3,
        barRadius: 10,
        color: (opacity = 1) => `rgba(22, 6, 53, ${opacity})`,
        propsForLabels: {
            fontFamily: 'novaticaBold'
        },
    };
  
    const chartConfigYear = {
      backgroundColor: '#f5f5f5',
      backgroundGradientFrom: '#f5f5f5',
      backgroundGradientTo: '#f5f5f5',
      fillShadowGradient: '#160635',
      fillShadowGradientOpacity: 1,
      decimalPlaces: 1,
      barPercentage: 1.5,
      barRadius: 30,
      color: (opacity = 1) => `rgba(22, 6, 53, ${opacity})`,
      propsForLabels: {
        fontFamily: 'novaticaBold'
      },
      xAxisLabelCount: 0, // Set the number of visible horizontal labels to 0
      contentInset: { left: -20, right: -20 },
    };
  
    const renderStatistics = () => {
      // ...
      if (filter === "Energy") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Energy and electricity costs</Text>
        <Picker
          style={styles.periodFilterPicker}
          selectedValue={periodFilter}
          onValueChange={(itemValue) => handlePeriodFilterChange(itemValue)}
        >
          <Picker.Item label="Monthly" value="Monthly" style={styles.pickerItem}  />
          <Picker.Item label="Yearly" value="Yearly" />
        </Picker>
        </View>
        {periodFilter === "Monthly" ? (
            <TouchableWithoutFeedback onPress={() => console.log("Bar clicked!")}>

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
                  data: [20,40,80,88,55,95,80,140,95,95,78,26],
                },
              ],
            }}
            width={365}
            height={280}
            withHorizontalLabels= {true} 
            yAxisLabel="€"
            chartConfig={chartConfigMonth}
            showBarTops= {false}
            fromZero= {true}
            withInnerLines= {false}
            showValuesOnTopOfBars= {false}
            style={styles.chart}

          />
          </TouchableWithoutFeedback>

          ) : (
            <BarChart
          data={{
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
              {
                data: [504,1222,888,1400],
              },
            ],
          }}
          width={365}
          height={280}
          yAxisLabel="€"
          chartConfig={chartConfigYear}
          style={styles.chart}
          fromZero= {true}
          withInnerLines= {false}
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
            {/* Add the JSX code for rendering the chart */}
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
                  data: [102,35,66,88,55,95,40,150,35,95,78,66],
                },
              ],
            }}
            width={365}
            height={280}
            yAxisLabel="€"
            chartConfig={chartConfigMonth}
            showBarTops= {false}
            fromZero= {true}
            withInnerLines= {false}
            showValuesOnTopOfBars= {false}
            style={styles.chart}

          />
          ) : (
            <BarChart
          data={{
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
              {
                data: [635,465, 1000, 1500],
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
          withInnerLines= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Furniture") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Furniture costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Groceries") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Groceries costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Trips") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Trips costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Gas") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Gas costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Maintenance") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Maintenance costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          showBarTops= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      } else if (filter === "Others") {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>Other costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
          fromZero= {true}
          showBarTops= {false}
          showValuesOnTopOfBars= {false}
          withHorizontalLabels= {true}
        />
          )}
          </View>
        );
      }
      
      else {
        return (
          <View>
            {/* Add the JSX code for rendering the chart */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
        <Text style={styles.chartTitle}>All costs</Text>
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
            withInnerLines= {false}
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
          withInnerLines= {false}
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
      }
    };
  
    return (
      <View>
        {renderStatistics()}
      </View>
    );
    return null;
  };

  const styles = StyleSheet.create({
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
  
    chartTitle: {
      fontFamily: 'moon',
      fontSize:'14px',
      fontWeight: 'bold'
    },
    chart: {
      marginTop: '15px',
      marginBottom: '5px'
    },
  
    periodFilterPicker: {
      width: 85,
      height: 40,
      color: "#000",
      borderWidth: 0, // Remove the border
      borderColor: 'transparent',
      backgroundColor: '#F2F2F2',
      fontFamily: 'manrope',
      fontSize: '14px'
    },
    pickerItem: {
      fontSize:'10px'
    }
  });  

  export default StatisticsComponent;
