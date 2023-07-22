import React, {useState} from 'react';
import {ScrollView, ToastAndroid, View, ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {makeStyles, withTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {fontSize} from '../style/constants';
import {DWTTheme} from '../style/theme';
import {signupFormData} from '../assets/data/formData';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {create} from '../api/auth';

type Props = {
  theme?: DWTTheme;
};

const SignUp = (props: Props) => {
  const styles = useStyles();
  const {theme} = props;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const signupHandler = async (data: any) => {
    setLoading(true);
    await create(data)
      .then(res => {
        if (res) {
          ToastAndroid.show(`SignUp Successful`, 100);
          console.log('success', res);
        } else {
          ToastAndroid.show(`SignUp Failed`, 100);
          console.log('error in signup', res);
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
        <Text style={styles.text}>Enter Details</Text>

        {signupFormData.map(item => (
          <Controller
            key={item.id}
            name={item.name}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <TextInput
                label={item.title}
                mode="flat"
                style={styles.textinput}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    text: theme.colors.h1,
                    placeholder: theme.colors.h3,
                    background:
                      theme?.name === 'dark'
                        ? theme.colors.darkerBackground2
                        : theme.colors.grey0,
                  },
                }}
                onChangeText={onChange}
              />
            )}
          />
        ))}
        <Text style={styles.forgotAcText} type="h4">
          Already have an account ?
          <Text onPress={() => navigation.navigate('LogIn' as never)}>
            {' Log In '}
          </Text>
        </Text>

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator color={props.theme?.colors.white} />
          ) : (
            <Button
              theme={props.theme}
              mode="contained"
              style={styles.button}
              onPress={handleSubmit(signupHandler)}>
              Create Account
            </Button>
          )}
        </View>
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    button: {
      marginBottom: 32,
      borderRadius: 8,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: fontSize.normal,
      padding: 8,
    },
    forgotAcText: {
      textAlign: 'center',
      marginVertical: 16,
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(SignUp, '');
