import React, {useCallback, useEffect} from 'react';
import {
  View,
  BackHandler,
  NativeEventSubscription,
  TouchableWithoutFeedback,
} from 'react-native';
import {makeStyles, useTheme, withTheme} from 'react-native-elements';
import {IconNode} from 'react-native-elements/dist/icons/Icon';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DWTTheme} from '../../style/theme';
import StatusBar from '../kit/StatusBar';
import {iconSize} from '../../style/constants';
import Text from './text/Text';

type Props = {
  theme?: DWTTheme;
  onBackPress?: () => void;
  title: string;
  rightIcon?: IconNode;
  backgroundColor?: string;
  textColor?: string;
  hideBack?: boolean;
};

const NavHeader = (props: Props) => {
  const navigation = useNavigation();
  const {theme} = props;
  const defaultbackHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      props.onBackPress ? props.onBackPress() : defaultbackHandler();
      return true;
    };
    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [defaultbackHandler, props]);

  const styles = useStyles(props);
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <StatusBar />
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={props.onBackPress ?? defaultbackHandler}>
          <View style={styles.leftContainer}>
            {!props.hideBack && (
              <Icon
                name="chevron-left"
                size={iconSize.large}
                color={props.textColor ?? theme?.colors?.h2}
                style={styles.leftIcon}
              />
            )}
            <Text weight="bold" type="h2">
              {props.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightIconContainer}>{props.rightIcon}</View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: props.backgroundColor ?? theme.colors?.background,
    },
    leftContainer: {
      flex: 1,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {
      paddingHorizontal: 8,
    },
    rightIconContainer: {
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  };
});

export default withTheme(NavHeader, '');
