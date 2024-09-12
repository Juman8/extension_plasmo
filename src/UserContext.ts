import React from 'react';

const MyContext = React.createContext({
  dataUser: null,
  setUserData: (data: unknown) => {},
});

export default MyContext;
