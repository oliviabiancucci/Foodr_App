import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
//import * as data from './recipe_list.json';
import { recipes as data } from "../recipe_list.json";
import SingleRecipeRow from "../SingleRecipeRow";
import { Link } from "expo-router";
import { inject, observer } from 'mobx-react';
import stringStore  from "../SavedRecipes";
//inject('stringStore')(observer(({ stringStore }
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
// export default Page = inject('allSaved')(observer(({ allSaved }) => {
//     return (
//         <FlatList
//             data={data}
//             renderItem={({ item, index }) => {
//                 return (
//                     <Link
//                         href={{
//                             pathname: "recipe/[id]",
//                             params: { id: index },
//                         }} style={styles.row}
//                     >
//                         <SingleRecipeRow
//                             title={item.recipeName}
//                             image={item.imageUrl}
//                             speed={item.cookingTime}
//                             price={item.amountOfIngredients}
//                         />
//                     </Link>
//                 );
//             }}
//             keyExtractor={(item) => item.recipeName}
//             horizontal={false}
//         />
//     );
// }));
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