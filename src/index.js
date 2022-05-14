import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import messaging from '@react-native-firebase/messaging';
import { useTranslation } from 'react-i18next';
// -----------------------------------------------------------------------------
import App from './App';
import Button from '~/components/Button'
// -----------------------------------------------------------------------------
export default function Index() {
  const {t, i18n} = useTranslation();
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  AppRegistry.registerComponent('app', () => App);

  // -----------------------------------------------------------------------------
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#000"
            // barStyle="default"
          />
          <App/>
        </PersistGate>
      </Provider>
    </>
  );
}
