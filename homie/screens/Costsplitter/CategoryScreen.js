import React, { useState } from "react";
import { View } from "react-native";
import CategoryHeader from "../../compontents/CategoryHeader";
import UploadedFiles from "../../compontents/UploadedFiles";

const CategoryScreen = ({ route }) => {
  const { category } = route.params;

  const categoryData = {
    Energy: {
      category: "Energy",
      image: require("../../assets/icons/energy_cat.svg"),
    },
    Water: {
      category: "Water",
      image: require("../../assets/icons/water_cat.svg"),
    },
    Other: {
      category: "Other",
      image: require("../../assets/icons/activities_cat.svg"),
    },
  };

  const [selectedCategory, setSelectedCategory] = useState(
    categoryData[category]
  );

  return (
    <View>
      <CategoryHeader
        title={selectedCategory.category}
        image={selectedCategory.image}
      />
      <UploadedFiles category={selectedCategory.category} />
    </View>
  );
};

export default CategoryScreen;
