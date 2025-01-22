import { Stack } from 'expo-router';
import React, { useState } from 'react';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack>
      {
      // !isAuthenticated ? (
      //   <Stack.Screen
      //     name="/index"
      //     options={{ headerShown: false }}
      //     initialParams={{
      //       onLogin: () => setIsAuthenticated(true),
      //     }}
      //   />
      // ) : (
      //   <>
      //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      //     <Stack.Screen name="+not-found" />
      //   </>
      // )
      }
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
