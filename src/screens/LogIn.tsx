import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {withTheme, makeStyles} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {useForm, Controller} from 'react-hook-form';
import {DWTTheme} from '../style/theme';
import {loginFormData} from '../assets/data/formData';
import {getUserById, login} from '../api/auth';
import Settings from '../container/Settings';
import PopupContainer from './PopupContainer';
import Text from '../components/kit/text/Text';


type Props = {
  theme?: DWTTheme;
};

interface FormValues {
  email: string;
  password: string;
}

const LogIn = (props: Props) => {
  const {theme} = props;
  const navigation = useNavigation();
  const styles = useStyles();
  const [isLoading, setLoading] = useState<boolean>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      email: 'email',
      password: 'password',
    },
  });
  const {saveLoggedInUserToken, saveLoggedInUser} = Settings.useContainer();
  const loginHandler = async (data: any) => {
    setLoading(true);
    await login(data)
      .then(async res => {
        if (res.success && res.name && res.id) {
          await getUserById({id: res.id})
            .then(async res => {
              if (res) {
                await saveLoggedInUser(res.name);
              } else {
                console.log('error1', res);
              }
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {});

          await saveLoggedInUserToken(res.access_token);
          ToastAndroid.show(`Login Successful`, 100);
          console.log('success', res);
        } else {
          ToastAndroid.show(`Login Failed`, 100);
          console.log('error in login', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

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
        <Text color="white" size="jumboXPlus" weight="bold">
          Welcome!
        </Text>
       </View>
      }
      popupComponent={
        <>
          {loginFormData.map(item => (
            <Controller
              key={item.name}
              name={item.name}
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange}}) => (
                <>
                  <TextInput
                    label={item.title}
                    mode="flat"
                    left={
                      <TextInput.Icon
                        name={item.iconName}
                        color={theme.colors.grey5}
                      />
                    }
                    style={styles.textinput}
                    onChangeText={onChange}
                    activeOutlineColor={theme.colors.grey5}
                    outlineColor={theme.colors.grey5}
                    underlineColor={theme.colors.grey5}
                    selectionColor={theme.colors.grey5}
                    activeUnderlineColor={theme.colors.grey5}
                    placeholderTextColor={theme.colors.error}
                  />
                </>
              )}
            />
          ))}
          <TouchableOpacity>
            <Text
              style={styles.forgotPasswordText}
              onPress={() => navigation.navigate('ForgotPassword' as never)}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            {isLoading ? (
              <ActivityIndicator color={props.theme.colors.popbuttonDark} />
            ) : (
              <>
                <Button
                  theme={theme}
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit(loginHandler)}>
                  {`Log In`}
                </Button>
               
              </>
            )}
          </View>
        </>
      }
    />
  );
};

const useStyles = makeStyles(() => {
     const IMAGE_DIMENSIONS = 250;

  return {
    imageContainer: {
      flex: 2,
      justifyContent: 'flex-start',
    },
    image: {
      width: IMAGE_DIMENSIONS,
      height: IMAGE_DIMENSIONS,
    },
    textinput: {
      marginVertical: 8,
    },
    forgotPasswordText: {
      marginVertical: 8,
      alignSelf: 'center',
    },
    button: {
      marginVertical: 4,
      borderRadius: 8,

    },
    button1: {
      marginVertical: 4,
      borderRadius: 8,

    },
  };
});

export default withTheme(LogIn, '');
