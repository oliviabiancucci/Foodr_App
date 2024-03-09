import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

const recipesData = require('./recipe_list.json');

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setMenuItem] = useState('Recipes');
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleMenuPress = () => {
    if (selectedMenuItem) {
      setMenuItem(null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItemPress = (item) => {
    setMenuItem(item);
    setIsMenuOpen(false);
  };
  
  const addToFavourites = (recipe) => {
    const isFavorited = favouriteRecipes.some((favRecipe) => favRecipe.recipeName === recipe.recipeName);
    if (isFavorited) {
      const updatedFavorites = favouriteRecipes.filter((favRecipe) => favRecipe.recipeName !== recipe.recipeName);
      setFavouriteRecipes(updatedFavorites);
    } else {
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    }
  };

  const isRecipeFavorited = (recipe) => {
    return favouriteRecipes.some((favRecipe) => favRecipe.recipeName === recipe.recipeName);
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItemContainer} onPress={() => handleRecipePress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.recipeImage}/>
      <View style={styles.imageOverlay}></View>
      <Text style={styles.personText}>{item.recipeAuthor}</Text>
      <TouchableOpacity style={styles.heartOverlay} onPress={() => addToFavourites(item)}>
        <Text>{isRecipeFavorited(item) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      <Text style={styles.overlayRecipe}>{item.recipeName}</Text>
      <View style={styles.overlayIconsContainer}>
        <View style={styles.overlayIconText}>
          <Text style={styles.overlayIcons}>&#9202;</Text>
          <Text style={styles.overlayText}>{item.cookingTime}</Text>
        </View>
        <View style={styles.overlayIconText}>
          <Text style={styles.overlayIcons}>&#36;</Text>
          <Text style={styles.overlayText}>{item.amountOfIngredients}</Text>
        </View>
        <View style={styles.overlayIconText}>
          <Text style={styles.overlayIcons}>&#63;</Text>
          <Text style={styles.overlayText}>{item.recipeDifficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSelectedScreen = (selectedMenuItem) => {
    switch (selectedMenuItem) {
      case 'Recipes':
        return (
          <View style={styles.container}>
          <View style={styles.menuBar}>
            <TouchableOpacity onPress={() => handleMenuPress()}>
              <Text style={styles.menuIcon}>&#9776;</Text>
            </TouchableOpacity>
            <Text style={styles.menuTitle}>Lab 7 - Navigation</Text>
          </View>
    
          {isMenuOpen && (
              <View style={styles.sideMenu}>
                <Text style={styles.menuSubtitle}>Recipe App</Text>
    
                <TouchableOpacity onPress={() => menuItemPress('Recipes')}>
                  <Text style={styles.icon}>▤     Recipes</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => menuItemPress('Favourites')}>
                  <Text style={styles.icon}>&#x2665;   Favourite Recipes</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => menuItemPress('Settings')}>
                  <Text style={styles.icon}>&#x2699;    Settings</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
          )}
    
          <FlatList style={styles.gridContainer}
            data={recipesData.recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.recipeName}
            numColumns={2}
          />
    
          {selectedRecipe && (
            <View style={styles.detailedViewContainer}>
              <Text style={styles.detailedViewTitle}>{selectedRecipe.recipeName}</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                  <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.image}/>
                  <Text style={styles.subtitle}>Author: </Text>
                  <Text>{selectedRecipe.recipeAuthor}</Text>
                  <Text style={styles.subtitle}>Description:</Text>
                  <Text style={styles.text}>{selectedRecipe.description}</Text>
                  <Text style={styles.subtitle}>Ingredients:</Text>
                  <View>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <Text key={index} style={styles.listItem}>{`${index + 1}. ${ingredient}`}</Text>
                    ))}
                  </View>
                  <Text style={styles.subtitle}>Time to Cook:</Text>
                  <Text style={styles.text}>{selectedRecipe.cookTime} mins</Text>
                  <Text style={styles.subtitle}>Directions:</Text>
                  <View>
                    {selectedRecipe.directions.map((direction, index) => (
                      <Text key={index} style={styles.listItem}>{`${index + 1}. ${direction}`}</Text>
                    ))}
                  </View>
                </View>
              </ScrollView>
    
              <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.selectedScreenContainer, selectedMenuItem ? styles.selectedScreenVisible : styles.selectedScreenHidden]}>
            {renderSelectedScreen(selectedMenuItem)}
          </View>
        </View>
        );
      case 'Favourites':
        return (
          <View style={styles.screen}>
            <View style={styles.menuBar}>
              <TouchableOpacity onPress={() => handleMenuPress()}>
                <Text style={styles.menuIcon}>&#9776;</Text>
              </TouchableOpacity>
              <Text style={styles.menuTitle}>Favourite Recipes</Text>
              </View>
              {favouriteRecipes.length === 0 ? (
                <Text style={styles.text}>No Favourites Yet</Text>
              ) : (
                <FlatList style={styles.favsContainer}
                  data={favouriteRecipes}
                  renderItem={renderRecipeItem}
                  keyExtractor={(item) => item.recipeName}
                  numColumns={2}
                />
              )}
          </View>
        );
      case 'Settings':
        return (
          <View style={styles.screen}>
            <View style={styles.menuBar}>
              <TouchableOpacity onPress={() => handleMenuPress()}>
                <Text style={styles.menuIcon}>&#9776;</Text>
              </TouchableOpacity>
              <Text style={styles.menuTitle}> Settings</Text>
            </View>
            <Text style={styles.text}>No settings for you hehe sorry</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
      <View style={[styles.container, styles.selectedScreenContainer]}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => handleMenuPress()}>
            <Text style={styles.menuIcon}>&#9776;</Text>
          </TouchableOpacity>
          <Text style={styles.menuTitle}>Lab 7 - Navigation</Text>
        </View>
    
        {isMenuOpen && (
          <View style={styles.sideMenu}>
            <Text style={styles.menuSubtitle}>Recipe App</Text>
    
            <TouchableOpacity onPress={() => menuItemPress('Recipes')}>
              <Text style={styles.icon}>▤     Recipes</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => menuItemPress('Favourites')}>
              <Text style={styles.icon}>&#x2665;   Favourite Recipes</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => menuItemPress('Settings')}>
              <Text style={styles.icon}>&#x2699;    Settings</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
    
        {selectedMenuItem === 'Recipes' && (
          <FlatList
            style={styles.gridContainer}
            data={recipesData.recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.recipeName}
            numColumns={2}
          />
        )}
    
        {selectedMenuItem === 'Favourites' && (
          <View style={styles.screen}>
            <View style={styles.menuBar}>
              <TouchableOpacity onPress={() => handleMenuPress()}>
                <Text style={styles.menuIcon}>&#9776;</Text>
              </TouchableOpacity>
              <Text style={styles.menuTitle}>Favourite Recipes</Text>
            </View>
            {favouriteRecipes.length === 0 ? (
              <Text style={styles.text}>No Favourites Yet</Text>
            ) : (
              <FlatList
                style={styles.favsContainer}
                data={favouriteRecipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.recipeName}
                numColumns={2}
              />
            )}
          </View>
        )}
    
        {selectedMenuItem === 'Settings' && (
          <View style={styles.screen}>
            <View style={styles.menuBar}>
              <TouchableOpacity onPress={() => handleMenuPress()}>
                <Text style={styles.menuIcon}>&#9776;</Text>
              </TouchableOpacity>
              <Text style={styles.menuTitle}> Settings</Text>
            </View>
            <Text style={styles.text}>No settings for you hehe sorry</Text>
          </View>
        )}
    
        {selectedRecipe && (
            <View style={styles.detailedViewContainer}>
            <Text style={styles.detailedViewTitle}>{selectedRecipe.recipeName}</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <View style={styles.container}>
                <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.image}/>
                <Text style={styles.subtitle}>Author: </Text>
                <Text>{selectedRecipe.recipeAuthor}</Text>
                <Text style={styles.subtitle}>Description:</Text>
                <Text style={styles.text}>{selectedRecipe.description}</Text>
                <Text style={styles.subtitle}>Ingredients:</Text>
                <View>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.listItem}>{`${index + 1}. ${ingredient}`}</Text>
                  ))}
                </View>
                <Text style={styles.subtitle}>Time to Cook:</Text>
                <Text style={styles.text}>{selectedRecipe.cookTime} mins</Text>
                <Text style={styles.subtitle}>Directions:</Text>
                <View>
                  {selectedRecipe.directions.map((direction, index) => (
                    <Text key={index} style={styles.listItem}>{`${index + 1}. ${direction}`}</Text>
                  ))}
                </View>
              </View>
            </ScrollView>
  
            <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  gridContainer: {
    marginTop: 80,
    flex: 1,
  },
  favsContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },  
  menuBar: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#158abd',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  menuTitle: {
    color: 'white',
    fontSize: 20,
  },
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: 'white',
    zIndex: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  recipeItemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  overlayRecipe: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 1,
    fontWeight: 'bold',
  },
  heartOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    fontSize: 15,
    zIndex: 1,
    fontWeight: 'bold',
  },
  overlayIconsContainer: {
    position: 'absolute',
    bottom: 7,
    left: 10,
    flexDirection: 'row',
    zIndex: 1,
  },
  overlayIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  overlayIcons: {
    color: 'white',
    fontSize: 15,
    marginRight: 5,
    fontWeight: 'bold',
  },
  overlayText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  personText: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    fontSize: 10,
    zIndex: 1,
    fontWeight: 'bold',
  },
  detailedViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    zIndex: 999,
  },
  detailedViewTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  closeButton: {
    fontSize: 20,
    color: '#158abd',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 40,
    color: 'black',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  menuSubtitle: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 60,
    fontSize: 25,
    color: 'white',
    backgroundColor: '#158abd',
    borderRadius: 5,
  },
  icon: {
    fontSize: 20,
    marginVertical: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    marginVertical: 10,
    color: 'black',
    textAlign: 'justify',
    marginBottom: 20,
  },
  listItem: {
    fontSize: 17,
    color: 'black',
    textAlign: 'justify',
    marginBottom: 5,
  },
  selectedScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  selectedScreenVisible: {
    display: 'flex',
  },
  selectedScreenHidden: {
    display: 'none',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
