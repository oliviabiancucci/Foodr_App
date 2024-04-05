import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";

import { Link, useRouter } from "expo-router";

import DateTimePicker from "react-native-modal-datetime-picker";
import SingleRecipeRow from "app/SingleRecipeRow";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox, Button } from "app/components";

import recipeStore from "app/SavedRecipes";
import plannerStore from "app/PlannerStore";

const Picker = () => {
    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const confirmDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            Alert.alert(
                "Invalid Date",
                "Recipes must be planned for today and onwards"
            );
        } else {
            setSelectedDate(date);
        }
        hideDatePicker();
    };

    const addRecipe = (index) => {
        const newSelectedRecipes = selectedRecipes.concat([index]);
        setSelectedRecipes(newSelectedRecipes);
    };
    const removeRecipe = (index) => {
        const removeIndex = selectedRecipes.findIndex((v) => v == index);
        setSelectedRecipes(selectedRecipes.splice(removeIndex, removeIndex));
    };
    const handleSubmit = () => {
        selectedDate.setHours(0, 0, 0, 0);

        selectedRecipes.forEach((recipeIndex) => {
            plannerStore.addRecipe(
                recipeStore.saved[recipeIndex],
                selectedDate
            );
        });

        router.back();
    };

    const favList = recipeStore.saved.map((item, index, handleRemove) => (
        <View
            style={{
                // justifyContent: "space-between",
                gap: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                marginHorizontal: 10,
                borderRadius: 10,
                overflow: "hidden",
            }}
            key={(index + 1) * 100}
        >
            <Checkbox
                size={50}
                onCheck={() => addRecipe(index)}
                onUncheck={() => {
                    removeRecipe(index);
                }}
            />
            <Link
                href={{ pathname: "recipe/[id]", params: { id: item.id } }}
                style={styles.row}
            >
                <View style={styles.recipeContainer}>
                    <SingleRecipeRow
                        title={item.name}
                        image={item.thumbnail}
                        tags={item.tags}
                        id={item.id}
                    />
                </View>
            </Link>
        </View>
    ));

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    minHeight: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 30,
                    margin: 20
                }}
                onPress={showDatePicker}
            >
                <MaterialCommunityIcons name="calendar" size={30} />
                <Text style={{fontSize: 18, textDecorationLine: "underline"}}>
                    {selectedDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Text>
            </TouchableOpacity>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate}
                onConfirm={confirmDate}
                onCancel={hideDatePicker}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {favList.length === 0 ? (
                    <View style={styles.noRecipesContainer}>
                        <Text style={styles.noRecipesText}>
                            No saved recipes yet! Start swiping to save recipes.
                        </Text>
                    </View>
                ) : (
                    favList
                )}
            </ScrollView>
            <Button
                title="Plan Recipes"
                onPress={handleSubmit}
                disabled={selectedRecipes.length == 0}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingVertical: 10,
    },
    row: {
        flexDirection: "row",
        // backgroundColor: "lightgray",
    },
    recipeContainer: {
        flex: 1,
        padding: 5,
        marginHorizontal: 55,
        borderRadius: 10,
        overflow: "hidden",
    },
    noRecipesContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 25,
    },
    noRecipesText: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default Picker;
