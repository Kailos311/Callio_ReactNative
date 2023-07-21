import React, {useMemo, useState, useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme} from '../style/theme';
import {Settings} from '../container';
import Root from './Root';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = () => {
  const {theme} = Settings.useContainer();
  const darkMode = useMemo(() => theme === 'dark', [theme]);
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <ThemeProvider
        theme={darkMode ? darkTheme : lightTheme}
        useDark={darkMode}>
        <Root />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
