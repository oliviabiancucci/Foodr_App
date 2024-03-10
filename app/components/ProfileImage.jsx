import { ImageBackground, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import styles from "../styles"

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10, //no workie :(
        marginBottom: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
    },
    recipeName: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    cookTime: {
        fontSize: 18,
        color: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    },
    tags: {
        fontSize: 18,
        color: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
        marginRight: 10,
        textAlign: "center",
    },
});

export default ProfileImage = ({ recipe }) => {
    <ImageBackground source={{ uri: recipe.imageUrl }} style={styles.image}>
        <LinearGradient
            colors={["#00000000", "#000000"]}
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
            }}
        >
            <View style={styles.overlay}>
                <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                <Text style={styles.cookTime}>{recipe.cookTime} mins</Text>
                <View style={styles.tagsContainer}>
                    {recipe.tags.map((tag, index) => (
                        <Text key={index} style={[styles.tags, styles.tag]}>
                            {tag}
                        </Text>
                    ))}
                </View>
            </View>
        </LinearGradient>
    </ImageBackground>;
};
