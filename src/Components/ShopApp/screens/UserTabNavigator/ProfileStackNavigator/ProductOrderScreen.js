import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import AddressStackNavigator from '../AddressStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import color from '../../../constants/color';
import moment from 'moment';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native';
// import color from '../../../constants/color';

const ProductOrderScreen = () => {
  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      getStarRate();
    }, []),
  );
  const [Orders, setOrders] = React.useState(null);
  const loggedInUser = useSelector((state) => state.auth.signedInUser);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const [state, setstate] = React.useState([]);

  const getStarRate = () => {
    const data = [];
    firestore()
      .collection('StarRate')
      .where('userId', '==', loggedInUser.uid)
      // .where('timeProductOrder', '==', loggedInUser.uid)

      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const starRate = documentSnapshot.data();
          starRate.id = documentSnapshot.id;
          data.push(starRate);
        });

        setstate(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setstate([]);
        // setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    const getTotalOrder = () => {
      {
        let result = item.productOrders.reduce(
          (total, item) =>
            total + (item.products.price * item.quantity * 100) / 100,
          0,
        );
        return result;
      }
    };

    let mm = item.createdDate.toDate().getMonth() + 1;
    let dd = item.createdDate.toDate().getDate();
    let yyyy = item.createdDate.toDate().getFullYear();

    let totalOrder = 0;
    // console.log(item.createdDate.toDate().toLocaleTimeString('vi_VN'));
    return (
      <ScrollView
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 8,

          ...styles.shadow,
          // borderBottomColor: 'red',
          // borderWidth: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
        onPress={() => {}}>
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 15}}>
          {item.Name}
        </Text>
        {/* <Text>{item.nanoseconds}</Text> */}

        {item.productOrders.map((e, index) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            key={'product' + index}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('ProductDetailScreen', {
                    product: e.products,
                  });
                }}>
                <FastImage
                  source={{
                    uri: e.products.imageUrl[0],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 80,
                    height: 80,
                    marginHorizontal: 10,
                    marginBottom: 3,
                    borderRadius:16,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '700'}}>
                    {e.products.name}
                  </Text>

                  {state.find(
                    (p, i) =>
                      p.productId === e.products.id &&
                      p.timeProductOrder ===
                        item.createdDate.toDate().toLocaleTimeString('vi_VN'),
                  ) ? (
                    <Text
                      style={{
                        marginHorizontal: 5,
                        color: 'green',
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      Đã đánh giá
                    </Text>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        navigation.navigate('StartRateProductScreen', {
                          product: e.products,
                          Name: item.Name,
                          timeOrders: item.createdDate
                            .toDate()
                            .toLocaleTimeString('vi_VN'),
                        });
                      }}>
                      <Text
                        style={{
                          color: 'green',
                          fontWeight: '700',
                          paddingRight: 5,
                        }}>
                        {item.status == 'Giao thành công' ? 'Đánh giá' : ''}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={{color: 'black'}}>Giá:{e.products.price}.000VNĐ</Text>
                <Text style={{color: 'black', fontWeight: '700'}}>
                  Số Lượng: {e.quantity}
                </Text>
                <Text style={{color: 'red', fontWeight: '700'}}>
                  Tiền:{e.products.price * e.quantity}.000VNĐ {''}
                  {item.discount > 0 && (
                    <Text style={{color: 'black', fontWeight: '700'}}>
                      (giảm giá :{item.discount}.000VNĐ)
                    </Text>
                  )}
                </Text>
                <Text style={{color: 'green', fontWeight: '700'}}>
                  Ngày Đặt:
                  {dd + '/' + mm + '/' + yyyy} {''}
                  {item.createdDate.toDate().toLocaleTimeString('vi_VN')}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <Text
          style={{
            color: 'red',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: '700',
            borderWidth: 1,
            borderColor: 'green',
            padding:5,
          }}>
          Tổng cộng: {getTotalOrder() - item.discount}.000VNĐ
        </Text>

        <View
          style={{
            // paddingLeft: 20,
            padding: 10,
            
            backgroundColor:
              item.status === 'Giao thành công' ? color.PRIMARY : '#EECFA1',
          }}>
          <Text style={{alignSelf: 'center', 
              textAlign: 'center',
              fontSize:15,
              // borderWidth: 1,
              // borderColor: '#ffdd59',
              // borderRadius:16,
              // height:20,
              // width:100,
              }}>
            {item.status == 'xác nhận' && 'Đang chờ duyệt'}
            {item.status == 'chờ lấy hàng' && 'Đang chờ lấy hàng'}
            {item.status == 'Đang giao hàng' && 'Đang giao hàng'}
            {item.status == 'Giao thành công' && 'Giao thành công'}
            {item.status == 'hủy đơn' && 'Đơn hàng bị hủy'}
          </Text>
        </View>
        {item.status == 'xác nhận' && (
          <TouchableOpacity
            // color="#ff5e57"
            fontSize="4"
            onPress={() => {
              firestore()
                .collection('Orders')
                .doc(item.id)
                .delete()
                .then(() => {
                  setRefresh(refresh + 1);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            style={{
              marginVertical: 3,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius:16,
              height:50,
              width:200,
              alignSelf:'center',
              // alignItems:'center',
              justifyContent:'center',
              backgroundColor:"#C1CDC1"
            }}>
            <Text style={{alignSelf:'center'}}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        )}
        {/* <Image
          source={{
            uri: item.images,
          }}
          style={{width: 30, height: 30}}
        /> */}
        <Text
          style={{
            marginLeft: 10,
            color: 'black',
            fontWeight: '700',
            fontSize: 15,
          }}>
          {item.title}
        </Text>
        {/* {item.map((p, i) => (
          <Text key={'p' + i}>
            style={{color: 'black', fontWeight: '700'}}
            Ngày đặt : {e.createdDate}
          </Text>
        ))} */}
      </ScrollView>
    );
  };

  const getOrders = () => {
    const data = [];
    firestore()
      .collection('Orders')
      .where('uid', '==', loggedInUser.uid)
      .orderBy('createdDate', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const product = documentSnapshot.data();
          product.id = documentSnapshot.id;
          data.push(product);
        });

        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setOrders([]);
        setLoading(false);
      });
  };
  React.useEffect(getOrders, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <FlatList
          data={Orders}
          renderItem={renderItem}
          keyExtractor={(Orders, uid) => 'Orders+' + uid}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ProductOrderScreen;
