import React from 'react';
import {Text, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Stacks from '../navigation/stack';
import {DWTTheme} from '../style/theme';
import {iconSize} from '../style/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VoidScreen from '../screens/VoidScreen';
import {Settings} from '../container';

const Tab = createBottomTabNavigator();

const TabBar = (props: any) => {
  const {state, descriptors, navigation} = props;
  const styles = useStyles();

  const renderIcon = (name: string, style: StyleProp<ViewStyle>) => {
    switch (name) {
      case 'Home':
        return <AntDesign name="home" style={style} />;
      case 'Phone':
        return <Ionicons name="call-outline" style={style} />;
      case 'Messages':
        return <Ionicons name="chatbox-ellipses-outline" style={style} />;
      case 'Settings':
        return <AntDesign name="setting" style={style} />;
    }
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused: boolean = state.index === index;
        const onPressIcon = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View style={styles.iconWrapper} key={route.key}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPressIcon}
              style={isFocused && styles.focusedTab}
              onLongPress={onLongPress}>
              {renderIcon(
                route.name,
                isFocused ? styles.focusedIcon : styles.icon,
              )}
              {!isFocused && (
                <Text style={styles.tabBarLabel}>{route.name}</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const BottomTab = (bottomTabProps: any) => {
  const {loggedInUser} = Settings.useContainer();
  return (
    <Tab.Navigator
      screenOptions={{lazy: false, headerShown: false}}
      tabBar={props => <TabBar {...props} theme={bottomTabProps.theme} />}>
      <Tab.Screen
        name="Home"
        component={
          loggedInUser.userType !== 'admin'
            ? Stacks.AdminHomeStack
            : Stacks.HomeStack
        }
      />
       <Tab.Screen name="Phone" component={VoidScreen} />
      <Tab.Screen name="Messages" component={VoidScreen} />
      <Tab.Screen name="Settings" component={Stacks.SettingStack} />
    </Tab.Navigator>
  );
};

const useStyles = makeStyles(theme => {
  const DIMENSION: number = 70;
  return {
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors?.popup,
    },
    iconWrapper: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
    },
    icon: {
      alignSelf: 'center',
      fontSize: iconSize.normal,
      color: theme.colors?.white,
    },
    focusedIcon: {
      alignSelf: 'center',
      fontSize: iconSize.normal,
      color:
        theme?.name === 'dark'
          ? theme.colors.primaryLight
          : theme.colors?.primaryDark,
    },
    tabBarLabel: {
      textAlign: 'center',
      color: theme.colors?.white,
    },
    focusedTab: {
      top: -18,
      justifyContent: 'center',
      height: DIMENSION,
      width: DIMENSION,
      borderRadius: DIMENSION,
      backgroundColor: theme.colors?.darkerBackground,
      shadowColor: 'transparent',
    },
  };
});

export default withTheme(BottomTab, '');
