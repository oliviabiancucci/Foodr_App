import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default Layout = () => {
    return (
        <Tabs
            initialRouteName="index"
            backBehavior="history"
            screenOptions={{ tabBarActiveTintColor: "#EB6F6F" }}
        >
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
        </Tabs>
    );
};
