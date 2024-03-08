import { Image, Text, View, Button, Pressable, FlatList, SectionList, SafeAreaView } from "react-native";
import styles from "../../styles";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { recipes as cookbook } from "../../recipe_list.json";

import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const SplashImage = ({ recipe }) => {
    return (
        <ImageBackground style={styles.splashImage} src={recipe.imageUrl}>
            <LinearGradient
                colors={["#00000000", "#000000"]}
                style={{ height: "100%", width: "100%", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <Text style={{color: 'white', fontSize: 50, fontStyle: 'italic'}}>{recipe.recipeName}</Text>
            </LinearGradient>
        </ImageBackground>
    );
};

export default Page = () => {
    const { id } = useLocalSearchParams();
    const recipe = cookbook[id];

    const router = useRouter();

    const DATA = [
        {
            title: 'Ingredients',
            data: recipe.ingredients
        },
        {
            title: 'Directions',
            data: recipe.directions
        }
    ]

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: cookbook[id].recipeName,
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()}>
                            <MaterialCommunityIcons
                                name="arrow-collapse-left"
                                size={35}
                            />
                        </Pressable>
                    ),
                }}
            />
            <SplashImage recipe={recipe} />
            <SafeAreaView style={styles.container}>
                <SectionList 
                    sections={DATA}
                    renderItem={({item}) => {
                        return <Text style={{fontSize: 18}}><MaterialCommunityIcons size={18} name="checkbox-blank-outline" /> {item}</Text>
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
