import React from "react";
import { Provider } from "mobx-react";
import StringStore from "../SavedRecipes";
import Swipe from "../swipe";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const App = () => {
    const router = useRouter();

    return (
        <Provider stringStore={StringStore}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Pressable onPress={() => router.navigate("/filter")}>
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
