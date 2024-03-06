import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CookBook from './CookBook';
import Main from './Main';

import { registerRootComponent } from 'expo';
import Recipe from './recipe';

// TODO: temp data import
import { recipes as cookbook } from './recipe_list.json';

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navBarTitle}>Foodr</Text>
      </View>
      <Main recipe={cookbook[0]} />
      <StatusBar style="auto" />
    </View>
  );
}

export default registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    width: '100%',
    height: 80,
    backgroundColor: '#EB6F6F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
