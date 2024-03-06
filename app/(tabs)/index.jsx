import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { recipes as data } from '../recipe_list.json';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


export default function Main() {
  const recipe = data[0];

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{recipe.recipeName}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="heart" size={70} color="#EB6F6F"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
			<MaterialIcons name="cancel" size={73} color="#EB6F6F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 350,
    height: 450,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 20,
  },
});
