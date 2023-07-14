import React from 'react';
import {View, Image, StyleProp, ViewStyle} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';

type Props = {
  size?: 'small' | 'normal' | 'large';
  source: any;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
};
const Avatar = (props: Props) => {
  const styles = useStyles(props);
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={[styles.imageContainer, props.imageContainerStyle]}>
        <Image source={props.source} style={styles.image}></Image>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  let DIMENSION: number;

  switch (props.size) {
    case 'small':
      DIMENSION = 40;
      break;
    case 'normal':
      DIMENSION = 60;
      break;
    case 'large':
      DIMENSION = 100;
      break;
    default:
      DIMENSION = 100;
      break;
  }

  return {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: DIMENSION,
      width: DIMENSION,
      borderRadius: DIMENSION,
      overflow: 'hidden',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    image: {
      height: DIMENSION,
      width: DIMENSION,
    },
  };
});

export default withTheme(Avatar, '');
