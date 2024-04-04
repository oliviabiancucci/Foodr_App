import { Image, Text, View, Button, Pressable, FlatList, SectionList, SafeAreaView } from "react-native";
import styles from "../../styles";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
                <Text style={{color: 'white', fontSize: 50, fontStyle: 'italic'}}>{recipe.name}</Text>
            </LinearGradient>
        </ImageBackground>
    );
};

export default Page = () => {
    const { id } = useLocalSearchParams();
    const recipe = recipeStore.getFavoriteById(id);

    const router = useRouter();

    const DATA = [
        {
            title: 'Ingredients',
            data: recipe.ingredients
        },
        {
            title: 'Directions',
            // data: recipe.directions
            data: []
        }
    ]

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: recipe.name
                }}
            />
            <SplashImage recipe={recipe} />
            {/* <View style={{width: "100%", height: 300}}>
                <ProfileImage recipe={recipe} />
            </View> */}
            <SafeAreaView style={styles.container}>
                <SectionList 
                    sections={DATA}
                    renderItem={({item}) => {
                        return <Text style={{fontSize: 18}}><MaterialCommunityIcons size={18} name="checkbox-blank-outline" /> {item.measure} {item.name}</Text>
                    }}
                    renderSectionHeader={({section: {title}}) => {
                        return <Text style={styles.heading}>{title}</Text>
                    }}
                />
                {/* <FlatList 
                    data={recipe.ingredients}
                    renderItem={({item, index}) => {
                        return <Text style={{fontSize: 18}}><MaterialCommunityIcons size={18} name="checkbox-blank-outline" /> {item}</Text>
                    }}
                    keyExtractor={(index) => index}
                />
                <Text style={styles.heading}>Directions</Text>
                <FlatList 
                    data={recipe.directions}
                    renderItem={({item, index}) => {
                        return <Text style={{fontSize: 18}}><MaterialCommunityIcons size={18} name="checkbox-blank-outline" /> {item}</Text>
                    }}
                    keyExtractor={(index) => index}
                /> */}
            </SafeAreaView>
        </>
    );
};
