import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, Text, FlatList, Animated, Easing } from 'react-native';
import { recipes as data } from './recipe_list.json';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { inject, observer } from 'mobx-react';
import SwipeGesture from 'react-native-swipe-gestures';

import { getMatch } from './api';

export default Main = inject('recipeStore')(observer(({ recipeStore }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    // Use this state to control the visibility and content of the overlay
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // This function toggles the overlay
    const toggleDetails = (recipe = null) => {
        setSelectedRecipe(recipe); // Set the selected recipe, or pass null to hide
        setShowDetails(recipe !== null); // Show or hide the overlay based on whether a recipe is passed
    };
    const openRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe's details
        setShowDetails(true); // Show the overlay
      };

    // const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    // const recipe = data[currentRecipeIndex];
    const swipeAnim = useRef(new Animated.Value(0)).current;

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        getMatch().then(newMatch => {
            setRecipe(newMatch);
        })
    }, [])

    const handleSwipe = (direction) => {
        Animated.timing(swipeAnim, {
            toValue: direction === 'right' ? 500 : -500,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            direction === 'right' ? handleHeartPress() : handleXPress();
            swipeAnim.setValue(0);
        });
    };

    const handleHeartPress = () => {
    //   stringStore.addFavorite(recipe.recipeName, recipe.imageUrl, recipe.cookingTime, recipe.amountOfIngredients);
    //   const isSaved = savedRecipes.some((savedRecipe) => savedRecipe.recipeName === recipe.recipeName);
    //   if (isSaved) {
    //     const updatedSaved = savedRecipes.filter((savedRecipe) => savedRecipe.recipeName !== recipe.recipeName);
    //     setSavedRecipes(updatedSaved);
    //   } else {
    //     setSavedRecipes([...savedRecipes, recipe]);
    //   }
    //   setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % data.length);

        recipeStore.addFavorite(recipe);
        toggleDetails(null);
        getMatch().then(newMatch => {
            setRecipe(newMatch);
        })
    };
  
    const handleXPress = () => {
    //   setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % data.length);
        toggleDetails(null);
        getMatch().then(newMatch => {
            setRecipe(newMatch);
        })
    };

    return (
      <SwipeGesture
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          config={{
              velocityThreshold: 0.3,
              directionalOffsetThreshold: 80
          }}
          style={{ flex: 1 }}
      >
          <View style={styles.container}>
              {recipe != null ? (
                  <>
                      <Animated.View
                          style={[
                              styles.card,
                              {
                                  transform: [{ translateX: swipeAnim }],
                              },
                          ]}
                      >
                        <TouchableOpacity onPress={() => openRecipeDetails(recipe)}>
                          <ImageBackground source={{ uri: recipe.thumbnail }} style={[styles.image, { marginTop: -50 }]}>
                              <LinearGradient
                                  colors={["#00000000", "#000000"]}
                                  style={{ height: "100%", width: "100%", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}
                              >
                                  <View style={styles.overlay}>
                                      <Text style={styles.recipeName}>{recipe.name}</Text>
                                      {/* <Text style={styles.cookTime}>{recipe.cookTime} mins</Text> */}
                                      <Text style={styles.cookTime}>10 mins</Text>
                                      <View style={styles.tagsContainer}>
                                          {recipe.tags.map((tag, index) => (
                                              <Text key={index} style={[styles.tags, styles.tag]}>{tag}</Text>
                                          ))}
                                      </View>
                                  </View>
                              </LinearGradient>
                          </ImageBackground>
                          </TouchableOpacity>
                      </Animated.View>
                      <FlatList />
                      <View style={styles.iconContainer}>
                          <TouchableOpacity style={styles.icon} onPress={() => handleSwipe('left')}>
                              <MaterialIcons name="cancel" size={73} color="#EB6F6F" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.icon} onPress={() => handleSwipe('right')}>
                              <AntDesign name="heart" size={70} color="#EB6F6F" />
                          </TouchableOpacity>
                      </View>
                  </>
              ) : (
                  <View style={styles.endMessageContainer}>
                      <Text style={styles.endMessage}>More recipes coming soon!</Text>
                  </View>
              )}
          </View>
          {
        showDetails && selectedRecipe && (
        
                <FlatList
                    style={
                        styles.detailsOverlay
                    }
                        data={recipe.ingredients}
                        renderItem={({item, index}) => <Text style={styles.detailText}>{index + 1}. {item.name}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={false}
                        ListHeaderComponent={<Text style={styles.detailTextTitle}>Ingredients:</Text>}
                    />
            
    )
}

      </SwipeGesture>
  );
}));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    card: {
        position: 'absolute',
        width: 375,
        height: 500,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '95%',
        borderRadius: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
    },
    recipeName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    cookTime: {
        fontSize: 18,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    tags: {
        fontSize: 18,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 10,
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
    },
    icon: {
        marginHorizontal: 20,
    },
    savedRecipe: {
        fontSize: 20,
        color: '#000000',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    endMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    endMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        backgroundColor: '#EB6F6F',
        borderRadius: 30,
    },
    detailsOverlay: {
        position: 'absolute',
        top: '70%', // Adjust positioning based on your design
        width: '95%',
        left: '2.5%',
        height: 70,
        backgroundColor: '#EB6F6F',
        padding: 10,
        paddingTop: 5,
        borderRadius: 10,
        zIndex: 100, // Make sure it's above other content
      },
      detailTextTitle:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      },
      detailText: {
        color: '#FFFFFF',

    },

});
