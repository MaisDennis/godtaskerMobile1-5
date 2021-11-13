import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';
// -----------------------------------------------------------------------------
import App from './App';
// -----------------------------------------------------------------------------
export default function Index() {

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
            barStyle="light-content"
            backgroundColor="#000"
            // barStyle="default"
          />
          <App

          />
        </PersistGate>
      </Provider>
    </>
  );
}
