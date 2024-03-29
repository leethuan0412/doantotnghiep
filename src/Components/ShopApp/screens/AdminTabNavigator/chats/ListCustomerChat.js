import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import Arrow from 'react-native-vector-icons/AntDesign';
export default function ListUserChatScreen() {
  const [users, setUserChat] = React.useState([]);
  const [chats, setChat] = React.useState([]);
  const [userFilter, setUserFilter] = React.useState(users);
  // console.log(users);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const loggedInUser = useSelector((state) => state.auth.signedInUser);
  const statusActivity = () => {
    // Assuming user is logged in
    const userId = auth().currentUser.uid;
    const reference = database().ref(`/online/${userId}`);
    // Set the /users/:userId value to true
    reference.set(true).then(() => console.log('Online presence set'));
    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
      statusActivity();
      getMessages();
    }, [refresh]),
  );
  const getProfile = () => {
    const data = [];
    firestore()
      .collection('Profiles')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          data.push(user);
        });

        setUserChat(data);
        // setProducts(data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setUserChat([]);
        setLoading(false);
      });
  };
  const getMessages = () => {
    const data = [];
    firestore()
      .collection('Messages')
      .where('from', '==', loggedInUser?.uid)
      .orderBy('createdTime', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data();
          user.id = documentSnapshot.id;
          data.push(user);
        });
        setChat(data);
        // setProducts(data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setChat([]);
        setLoading(false);
      });
  };
  // console.log(chats);
  React.useEffect(getProfile, [refresh]);
  React.useEffect(getMessages, [refresh]);
  const navigation = useNavigation();
  // console.log(users);
  const renderItem = ({item, index}) => {
    // console.log();
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {item.role !== 'Admin' &&
        chats.find((c) => c.username == item.name && c.to == item.id) ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.row, {position: 'relative'}]}
            onPress={() => {
              navigation.navigate('ChatCustomerScreen', item);
            }}>
              {/* avatar */}
            <FastImage
              source={{
                uri: item.imageUrl
                  ? item.imageUrl
                  : 'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png',
              }}
              style={styles.pic}
            />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.name}</Text>
                <Text style={{marginLeft:15}}>{item.email}</Text>
              </View>
            </View>
            {chats.find(
              (c) =>
                c.to == item.id && // check tin nhắn cùng tên
                c.username == item.name &&
                c.badges === false,
            ) ? (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                <Icon
                  name="chatbox"
                  style={{
                    color: 'red',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}
                  size={20}
                  color="#70DA30"></Icon>
              </Text>
            ) : (
              <Icon name="chatbox" size={20} color="#70DA30"></Icon>
            )}
          </TouchableOpacity>
        ) : (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              // position: 'absolute',
            }}>
            <Text style={{}}>{item.username}</Text>
            {/* <Text>{item.email}</Text> */}
          </SafeAreaView>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor:'#009387',height:50,justifyContent:'center'}}> 
      <Text style={{fontSize:18,alignSelf:'center',color:'white'}}>Tin nhắn</Text>
      </View>
       <View
        style={{
          flexDirection: 'row',
          height: 40,
          // alignItems: 'center',
          backgroundColor: '#F5F5F8',
          justifyContent:'center',
          alignSelf:'center',
          borderWidth:1,
          borderColor:'#CCCCCC',
          marginTop:10,
          borderRadius:8,
        }}>
        <View style={{padding: 10}}>
          <Arrow name="search1" size={20} color="#898B9A" />
        </View>

        <TextInput
          style={{flex: 1,}}
          placeholder="Search Users"
          onChangeText={(text) => {
            setUserFilter(users.filter((u) => u.name.includes(text)));
          }}
        />
      </View>
      <FlatList
        // extraData={this.state}
        data={userFilter.length > 0 ? userFilter : users}
        keyExtractor={(item) => {
          return 'item' + item.id;
        }}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
    fontWeight:'bold',
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
