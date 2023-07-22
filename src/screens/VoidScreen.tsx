import React from 'react';
import {ScrollView} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {DWTTheme} from '../style/theme';

type Props = {
  theme?: DWTTheme;
};

const VoidScreen = (props: Props) => {
  const styles = useStyles();

  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text} type="h2">
          VoidScreen{' '}
        </Text>
        <Text style={styles.text} type="h1">
          Created for testing{' '}
        </Text>
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
  };
});

export default withTheme(VoidScreen, '');
