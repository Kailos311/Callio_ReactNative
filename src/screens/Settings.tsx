import React, {useMemo} from 'react';
import {FlatList, Switch, TouchableOpacity, View} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../components/kit/avatar/Avatar';
import Text from '../components/kit/text/Text';
import {iconSize} from '../style/constants';
import SettingItem from '../components/settings/SettingItem';
import {DWTTheme} from '../style/theme';
import {Settings as SettingsContainer} from '../container';
import DWTView from '../components/kit/view/DWTView';

type Props = {
  theme: DWTTheme;
};

const Settings = (props: Props) => {
  const styles = useStyles();
  const {
    theme,
    saveTheme,
    loggedInUser,
    clearLoggedInUser,
    clearLoggedInUserToken,
  } = SettingsContainer.useContainer();
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const toggleSwitch = async () => {
    await saveTheme(isDarkMode ? 'light' : 'dark');
  };

  const logoutHandler = async () => {
    await clearLoggedInUser();
    await clearLoggedInUserToken();
  };
  const navigation = useNavigation();

  const data = [
    {
      id: 100,
      title: 'General',
      subData: [
        {
          id: 101,
          title: 'Dark Mode',
          icon: <Ionicons name="moon" style={styles.icon} />,
          rightContainer: (
            <Switch
              trackColor={{
                false: props.theme.colors.grey3,
                true: props.theme.colors.primary,
              }}
              thumbColor={
                isDarkMode
                  ? props.theme.colors.primaryDark
                  : props.theme.colors.white
              }
              ios_backgroundColor={props.theme.colors.grey3}
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          ),
        },
        {
          id: 102,
          title: 'Language',
          icon: <Ionicons name="language" style={styles.icon} />,
          rightContainer: <Text type="h4">English (India)</Text>,
        },
      ],
    },
    {
      id: 200,
      title: 'Specific',
      subData: [
        {
          id: 201,
          title: 'About',
          icon: <AntIcon name="profile" style={styles.icon} />,
        },
        {
          id: 202,
          title: 'Change Password',
          icon: <MCIcon name="lastpass" style={styles.icon} />,
          onPress: () => navigation.navigate('ChangePassword' as never),
        },
        {
          id: 202,
          title: 'Log Out',
          onPress: () => logoutHandler(),
          icon: <AntIcon name="logout" style={styles.icon} />,
        },
      ],
    },
  ];
  return (
    <DWTView style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        data={data}
        ListHeaderComponent={
          <>
            <Avatar size="large" source={{uri: 'https://picsum.photos/200'}} />
            <Text style={styles.versionText} type="h4">
              V.1.0.2
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProfile' as never)}>
              <View style={styles.profileContainer}>
                <Avatar
                  size="normal"
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                  }}
                  containerStyle={styles.avatarContainer}
                />

                <View style={styles.userDetailsContainer}>
                  <Text type="h1" weight="bold">
                    {loggedInUser.name}
                  </Text>
                  <Text type="h4">edit, update profile</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        }
        renderItem={({item}) => <SettingItem item={item} />}
      />
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors?.background,
    },
    versionText: {
      textAlign: 'center',
      marginVertical: 16,
    },
    icon: {
      fontSize: iconSize.small,
      color: theme.colors.grey4,
    },
    profileContainer: {
      backgroundColor: theme.colors.darkerBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 4,
      marginHorizontal: 16,
      marginVertical: 6,
      flexDirection: 'row',
    },
    avatarContainer: {
      margin: 5,
    },
    userDetailsContainer: {
      justifyContent: 'space-evenly',
      margin: 8,
    },
  };
});

export default withTheme(Settings, '');
