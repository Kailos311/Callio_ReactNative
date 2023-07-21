import React from 'react';
import UnauthorizedStack from '../navigation/stack/UnauthorizedStack';
import BottomTab from '../navigation/BottomTab';
import Settings from '../container/Settings';

const Root = () => {
  const {loggedInUser} = Settings.useContainer();

  return loggedInUser ? <BottomTab /> : <UnauthorizedStack />;
};

export default Root;
