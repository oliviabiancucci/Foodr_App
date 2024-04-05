import React from "react";
import { Provider } from "mobx-react";
import RecipeStore from "../SavedRecipes";
import Swipe from "../swipe";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import filterStore from "app/FilterStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const App = () => {
    const router = useRouter();
    const handlePress = () => {
        filterStore.clearFilters();
        router.navigate("/filter");
    }
    return (
        <Provider recipeStore={RecipeStore}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Pressable style={{marginRight: 15}} onPress={handlePress }>
                            <MaterialCommunityIcons
                                name="filter-variant"
                                size={35}
                            />
                        </Pressable>
                    ),
                }}
            />
            <Swipe />
        </Provider>
    );
};

export default App;
