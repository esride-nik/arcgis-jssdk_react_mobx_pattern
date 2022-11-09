/* eslint-disable react/function-component-definition */
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Stores } from './Stores';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const stores = Stores.getInstance();
    return <Provider {...stores}>{children}</Provider>;
};
