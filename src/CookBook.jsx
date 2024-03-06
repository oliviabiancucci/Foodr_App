import { StyleSheet, Text, View, FlatList } from 'react-native';
//import * as data from './recipe_list.json';
import {recipes as data} from './recipe_list.json';
import SingleRecipeRow from './SingleRecipeRow';


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