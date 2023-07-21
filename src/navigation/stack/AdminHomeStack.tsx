import React from 'react';
import {Dimensions} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdminHome, EditUser} from '../../screens';
import NavHeader from '../../components/kit/NavHeader';
import DeleteModal from '../../components/kit/modal/DeleteModal';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {height} = Dimensions.get('window');
  const modalOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: 'transparent'},
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({current: {progress}}) => ({
      cardStyle: {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1.5 * height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: 'clamp',
        }),
      },
    }),
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHomeScreen"
        component={AdminHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUser}
        options={{
          header: props => (
            <NavHeader
              title={`Edit ${props.route.params?.user.name}'s Profile`}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DeleteModal"
        options={modalOptions}
        component={DeleteModal}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
