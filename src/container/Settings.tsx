import {useEffect, useState, useCallback} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {createContainer} from 'unstated-next';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {asyncStorageKeys} from '../style/constants';
import {User} from '../types/auth';

function useSettings() {
  const deviceTheme: ColorSchemeName = useColorScheme();
  const [theme, saveTheme, getTheme] = useAsyncStorage<'light' | 'dark'>(
    asyncStorageKeys.theme,
  );
  const [loggedInUser, saveLoggedInUser, getLoggedInUser, clearLoggedInUser] =
    useAsyncStorage<User>(asyncStorageKeys.loggedInUser);

  const [
    loggedInUserToken,
    saveLoggedInUserToken,
    getLoggedInUserToken,
    clearLoggedInUserToken,
  ] = useAsyncStorage<string>(asyncStorageKeys.loggedInUserToken);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setDefaultTheme = useCallback(() => {
    saveTheme(deviceTheme === 'dark' ? 'dark' : 'light');
  }, [saveTheme, deviceTheme]);

  useEffect(() => {
    getTheme();
    setDefaultTheme();
  }, []);

  useEffect(() => {
    getLoggedInUser();
    getLoggedInUserToken();
  }, []);

  return {
    theme,
    isLoading,
    loggedInUser,
    loggedInUserToken,
    clearLoggedInUser,
    clearLoggedInUserToken,
    saveLoggedInUser,
    saveLoggedInUserToken,
    saveTheme,
    setIsLoading,
  };
}

const Settings = createContainer(useSettings);
export default Settings;
