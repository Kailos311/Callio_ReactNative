import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {DWTTheme} from '../style/theme';
import Text from '../components/kit/text/Text';
import {iconSize} from '../style/constants';
import {useNavigation} from '@react-navigation/native';
import PopupContainer from './PopupContainer';

type Props = {
  theme?: DWTTheme;
};
const SplashScreen = (props: Props) => {
  const styles = useStyles();
  const {theme} = props;
  const navigation = useNavigation();

  return (
    <PopupContainer
      headerComponent={
        <View style={styles.imageContainer}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../assets/images/logo.png')}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
      }
      popupComponent={
        <>
          <Text style={styles.textTitle}>Stay connected with everyone!</Text>
          <Text style={styles.textDetail}>Sign in with account</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LogIn' as never)}>
              <LinearGradient
                colors={[theme.colors.popbuttonLight, theme.colors.popbuttonDark]}
                style={styles.button}>
                <Text color="white" weight="bold">
                  Get Started
                </Text>
                <MIcons
                  name="navigate-next"
                  color={theme.colors.white}
                  size={iconSize.normal}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      }
    />
  );
};

const useStyles = makeStyles(theme => {
  const IMAGE_DIMENSIONS = 250;
  return {
    imageContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: IMAGE_DIMENSIONS,
      height: IMAGE_DIMENSIONS,
    },
    textTitle: {
      color: theme.colors.secondary,
      fontSize: 30,
      fontWeight: 'bold',
    },
    textDetail: {
      color: theme.colors.grey4,
      marginVertical: 5,
    },
    buttonContainer: {
      alignItems: 'flex-end',
      marginVertical: 30,
    },
    button: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
    },
  };
});

export default withTheme(SplashScreen, '');
