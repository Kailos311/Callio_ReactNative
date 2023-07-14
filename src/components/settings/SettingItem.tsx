import React from 'react';
import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import Text from '../kit/text/Text';

type Props = {
  item: any;
};

const Section = (props: Props) => {
  const styles = useStyles(props);
  const {item} = props;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        data={item.subData}
        ListHeaderComponent={
          <Text color="h3" style={styles.listHeaderText}>
            {item.title}
          </Text>
        }
        renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={item.onPress}>
            <View style={styles.flatListContainer}>
              <View style={styles.left}>
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  type="h3"
                  color="h3"
                  style={styles.subItemTitle}>
                  {item.title}
                </Text>
              </View>
              {item.rightContainer && <View>{item.rightContainer}</View>}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      backgroundColor: theme.colors.darkerBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 4,
      marginHorizontal: 16,
      marginVertical: 6,
    },
    listHeaderText: {
      paddingTop: 8,
    },
    flatListContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
      marginVertical: 6,
      justifyContent: 'space-between',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrapper: {
      padding: 8,
      borderRadius: 8,
      marginRight: 8,
    },
    subItemTitle: {
      textAlign: 'center',
    },
  };
});

export default withTheme(Section, '');
