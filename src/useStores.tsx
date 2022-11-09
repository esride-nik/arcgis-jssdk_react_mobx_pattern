import * as React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './Stores';

export function useStores(): IStores {
    return React.useContext(MobXProviderContext) as IStores;
}
