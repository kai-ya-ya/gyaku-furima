// contexts/UserContext.js
import React, { createContext, useContext } from 'react';
import { useUserData } from '../hooks/useUserData';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { userData, loading, error } = useUserData(); // 🔥ここで一度だけuseUserDataが実行され、データが取得される

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}