import {StyleProp, TextStyle} from 'react-native';

type RecursivePartial<T> = {[P in keyof T]?: RecursivePartial<T[P]>};

declare module 'react-native-elements/dist/config/colors' {
  export interface TextProps {
    p1Style: StyleProp<TextStyle>;
  }

  export interface Colors {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;
    info: string;
    background: string;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
    text: Partial<TextProps>;
  }
}
