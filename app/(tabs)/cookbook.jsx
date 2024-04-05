import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from "react-native";
import SingleRecipeRow from "../SingleRecipeRow";
import { Link } from "expo-router";
import { observer } from 'mobx-react';
import recipeStore from "../SavedRecipes";
import plannerStore from 'app/PlannerStore';
import { FontAwesome } from '@expo/vector-icons';


const CookBook = observer(() => {

    const promptUnmatch = (id, name) => {
        Alert.alert("Unmatch", `Are you sure you want to unmatch with ${name}?`, [{text: "Unmatch", onPress: () => {handleRemove(id)}}, {text: "Cancel", onPress: ()=>{}}])
    }

    const handleRemove = (id) => {
        plannerStore.removeRecipeById(id);
        recipeStore.removeFavourite(id);
    };

    const favList = recipeStore.saved.map((item, index) => (
        <View key={(index + 1) * 100} style={styles.recipeContainer}>
            <Link
                href={{ pathname: "recipe/[id]", params: { id: item.id } }}
                style={styles.row}>
                <SingleRecipeRow title={item.name} image={item.thumbnail} tags={item.tags} id={item.id} />
            </Link>
            <TouchableOpacity onPress={() => promptUnmatch(item.id, item.name)} style={styles.removeButton}>
                <FontAwesome name="trash-o" size={40} color="#EB6F6F" />
            </TouchableOpacity>
        </View>
    ));

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {favList.length === 0 ? (
                    <View style={styles.noRecipesContainer}>
                        <Text style={styles.noRecipesText}>No saved recipes yet! Start swiping to save recipes.</Text>
                    </View>
                ) : (
                    favList
                )}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    recipeContainer: {
        flexDirection: 'row',
        // backgroundColor: 'lightgray',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    row: {
        flex: 1,
    },
    noRecipesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    noRecipesText: {
        fontSize: 20,
        textAlign: 'center',
    },
    removeButton: {
        alignSelf: 'center',
        margin: 10
    },
});

export default CookBook;
