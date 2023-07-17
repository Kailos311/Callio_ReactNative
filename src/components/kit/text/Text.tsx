import React from 'react';
import {makeStyles, withTheme} from 'react-native-elements';
import {Text as RNText, TextProps} from 'react-native';
import {fontSize} from '../../../style/constants';

type Props = TextProps & {
  size?:
    | 'extraSmall'
    | 'small'
    | 'normal'
    | 'large'
    | 'extraLarge'
    | 'jumbo'
    | 'jumboPlus'
    | 'jumboXPlus';
  fontStyle?: 'normal' | 'italic';
  weight?: 'thinnest' | 'thinner' | 'normal' | 'bold' | 'extraBold';
  color?:
    | 'white'
    | 'dark'
    | 'success'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5';

  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
};

const Text = (props: Props) => {
  const styles = useStyles(props);
  return <RNText {...props} style={[styles.textStyle, props.style]} />;
};

const useStyles = makeStyles((theme, props: Props) => {
  let fontWeight: any;
  let customFontSize: any;
  let customFontColor: any;

  switch (props.type) {
    case 'h1':
      customFontSize = fontSize.extraLarge;
      customFontColor = theme.colors.h1;
      break;
    case 'h2':
      customFontSize = fontSize.large;
      customFontColor = theme.colors.h2;
      break;
    case 'h3':
      customFontSize = fontSize.normal;
      customFontColor = theme.colors.h3;
      break;
    case 'h4':
      customFontSize = fontSize.small;
      customFontColor = theme.colors.h4;
      break;
    case 'h5':
      customFontSize = fontSize.extraSmall;
      customFontColor = theme.colors.h5;
      break;
  }
  switch (props.weight) {
    case 'thinnest':
      fontWeight = '100';
      break;
    case 'thinner':
      fontWeight = '300';
      break;
    case 'normal':
      fontWeight = '400';
      break;
    case 'bold':
      fontWeight = '500';
      break;
    case 'extraBold':
      fontWeight = '900';
      break;
    default:
      fontWeight = '400';
      break;
  }
  if (props.color) {
    customFontColor = theme.colors[`${props.color}`];
  }
  if (props.size) {
    customFontSize = fontSize[`${props.size}`];
  }
  return {
    textStyle: {
      color: customFontColor,
      fontSize: customFontSize,
      fontStyle: props.fontStyle ?? 'normal',
      fontWeight: fontWeight,
    },
  };
});

export default withTheme(Text, '');
