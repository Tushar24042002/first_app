import React, {useEffect, useState} from 'react';
import BottomModal from '../../../component/Modal/BottomModal';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {checkLogin, loginUser, registerUser} from './LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {USER_LOGIN, USER_REGISTER} from '../../Constants/Consts';
import {validateEmail} from '../../Constants/ValidationFile';
const height = Dimensions.get('window').height;
const LoginModal = ({isLoginModal, handleLoginModal}) => {
  console.log("working")
  const [userLevel, setUserLevel] = useState(USER_LOGIN);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    setIsButtonDisabled(
      !(
        (userLevel === USER_LOGIN
          ? email && password
          : email &&
            password &&
            userName &&
            confirmPassword &&
            phone &&
            password === confirmPassword) && validateEmail(email)
      ),
    );
  }, [email, password, userName, confirmPassword]);

  const clearInputs = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
  };

  const handleClick = () => {
    if (userLevel === USER_LOGIN) {
      loginUser(email, password)
        .then(async res => {
          if (res?.error) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Registration Failed',
              textBody: res?.error,
            });
            clearInputs();
          } else if (res?.success) {
            await AsyncStorage.setItem('Authorization', res?.authToken);
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Login Success',
              // textBody: 'Registered Successfully',
            });
            handleLoginModal();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      registerUser(userName, email, password, phone)
        .then(async res => {
          if (res?.error) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Registration Failed',
              textBody: res?.error,
            });
            clearInputs();
          } else if (res?.success) {
            await AsyncStorage.setItem('Authorization', res?.authToken);
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Registered Successfully',
              // textBody: 'Registered Successfully',
            });
            handleLoginModal();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BottomModal
      title={userLevel === USER_LOGIN ? 'Login' : 'Register'}
      isVisible={isLoginModal}
      onClose={handleLoginModal}>
      <SafeAreaView style={{width: '100%', padding: 10}}>
        <ScrollView
          style={{
            maxHeight: isKeyboardVisible
              ? userLevel === USER_REGISTER
                ? height - keyboardHeight - 100
                : 250
              : 'auto',
          }}>
          {userLevel === USER_REGISTER && (
            <TextInput
              style={styles.input}
              onChangeText={setUserName}
              value={userName}
              placeholder="Enter Username"
              keyboardType="default"
            />
          )}
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Email"
            keyboardType="email-address"
          />
          {userLevel === USER_REGISTER && (
            <TextInput
              style={styles.input}
              onChangeText={setPhone}
              value={phone}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
            />
          )}
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            secureTextEntry
          />

          {userLevel === USER_REGISTER && (
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
          )}
          <View style={{paddingHorizontal: 10}}>
            <TouchableOpacity
              style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
              onPress={handleClick}
              disabled={isButtonDisabled}>
              <Text style={styles.buttonText}>
                {userLevel === USER_LOGIN ? 'Login' : 'Register'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {userLevel === USER_LOGIN ? (
            <View style={styles.linkContainer}>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => setUserLevel(USER_REGISTER)}>
                <Text style={styles.linkButtonText}>No account - Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkButtonText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setUserLevel(USER_LOGIN)}>
              <Text style={[styles.linkButtonText, {textAlign: 'center'}]}>
                Already Have Account ? - Login
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  linkButton: {
    padding: 10,
  },
  linkButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginModal;
