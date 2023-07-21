import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePassword from '../../screens/ChangePassword';
import NavHeader from '../../components/kit/NavHeader';
import {Settings, MyProfile} from '../../screens';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          header: () => <NavHeader title="My Profile" />,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          header: () => <NavHeader title="Change Password" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
