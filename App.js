// App.js
import React, { useState, useEffect } from 'react';
import Router from './Router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Context, useAppContext } from './component/Contexts/Context';
import NotificationHandler from './src/notificationHandler/NotificationHandler';
import { Provider } from 'react-redux';
import AppUpdate from './src/AppUpdate/AppUpdate';
import store from './src/Redux/store';
import SplashScreen from 'react-native-splash-screen';
import fetchingManager from './src/Api/FetchingManager';
import { ActivityIndicator } from 'react-native';
import LoadingScreen from './component/Loader/LoadingScreen';

const App = () => {
const [ isLoading , setIsLoading ] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    SplashScreen.hide();
    NotificationHandler.requestUserPermission();
    NotificationHandler.notificationListener();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
        if (fetchingManager.isFetching()) {
          setIsLoading(true);
        } else {
           setIsLoading(false);
        }
    }, 1000);
  
    return () => clearInterval(interval);
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
          <LoadingScreen visible={isLoading}/>
          {/* <AppUpdate isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> */}
          <Router setIsLoading={setIsLoading} />
        </Context>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
     </Provider>
  );
};

export default App;
