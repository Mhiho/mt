import React, { createContext, useState } from 'react';
import { getAvatar } from '../services/auth';

const defaultState = {
  userAvatar: getAvatar(),
};

export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  const [ctxUserAvatar, setCtxUserAvatar] = useState(defaultState.userAvatar);
  return (
    <ThemeContext.Provider value={{ ctxUserAvatar, setCtxUserAvatar }}>
      {children}
    </ThemeContext.Provider>
  );
};
