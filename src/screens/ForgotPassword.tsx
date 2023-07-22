import React, {useState} from 'react';
import {ScrollView, ToastAndroid, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import {DWTTheme} from '../style/theme';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {forgotPassword} from '../api/auth';

type Props = {
  theme?: DWTTheme;
};

const ForgotPassword = (props: Props) => {
  const styles = useStyles();
  const {theme} = props;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'email',
      password: 'password',
    },
  });
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const loginHandler = async (data: any) => {
    setLoading(true);
    await forgotPassword(data)
      .then(res => {
        if (res.success) {
          ToastAndroid.show(`Link has been sent`, 100);
          console.log('success', res);
        } else {
          ToastAndroid.show(`Unable to send link`, 100);
          console.log('error in sending link', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => {
        setLoading(false);
        navigation.navigate('LogIn' as never);
      });
  };

  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Forgot Password</Text>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange}}) => (
            <TextInput
              label={'Email'}
              mode="flat"
              left={
                <TextInput.Icon
                  name={'email'}
                  color={props.theme.colors.primary}
                />
              }
              style={styles.textinput}
              theme={{
                colors: {
                  primary: theme.colors.primary,
                  text: theme.colors.h1,
                  placeholder: theme.colors.h3,
                  background:
                    theme?.name === 'dark'
                      ? theme.colors.darkerBackground2
                      : theme.colors.grey1Light,
                },
              }}
              onChangeText={onChange}
            />
          )}
        />
        {isLoading ? (
          <ActivityIndicator color={props.theme?.colors.white} />
        ) : (
          <Button
            theme={theme}
            mode="contained"
            style={styles.button}
            onPress={handleSubmit(loginHandler)}>
            {`Send Email`}
          </Button>
        )}
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      marginHorizontal: 16,
      marginTop: 8,
    },
    button: {
      marginVertical: 4,
      borderRadius: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: fontSize.normal,
      padding: 8,
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(ForgotPassword, '');
