import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Alert, Dimensions } from 'react-native';
import Config from 'react-native-config';
import NaverMapView, { Marker, Path } from 'react-native-nmap';

import axios, { AxiosError } from 'axios';

import { useAppDispatch } from '../../store';
import { Order, acceptOrder, rejectOrder } from '../../slices/order';

import getDistanceFromLatLonInKm from '../../util';

import { selectAccessToken } from '../../slices/user';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoggedInParamList } from '../../../types/screen.types';

type OrderItem = {
  order: Order;
};

const OrderItem = ({ order }: OrderItem) => {
  const { orderId, price, start, end } = order;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const accessToken = useSelector(selectAccessToken);

  const [detail, setDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const onToggleDetail = useCallback(() => {
    setDetail(prev => !prev);
  }, []);

  const onAccept = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post(
        `${Config.API_URL}/accept`,
        { orderId },
        { headers: { authorization: `Bearer ${accessToken}` } }
      );

      dispatch(acceptOrder(orderId));

      setLoading(false);
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError<{ message: string }>).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert('알림', errorResponse.data.message);
        dispatch(rejectOrder(orderId));
      }
      setLoading(false);
    }
    dispatch(acceptOrder(orderId));
  }, [accessToken, dispatch, navigation, orderId]);
  const onReject = useCallback(() => dispatch(rejectOrder(orderId)), [dispatch, orderId]);

  return (
    <View style={styles.orderContainer}>
      <Pressable style={styles.info} onPress={onToggleDetail}>
        <Text style={styles.eachInfo}>
          <Text>{price.toLocaleString('ko-KR')}원</Text>
        </Text>

        <Text style={styles.eachInfo}>
          {getDistanceFromLatLonInKm(
            start.latitude,
            start.longitude,
            end.latitude,
            end.longitude
          ).toFixed(1)}
          km
        </Text>
      </Pressable>

      {detail && (
        <View>
          <View style={styles.mapContainer}>
            <NaverMapView
              style={styles.map}
              center={{
                zoom: 10,
                tilt: 50,
                latitude: (start.latitude + end.latitude) / 2,
                longitude: (start.longitude + end.longitude) / 2
              }}
            >
              <Marker
                coordinate={{
                  latitude: start.latitude,
                  longitude: start.longitude
                }}
                pinColor="blue"
              />
              <Path
                coordinates={[
                  {
                    latitude: start.latitude,
                    longitude: start.longitude
                  },
                  { latitude: end.latitude, longitude: end.longitude }
                ]}
              />
              <Marker coordinate={{ latitude: end.latitude, longitude: end.longitude }} />
            </NaverMapView>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.acceptButton} disabled={loading} onPress={onAccept}>
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable style={styles.rejectButton} onPress={onReject}>
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
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
  },
  buttonWrapper: {
    flexDirection: 'row'
  },
  acceptButton: {
    backgroundColor: '#4367FE',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1
  },
  rejectButton: {
    backgroundColor: '#FC2006',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  mapContainer: { width: Dimensions.get('window').width - 30, height: 200, marginTop: 10 },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default OrderItem;
