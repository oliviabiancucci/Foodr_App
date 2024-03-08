import { StyleSheet, Text, View, FlatList } from "react-native";
//import * as data from './recipe_list.json';
import { recipes as data } from "../recipe_list.json";
import SingleRecipeRow from "../SingleRecipeRow";
import { Link } from "expo-router";

export default Page = () => {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => {
                return (
                    <Link
                        href={{
                            pathname: "recipe/[id]",
                            params: { id: index },
                        }} style={styles.row}
                    >
                        <SingleRecipeRow
                            title={item.recipeName}
                            image={item.imageUrl}
                            speed={item.cookingTime}
                            price={item.amountOfIngredients}
                        />
                    </Link>
                );
            }}
            keyExtractor={(item) => item.recipeName}
            horizontal={false}
        />
    );
};
const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        backgroundColor: 'lightgray',
        margin: 20,
        height: 100,
        marginBottom: 0,
        borderRadius: 10,
        overflow: 'hidden',
    },
});