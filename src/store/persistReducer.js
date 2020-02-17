import {AsyncStorage} from 'react-native'; //sempre o storage nativo
import { persistReducer } from 'redux-persist';

export default reducers => {
    
    const persitedReducer = persistReducer(
        {
            key: 'gobarber',
            storage: AsyncStorage,
            whitelist: ['auth', 'user'],
        },
        reducers
    );
    
    return persitedReducer;
}