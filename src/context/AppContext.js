import React from 'react';

const AppContext = React.createContext({
    isDrawerOpen: true,
    toggleOpen: () => {
    },
});
export default AppContext;