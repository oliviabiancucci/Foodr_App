import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Foodr",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="home"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cookbook"
                options={{
                    title: "Cookbook",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="book-open"
                            color={color}
                        />
                    ),
                }}
            />

            {/* Hidden routes */}
            <Tabs.Screen
                name="recipe/[id]"
                options={{
                    title: 'Recipe',
                    href: null,
                }}
            />
        </Tabs>
    );
}
