import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import themeSlice from './themeSlice';
import campanhaSlice from './campanhaSlice';
import resultadoSlice from './resultadoSlice';
import pontuacaoSlice from './pontuacaoSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['campanha','pontuacao','result'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedThemeReducer = persistReducer(persistConfig, themeSlice);

const store = configureStore({
  reducer: {
    campanha: campanhaSlice,
    pontuacao: pontuacaoSlice,
    result: resultadoSlice,
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
