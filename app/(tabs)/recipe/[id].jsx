import { Image, Text, View, Button, Pressable } from "react-native";
import styles from "../../styles";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { recipes as cookbook } from "../../recipe_list.json";

const SplashImage = ({ imageUrl }) => {
    return <Image style={styles.splashImage} src={imageUrl} />;
};

export default Page = () => {
    const { id } = useLocalSearchParams();
    const recipe = cookbook[id];

    const router = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    // headerTitle: (props) => <LogoTitle {...props} />,
                    headerLeft: () => (
                        <Pressable onPress={() => router.navigate('/cookbook')}><MaterialCommunityIcons name="arrow-collapse-left" size={35}/></Pressable>
                    ),
                }}
            />
            <View style={styles.container}>
                <SplashImage imageUrl={recipe.imageUrl} />
                <Text style={styles.title}>{recipe.recipeName}</Text>
            </View>
        </>
    );
};
