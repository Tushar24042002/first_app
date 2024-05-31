// App.js
import React, { useState } from 'react';
import Router from './Router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Context } from './component/Contexts/Context';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

import AppUpdate from './src/AppUpdate/AppUpdate';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    // <Provider store={store}>
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
    // </Provider>
  );
};

export default App;
