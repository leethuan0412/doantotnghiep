import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

export default function Profile({route}) {
  const navigation = useNavigation();

  const [totalOrder, setTotalOrder] = React.useState([]);
  const [totalComment, setTotalComment] = React.useState([]);

  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  var userUid = route.params.profile.id;

  const [Product, setProductId] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getComment();
    }, []),
  );

  React.useEffect(() => {
    const data = [];
    firestore()
      .collection('Orders')
      .where('uid', '==', userUid)
      // .orderBy('createdDate', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const Order = documentSnapshot.data();
          Order.id = documentSnapshot.id;
          data.push(Order);
        });

        setTotalOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setTotalOrder([]);
        setLoading(false);
      });
  }, [refresh]);

  const getComment = () => {
    firestore()
      .collection('StarRate')
      .where('userId', '==', userUid)
      .get()
      .then((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          const comment = documentSnapshot.data();
          comment.id = documentSnapshot.id;
          data.push(comment);
        });

        setTotalComment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setTotalComment([]);
        setLoading(false);
      });
  };

  React.useEffect(getComment, [refresh]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            setRefresh(refresh + 1);
          }}
        />
      }>
      {/* <View style={styles.header}></View> */}
      <Image
        style={styles.avatar}
        source={{
        uri: route.params.profile.imageUrl
                    ? route.params.profile.imageUrl
                    : 'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png',}}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{route.params.profile.name}</Text>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={1}
           
            onPress={() => navigation.navigate('UserOrderSceen', totalOrder)}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://e7.pngegg.com/pngimages/81/559/png-clipart-shopping-cart-software-computer-icons-shopping-cart-text-retail-thumbnail.png',
              }}
            />

            <Text style={styles.title}>Đơn hàng</Text>
            <Text style={styles.number}>{totalOrder.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.box}
            onPress={() =>
              navigation.navigate('UserCommentScreen', {
                userUid,
              })
            }>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2yKgzCvwzfsTOoUnGSNZAXpLughD6KH4fyA&usqp=CAU',
              }}
            />
            <Text style={styles.title}>Đánh giá</Text>
            <Text style={styles.number}>{totalComment.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.box}
            onPress={() =>
              navigation.navigate('DecentralizationScreen', {
                userUid,
              })
            }>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://maytinhdongbo.com/media/news/156_permission_icon.png',
              }}
            />
            <Text style={styles.title}>Phân quyền</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: '100%',
    padding: 5,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  number: {
    marginLeft: 'auto',
    alignSelf: 'center',
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    width: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  icon: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    color: '#696969',
    alignSelf: 'center',
    marginLeft: 4,
  },
  body: {
    marginTop: 130,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
