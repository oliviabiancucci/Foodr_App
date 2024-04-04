import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import recipeStore from "./SavedRecipes";

export default function SingleRecipeRow({ title, image, tags, id}) {
    const handleRemove = (id) => {
        recipeStore.removeFavourite(id);
    };

    const threeTags = tags.slice(0, 3); //takes up to three tags from the api recipe
    
    return (
        <View style={styles.row}>
            <Image style={styles.im} source={{ uri: image }} />
            <View style={styles.column}>
                <Text style={styles.title}>{title}</Text>
                {threeTags.map((tag, index) => (
                    <View key={index} style={styles.view}>
                        <Text style={styles.tag}>{tag}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => handleRemove(id)} style={styles.removeButton}>
                <FontAwesome name="times-circle" size={24} color="#EB6F6F" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    im: {
        width: 75,
        height: 75,
        marginTop: 15,
        marginLeft: 15,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginLeft: 20,
        width: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    view: {
        backgroundColor: "#EB6F6F",
        borderRadius: 10,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    tag: {
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
        maxWidth: 150,
    },
    removeButton: {
        marginLeft: 80,
        marginTop: 15,
    },
});
