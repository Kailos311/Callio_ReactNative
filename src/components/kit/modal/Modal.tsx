import React, {ReactNode, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  BackHandler,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

type Props = {
  children?: ReactNode;
  type: 'shutter' | 'popup';
  containerStyle?: StyleProp<ViewStyle>;
};

const Modal: React.FC<Props> = props => {
  const styles = useStyles(props);
  const {children, containerStyle} = props;
  const anim: Animated.Value = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const backButtonHandler = () => {
    modalClose();
    return true;
  };

  const modalOpen = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  };
  const modalClose = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
    BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
  };
  useEffect(() => {
    modalOpen();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={modalClose} style={styles.pressableBackground} />
      <View style={[styles.childContainer, containerStyle]}>{children}</View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  const isPopUp: boolean = props.type === 'popup';
  return {
    mainContainer: {
      width: '100%',
      height: '100%',
      justifyContent: isPopUp ? 'center' : 'flex-end',
      position: 'absolute',
      alignItems: 'center',
      backgroundColor: theme.colors.darkerBackground2,
    },
    pressableBackground: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
    },
    childContainer: {
      width: isPopUp ? '90%' : '100%',
      position: 'absolute',
      elevation: 24,
      padding: 16,
      backgroundColor: theme.colors?.darkerBackground,
      alignItems: 'center',
      borderRadius: 8,
    },
  };
});
export default withTheme(Modal, '');
