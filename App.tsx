import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';

import { SafeArea } from './src/components/safe-area.component';
import { Routes } from './src/routes';
import { Provider } from 'react-redux';
import { StoreProvider } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';


// * Calling method globally to avoid delay (recomended)
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
    RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('./src/assets/fonts/Roboto-Bold.ttf'),

    InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
  });

  // load resources async

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve: any) => setTimeout(resolve, 3000))
      } catch (error) {
        console.log(error)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeArea>
        <StoreProvider>
          <PaperProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}  >
              <Routes />
            </View>
          </PaperProvider>
        </StoreProvider>
      </SafeArea>
    </GestureHandlerRootView>
  );
}

