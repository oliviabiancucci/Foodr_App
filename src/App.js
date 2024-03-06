import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { registerRootComponent } from 'expo';
import Recipe from './recipe';

// TODO: temp data import
import {recipes as cookbook} from './recipe_list.json';

function App() {
  return (
    <View style={styles.container}>
      <Recipe recipe={cookbook[0]}/>
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
});
