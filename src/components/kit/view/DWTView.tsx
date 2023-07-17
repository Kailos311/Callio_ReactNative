import React from 'react';
import {
  KeyboardAvoidingView,
  StyleProp,
  ViewProps,
  ViewStyle,
  Platform,
  View,
} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';
import {useHeaderHeight} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatusBar from '../StatusBar';

type DWTViewProps = ViewProps & {
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

const DWTView: React.FC<DWTViewProps> = props => {
  const headerHeight = useHeaderHeight();
  const {padded} = props;
  const styles = useStyles(props);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right']}>
      <KeyboardAvoidingView
        style={[styles.keyboardContainer, padded && styles.paddedContainer]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight} // Offset the header/statusbar
      >
        <StatusBar />
        <View style={props.style}>{props.children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    safeContainer: {
      flex: 1,
      backgroundColor: theme.colors?.background,
    },
    paddedContainer: {
      padding: 12,
    },
    keyboardContainer: {
      flex: 1,
      width: '100%',
    },
  };
});

export default withTheme(DWTView, '');
