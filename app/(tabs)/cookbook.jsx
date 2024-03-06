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
                        }}
                    >
                        <SingleRecipeRow
                            title={item.recipeName}
                            image={item.imageUrl}
                        />
                    </Link>
                );
            }}
            keyExtractor={(item) => item.recipeName}
            horizontal={false}
        />
    );
};
