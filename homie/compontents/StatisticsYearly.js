import React from 'react';
import { View, Text } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-chart-kit';

class CustomBarChart extends React.Component {
  renderCustomBar = (value, index) => {
    const borderRadius = 8;

    return (
      <View
        key={index}
        style={{
          position: 'absolute',
          top: value.y,
          left: value.x,
          width: value.width,
          height: value.height,
          borderRadius: borderRadius,
          backgroundColor: 'rgba(22, 6, 53, 1)',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: -16,
            left: value.width / 2,
            textAlign: 'center',
            fontSize: 10,
            color: 'white',
          }}
        >
          {value.value}
        </Text>
      </View>
    );
  };

  render() {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [200, 300, 150, 400, 250, 350, 180, 280, 320, 220, 390, 180],
        },
      ],
    };

    const yValues = data.datasets[0].data;

    return (
      <View style={{ height: 200 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          width={400}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            fillShadowGradient: '#160635',
            fillShadowGradientOpacity: 1,
            decimalPlaces: 0,
            barPercentage: 0.2,
            color: (opacity = 1) => `rgba(22, 6, 53, ${opacity})`,
            style: {
                paddingLeft: -10, // Adjust the paddingLeft value as needed
              },
          }}
          accessor="value"
          showGrid={false}
          withHorizontalLabels={false}
          withInnerLines={false}
          withVerticalLabels={true}
          useShadowColorFromDataset= {true}
          yAxisLabel=""
          fromZero
          renderCustomBar={this.renderCustomBar}
        />
      </View>
    );
  }
}

export default CustomBarChart;
