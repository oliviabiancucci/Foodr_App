import React from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import SingleRecipeRow from "../SingleRecipeRow";
import { Link } from "expo-router";
import { observer } from 'mobx-react';
import recipeStore from "../SavedRecipes";

const CookBook = observer(() => {
    const favList = recipeStore.saved.map((item, index) => (
        <Link key={(index + 1) * 100}
              href={{ pathname: "recipe/[id]", params: { id: item.id } }}
              style={styles.row}>
            <SingleRecipeRow title={item.name} image={item.thumbnail} speed={"fast"} price={"cheap"} />
        </Link>
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
    row: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
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
});

export default CookBook;
