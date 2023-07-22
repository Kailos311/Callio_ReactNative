import React from 'react';
import {View} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {DWTTheme} from '../style/theme';

type Props = {
  theme?: DWTTheme;
  headerComponent?: any;
  popupComponent?: any;
};
const PopupContainer = (props: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>{props.headerComponent}</View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        {props.popupComponent}
      </Animatable.View>
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const IMAGE_DIMENSIONS = 220;
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.popup,
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
  };
});

export default withTheme(PopupContainer, '');
