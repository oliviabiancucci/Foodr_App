// entry file for expo-router

import { router } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';

export default Layout = () => {

  if (process.env.NODE_ENV === 'development' ) {
    useEffect(() => {
      // change shown page for development purposes
      router.navigate('recipe/5');
    })
  }

 return (
   <Stack>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
   </Stack>
 );
}
