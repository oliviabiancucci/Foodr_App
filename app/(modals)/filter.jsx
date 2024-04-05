import React, { useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import styles from "app/styles";
import { useRouter } from "expo-router";
import filterStore from "app/FilterStore";

const ToggleSwitch = ({ title, onSelect, isSelected }) => {
  const handlePress = () => {
    onSelect(title);
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          style.toggleSwitch,
          isSelected ? style.selected : style.unselected
        ]}
      >
        <Text style={style.switchText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const Page = () => {
  const DATA = [
    {
      title: "Course",
      data: ["Breakfast", "Starter", "Dessert"],
    },
    {
      title: "Dietary",
      data: ["Vegetarian", "Vegan"],
    },
    {
      title: "Type",
      data: ["Seafood", "Pasta", "Beef"],
    },
  ];

  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    const appliedFilters = filterStore.getFilters();
    if (appliedFilters.length > 0) {
      setSelectedFilter(appliedFilters[0]);
    }
  }, []);

  const handleFilterSelect = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
      filterStore.removeFavourite(filter);
    } else {
      setSelectedFilter(filter);
      filterStore.addFilter(filter);
    }
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    filterStore.clearFilters();
  };

  return (
    <SafeAreaView style={style.container}>
      <SectionList
        sections={DATA}
        renderItem={({ item }) => (
          <ToggleSwitch
            title={item.toUpperCase()}
            onSelect={handleFilterSelect}
            isSelected={selectedFilter === item.toUpperCase()}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
      <View style={style.buttonContainer}>
        <Button
          color={"#EB6F6F"}
          title="Apply Filter"
          onPress={() => router.back()}
        />
        <Button
          color={"#EB6F6F"}
          title="Clear Filter"
          onPress={clearFilter}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  toggleSwitch: {
    borderWidth: 2,
    borderRadius: 30,
    height: 50,
    minWidth: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderColor: "#EB6F6F",
    backgroundColor: "#EB6F6F",
  },
  unselected: {
    borderColor: "#AFAFAF",
    backgroundColor: "#AFAFAF",
  },
  switchText: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    color: "white",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Page;
