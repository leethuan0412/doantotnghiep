import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';

export default function UserOrderSceen({route}) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={route.params}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <SafeAreaView>
              {item.productOrders.map((e, index) => (
                <View
                  key={'product' + index}
                  style={styles.card}
                  // onPress={() => {}}
                  >
                  <Image
                    style={styles.image}
                    source={{uri: e.products.imageUrl[0]}}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.nameOrder}>{item.Name}</Text>
                    <Text style={styles.name}>{e.products.name}</Text>
                    <Text style={styles.price}>{e.products.price}.000VNĐ</Text>
                    <Text style={styles.address}>Địa chỉ:{item.Address}</Text>
                    <View style={styles.followButton}>
                      <Text style={styles.followButtonText}>
                        {item.createdDate.toDate().getDate()}
                        {'/'}
                        {item.createdDate.toDate().getMonth() + 1}
                        {'/'}
                        {item.createdDate.toDate().getFullYear()}{' '}
                        {item.createdDate.toDate().toLocaleTimeString('vi_VN')}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </SafeAreaView>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    justifyContent: 'center',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 60,
    flex:1,
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf:'center',
  },

  card: {
    marginHorizontal: 8,
    // width: '95%',
    borderWidth: 1,
    borderColor: 'green',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  nameOrder: {
    fontSize: 13,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'red',
  },
  price: {
    fontSize: 14,
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'red',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 160,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
  },
  followButtonText: {
    color: 'green',
    fontSize: 12,
  },
});
