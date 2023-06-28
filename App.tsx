import React, { useCallback, useMemo, useState } from 'react';
import { darkTheme, defaultTheme } from './src/theme/Theme';
import { PreferencesContext } from './src/contexts/ThemeContext';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? darkTheme : defaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <AuthProvider>
            <Routes/>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default App;
