import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import SingleRecipeRow from "../SingleRecipeRow";
import { Link } from "expo-router";
import { observer } from 'mobx-react';
import stringStore  from "../SavedRecipes";

const CookBook = observer(() => {
    const favList = stringStore.saved.map((item, index) => (
        <Link key={(index + 1) * 100}
        href={{pathname: "recipe/[id]",
        params: {id: index},
        }} style={styles.row}>
            <SingleRecipeRow title={item.name} image={item.image} speed={item.speed} price={item.price}/>
        </Link>
    ));
    return (
        <ScrollView>{favList}</ScrollView>
    );
}
);
export default CookBook;

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