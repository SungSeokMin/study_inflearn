import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Config from 'react-native-config';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import axios, { AxiosError } from 'axios';

import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

import { useAppDispatch } from '../../store';
import { rejectOrder } from '../../slices/order';

import { DeliveryParamList, LoggedInParamList } from '../../../types/screen.types';

import { selectAccessToken } from '../../slices/user';

function Complete() {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<DeliveryParamList>>();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const orderId = route.params?.orderId;

  const [image, setImage] = useState<{ uri: string; name: string; type: string }>();
  const [preview, setPreview] = useState<{ uri: string }>();

  const accessToken = useSelector(selectAccessToken);

  const onResponse = useCallback(async (response: any) => {
    setPreview({ uri: `data:${response.mime};base64,${response.data}` });
    const orientation = (response.exif as any)?.Orientation;
    console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0
    ).then(r => {
      console.log(r.uri, r.name);

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime
      });
    });
  }, []);

  const onTakePhoto = useCallback(() => {
    return ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
      saveToPhotos: true
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo'
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onComplete = useCallback(async () => {
    if (!image) {
      Alert.alert('알림', '파일을 업로드해주세요.');
      return;
    }
    if (!orderId) {
      Alert.alert('알림', '유효하지 않은 주문입니다.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('orderId', orderId);
    try {
      await axios.post(`${Config.API_URL}/complete`, formData, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      Alert.alert('알림', '완료처리 되었습니다.');
      navigation.goBack();
      navigation.navigate('Settings');
      dispatch(rejectOrder(orderId));
    } catch (error) {
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
  }, [dispatch, navigation, image, orderId, accessToken]);

  return (
    <SafeAreaView>
      <View style={styles.orderId}>
        <Text>주문번호: {orderId}</Text>
      </View>
      <View style={styles.preview}>
        {preview && <Image style={styles.previewImage} source={preview} />}
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>이미지 촬영</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onChangeFile}>
          <Text style={styles.buttonText}>이미지 선택</Text>
        </Pressable>
        <Pressable
          style={image ? styles.button : StyleSheet.compose(styles.button, styles.buttonDisabled)}
          onPress={onComplete}
        >
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  orderId: {
    padding: 20
  },
  preview: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3,
    backgroundColor: '#D2D2D2',
    marginBottom: 10
  },
  previewImage: {
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain'
  },
  buttonWrapper: { flexDirection: 'row', justifyContent: 'center' },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5
  },
  buttonText: {
    color: 'black'
  },
  buttonDisabled: {
    backgroundColor: 'gray'
  }
});

export default Complete;
