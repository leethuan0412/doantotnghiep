/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../components/logo.jpg')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}>Thuan Mart</Text>
        <Text style={styles.title3}>Uy tín,chất lượng tạo nên thương hiệu</Text>
      </View>
      <Animatable.View
        style={[styles.footer, {backgroundColor: '#fff'}]}
        animation="fadeInUpBig">
        <View style={styles.views}>
          <View style={styles.views2}>
            <Text style={styles.title2}>Mua và Bán</Text>
            <Text style={styles.text}>Đăng Nhập</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Bắt đầu</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title2: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 18,
    justifyContent:'center',
    alignSelf:'center',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  views: {
    alignItems: 'center',
  },
  views2: {
    flexDirection: 'column',
    marginTop: 20,
  },
  title3: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
