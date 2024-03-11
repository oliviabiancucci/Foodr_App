// entry file for expo-router

import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";

export default Layout = () => {
    if (process.env.NODE_ENV === "development") {
        useEffect(() => {
            // change shown page for development purposes
            router.navigate("/");
        });
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="filter"
                options={{ title: "Filter", presentation: "modal" }}
            />
            <Stack.Screen
                name="recipe/[id]"
                options={{
                    title: "Recipe",
                    presentation: "modal",
                }}
            />
        </Stack>
    );
};
