import React from 'react';
import { Provider } from 'mobx-react';
import StringStore from '../SavedRecipes'; // Correct path to where your store is defined
import Swipe from '../swipe'; // Correct path to your main component

const App = () => (
  <Provider stringStore={StringStore}>
    <Swipe/>
  </Provider>
);

export default App;