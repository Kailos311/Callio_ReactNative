import React from 'react';
import {makeStyles, withTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Modal from '../modal/Modal';
import {DWTTheme} from '../../../style/theme';
import Text from '../text/Text';

type Props = {
  theme: DWTTheme;
};

const DeleteModal = (props: Props) => {
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <Modal>
      <Text color="h5">{`Are you sure ? `}</Text>

      <View style={styles.buttonContainer}>
        <Button
          theme={props.theme}
          compact
          style={styles.buttonStyle}
          onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button
          theme={props.theme}
          mode="contained"
          compact
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('DeleteModal' as never)}>
          Delete
        </Button>
      </View>
    </Modal>
  );
};

const useStyles = makeStyles(() => {
  return {
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    buttonStyle: {
      marginHorizontal: 16,
    },
  };
});

export default withTheme(DeleteModal, '');
