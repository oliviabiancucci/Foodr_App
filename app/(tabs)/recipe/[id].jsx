import { Image, Text, View, Button, Pressable } from "react-native";
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
            <View style={styles.container}>
                <SplashImage recipe={recipe} />
            </View>
        </>
    );
};
