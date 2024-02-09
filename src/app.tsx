import React, { ReactNode, Suspense, useState } from 'react';
import { StyleSheet, UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider as RNKeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { isIos, useDidMount } from '@common';
import { PortalProvider } from '@gorhom/portal';
import { AppContainer } from '@navigation/app-navigation';
import { APIProvider } from '@networking';
import { store } from '@store/store';
import I18n from '@utils/i18n/i18n';

// const json = require('./app/assets/vector-icon/selection.json');
// const key = json.icons.reduce((pv, curr) => {
//   pv[(curr.properties.name as string).replaceAll('-', '_')] =
//     curr.properties.name;
//   return pv;
// }, {});
// console.log(
//   Object.entries(key)
//     .sort(([, a], [, b]) => a - b)
//     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}),
// );

if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const KeyboardProvider = ({ children }: { children?: ReactNode }) => {
  // state
  const [loading, setLoading] = useState<boolean>(true);

  // effect
  useDidMount(() => {
    queueMicrotask(() => {
      setLoading(false);
    });
  });

  // render
  return (
    <>
      {loading ? null : (
        <RNKeyboardProvider navigationBarTranslucent statusBarTranslucent>
          {children}
        </RNKeyboardProvider>
      )}
    </>
  );
};

export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <APIProvider>
          <Provider store={store}>
            <I18nextProvider i18n={I18n}>
              <Suspense fallback={null}>
                <PortalProvider>
                  <GestureHandlerRootView style={styles.root}>
                    <AppContainer />
                  </GestureHandlerRootView>
                </PortalProvider>
              </Suspense>
            </I18nextProvider>
          </Provider>
        </APIProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};
