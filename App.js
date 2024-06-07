// App.js
import React, { useState, useEffect } from 'react';
import Router from './Router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Context } from './component/Contexts/Context';
import NotificationHandler from './src/notificationHandler/NotificationHandler';
import { Provider } from 'react-redux';
import AppUpdate from './src/AppUpdate/AppUpdate';
import store from './src/Redux/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    SplashScreen.hide();
    NotificationHandler.requestUserPermission();
    NotificationHandler.notificationListener();
  }, []);

  return (
    <Provider store={store}>
    <AlertNotificationRoot style={{
      position: 'absolute',
      zIndex: 9999099999,
      elevation: 999999999999999,
    }}>
      <GestureHandlerRootView>
        <Context>
          {/* <AppUpdate isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> */}
          <Router />
        </Context>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
     </Provider>
  );
};

export default App;
