import React from 'react';
import { Provider } from 'mobx-react';
import StringStore from '../SavedRecipes'; 
import Swipe from '../swipe'; 

const App = () => (
  <Provider stringStore={StringStore}>
    <Swipe/>
  </Provider>
);

export default App;