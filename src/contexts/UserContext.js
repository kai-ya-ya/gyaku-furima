// contexts/UserContext.js
import React, { createContext, useContext } from 'react';
import { useUserData } from '../hooks/useUserData'; // 作成したカスタムフック

const UserContext = createContext();

export function UserProvider({ children }) {
  const { userData, loading, error } = useUserData(); // 🔥ここで一度だけuseUserDataが実行され、データが取得される

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() { // 🔥useContextを使って、Providerが提供するデータを取得
  return useContext(UserContext);
}