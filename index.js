/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import notificationHandler from './src/notificationHandler/NotificationHandler';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    notificationHandler.showNotification(
      'default-channel-id',
      remoteMessage.notification.title,
      remoteMessage.notification.body
    );
  });
  

AppRegistry.registerComponent(appName, () => App);
