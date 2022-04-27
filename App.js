/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text} from 'react-native';
import Product from './src/Components/Product';
import Login from './src/Components/Login';
import Ex1 from './src/Components/Ex1';
import SvgExample from './src/Components/UI01/SvgExample';
import Gallery from './src/Components/HomeWork/Gallery';
import AppNavigator from './src/Components/Shop/AppNavigator';
import StackNavigationExample from './src/Components/Shop/StackNavigationExample';
import Button from './src/Components/Session 09/Components/Button';
import ButtonPaper from './src/Components/Session 09/Components/Button/ButtonPaper';
import AsyncStorageEx from './src/Components/Session 09/AsyncStorageEx';
import FormikLogin from './src/Components/Session 10/FormikLogin';
import FireStoreUser from './src/Components/Session 11/FireStoreUser';
import ProductFireSore from './src/Components/Session 11/ProductFireStore';
import FireStoreQuiz from './src/Components/Session 11/FireStoreQuiz';
import StorageUploadImage from './src/Components/Session 11/StorageUExample/StorageUploadImage';
import AuthendicatorExample from './src/Components/Session 11/AuthendicatorExample';
import RemoteConfigExample from './src/Components/Session 11/RemoteConfigExample';

import OneSignalExample from './src/Components/Session 12/OneSignalExample';
// Session 13

import ReduxApp from './src/Components/Session13';

import Usecontext from './src/Components/Usecontext';
import UseReducerExample from './src/Components/UseReducerExample';
//SHOP APP
import ShopApp from './src/Components/ShopApp';
import OneSignal from 'react-native-onesignal';
const App = () => {

  React.useEffect(() => {
    OneSignal.init('5dd9ce2f-0d68-4436-96de-a4e90c42902e', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });

    OneSignal.setExternalUserId('123456');
  });

  return (
    <View style={{flex: 1}}>
      <ShopApp />
    </View>
  );
};

export default App;
