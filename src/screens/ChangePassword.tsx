import React, {useState} from 'react';
import {ScrollView, ToastAndroid, ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {makeStyles, withTheme} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {DWTTheme} from '../style/theme';
import {changePassword as changePasswordData} from '../assets/data/formData';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {changePassword} from '../api/auth';
import {Settings} from '../container';

type Props = {
  theme?: DWTTheme;
};

const ChangePassword = (props: Props) => {
  const {theme} = props;
  const styles = useStyles();
  const navigation = useNavigation();
  const {loggedInUser} = Settings.useContainer();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const changePasswordHandler = async (data: any) => {
    setLoading(true);
    await changePassword({...data, id: loggedInUser._id})
      .then(res => {
        if (res.success) {
          ToastAndroid.show(`Password has been changed successfully`, 100);
          console.log('res - change password : ', res);
          navigation.navigate('Home' as never);
        } else {
          ToastAndroid.show(`Unable to change password`, 100);
          console.log('error in changing password', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text} type="h2">
          Enter Details
        </Text>

        {changePasswordData.map(item => (
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

        {isLoading ? (
          <ActivityIndicator color={props.theme?.colors.white} />
        ) : (
          <Button
            theme={theme}
            mode="contained"
            style={styles.button}
            onPress={handleSubmit(changePasswordHandler)}>
            {`Change Password`}
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
    text: {
      padding: 8,
    },
    textinput: {
      marginVertical: 8,
    },
    button: {
      marginVertical: 4,
      borderRadius: 8,
    },
  };
});

export default withTheme(ChangePassword, '');
