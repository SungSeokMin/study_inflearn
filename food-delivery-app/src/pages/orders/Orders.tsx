import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { Order, selectOrders } from '../../slices/order';

import OrderItem from '../../components/orderItem/OrderItem';

type OrdersProps = {};

const Orders = ({}: OrdersProps) => {
  const orders = useSelector(selectOrders);

  const renderItem = useCallback(({ item }: { item: Order }) => <OrderItem order={item} />, []);

  return <FlatList data={orders} keyExtractor={order => order.orderId} renderItem={renderItem} />;
};

export default Orders;
