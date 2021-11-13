import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
// -----------------------------------------------------------------------------
import Routes from './routes';
import api from '~/services/api';
// -----------------------------------------------------------------------------
export default function App() {
  const userId = useSelector( state => state.user.profile ? state.user.profile.id : null)
  const workerId = useSelector( state => state.worker.profile ? state.worker.profile.id : null)
  const[test, setTest] = useState();
  // console.log('worker Id: ', workerId)
  let fcmUnsubscribe = null;

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message is handled in the background!', remoteMessage);
  // })

  useEffect(() => {
    SplashScreen.hide();
    // requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    // console.log('Hello', authStatus)
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('Token: ', token)
      setTest(token)
    }

    messaging().onTokenRefresh(async token => {
      console.log('messaging.onTokenRefresh: ', token)
      await api.put(`users/${userId}/notifications`, {
        notification_token: token,
        worker_id: workerId,
      })
    });

    fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new message arrived!', remoteMessage)
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.onTokenRefresh.body,
      )
    })

    // messaging()
    //   .onNotificationOpenedApp(remoteMessage => {
    //     console.log('Notification caused app to open from background state: '
    //       , remoteMessage
    //     )
    //   })

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if(remoteMessage) {
    //       console.log('Notification caused app to open from quit state: '
    //         , remoteMessage
    //       )
    //     }
    //   })
  }
  // ---------------------------------------------------------------------------
  return (
    <>
    {/* <View>
      <Text style={{color: '#fff'}}>{test}</Text>
    </View> */}
    <Routes />
  </>
  );
}
