import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogIn, SignUp, ForgotPassword, SplashScreen} from '../../screens';
import NavHeader from '../../components/kit/NavHeader';

const Stack = createNativeStackNavigator();

const UnauthorizedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <NavHeader title="Sign Up" />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          header: () => <NavHeader title="Forgot Password" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;
