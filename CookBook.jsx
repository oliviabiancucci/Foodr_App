import { StyleSheet, Text, View, FlatList } from 'react-native';
//import * as data from './recipe_list.json';
import {recipes as data} from './recipe_list.json';
import SingleRecipeRow from './SingleRecipeRow';

// const itemData = [
//     {
//       data: data.recipes[0]
//     },
//     {
//       data: data.recipes[1]
//     },
//     {
//       data: data.recipes[2]
//     },
//     {
//       data: data.recipes[3]
//     },
//     {
//       data: data.recipes[4]
//     },
//     {
//       data: data.recipes[5]
//     },
//     {
//       data: data.recipes[6]
//     },
//     {
//       data: data.recipes[7]
//     }
//   ]
export default function CookBook(){

    return(
        <FlatList
            data={data}
            renderItem={({item}) => <SingleRecipeRow title={item.recipeName} image = {item.imageUrl} />}
            keyExtractor={item => item.recipeName}
            horizontal={false}
        />
    )
}