import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Order, selectOrders } from '../../slices/order';
import { useCallback } from 'react';

type OrdersProps = {};

const Orders = ({}: OrdersProps) => {
  const orders = useSelector(selectOrders);

  const renderItem = useCallback(
    ({ item }: { item: Order }) => (
      <View style={styles.orderContainer}>
        <Pressable style={styles.info}>
          <Text style={styles.eachInfo}>
            <Text>{item.price.toLocaleString('ko-KR')}원</Text>
          </Text>
        </Pressable>
      </View>
    ),
    []
  );

  return <FlatList data={orders} keyExtractor={order => order.orderId} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray'
  },
  info: {
    flexDirection: 'row'
  },
  eachInfo: {
    flex: 1
  }
});

export default Orders;
