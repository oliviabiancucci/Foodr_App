import React, { useState, useRef } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, FlatList, PanResponder, Animated } from 'react-native';
import { recipes as data } from '../recipe_list.json';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Main() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const recipe = data[currentRecipeIndex];

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          handleSwipe('right');
        } else if (gesture.dx < -120) {
          handleSwipe('left');
        } else { //return back to middle
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      }
    })
  ).current;

  const handleSwipe = (direction) => {
    Animated.timing(pan, {
      toValue: {
        x: direction === 'right' ? 500 : -500,
        y: 0
      },
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      direction === 'right' ? handleHeartPress() : handleXPress();
      pan.setValue({ x: 0, y: 0 });
    });
  };

  const handleHeartPress = () => {
    const isSaved = savedRecipes.some((savedRecipe) => savedRecipe.recipeName === recipe.recipeName);
    if (isSaved) {
      const updatedSaved = savedRecipes.filter((savedRecipe) => savedRecipe.recipeName !== recipe.recipeName);
      setSavedRecipes(updatedSaved);
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
    }
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handleXPress = () => {
    if (currentRecipeIndex + 1 < data.length) {
      setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };

  return (
    <View style={styles.container}>
      {currentRecipeIndex < data.length - 1 ? (
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <ImageBackground source={{ uri: recipe.imageUrl }} style={styles.image}>
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}
            >
              <View style={styles.overlay}>
                <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                <Text style={styles.cookTime}>{recipe.cookTime} mins</Text>
                <View style={styles.tagsContainer}>
                  {recipe.tags.map((tag, index) => (
                    <Text key={index} style={[styles.tags, styles.tag]}>{tag}</Text>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
      ) : (
        <View style={styles.endMessageContainer}>
          <Text style={styles.endMessage}>More recipes coming soon!</Text>
        </View>
      )}
      <FlatList
        data={savedRecipes}
        renderItem={({ item }) => (
          <Text style={styles.savedRecipe}>{item.recipeName}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => handleSwipe('left')}>
          <MaterialIcons name="cancel" size={73} color="#EB6F6F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => handleSwipe('right')}>
          <AntDesign name="heart" size={70} color="#EB6F6F"/>
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
  card: {
    position: 'absolute',
    width: 375,
    height: 500,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
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
    marginTop: 10,
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
    color: '#000000',
  },
});
