import React from "react";
import { Image, Text, View, Button, Pressable, FlatList, SectionList, SafeAreaView } from "react-native";
import styles from "../../styles";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { recipes as cookbook } from "../../recipe_list.json";

import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProfileImage } from "app/components";

import recipeStore from "app/SavedRecipes";

const SplashImage = ({ recipe }) => {
    return (
        <ImageBackground style={styles.splashImage} src={recipe.thumbnail}>
            <LinearGradient
                colors={["#00000000", "#000000"]}
                style={{ height: "100%", width: "100%", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <Text style={{color: 'white', fontSize: 50, fontWeight: "bold"}}>{recipe.name}</Text>
            </LinearGradient>
        </ImageBackground>
    );
};

const Page = () => {
    const { id } = useLocalSearchParams();
    const recipe = recipeStore.getFavoriteById(id);

    const router = useRouter();

    const instructionsArray = recipe.instructions.split("\n");

    const DATA = [
        {
            title: 'Ingredients',
            data: recipe.ingredients
        },
        {
            title: 'Directions',
            data: instructionsArray
        }
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: recipe.name
                }}
            />
            <SplashImage recipe={recipe} />
            <SafeAreaView style={styles.container}>
                <SectionList 
                    sections={DATA}
                    renderItem={({item, section}) => {
                        if (section.title === 'Ingredients') {
                            return (
                                <Text style={{fontSize: 18, padding: 10}}>
                                    <FontAwesome name="circle" size={18} color="black" /> <Text>    </Text>
                                    {/* <MaterialCommunityIcons size={18} name="checkbox-blank-outline" />  */}
                                    {item.measure} {item.name}
                                </Text>
                            );
                        } else {
                            return <Text style={{fontSize: 18, padding: 10}}>{item}</Text>;
                        }
                    }}
                    renderSectionHeader={({section: {title}}) => {
                        return <Text style={[styles.heading, {marginTop: 10, marginBottom: 10, fontWeight: 'bold', paddingLeft: 10}]}>{title}</Text>;
                    }}
                />
            </SafeAreaView>
        </>
    );
};

export default Page;
