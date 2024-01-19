import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
  View,
  StatusBar,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

import Ionic from 'react-native-vector-icons/Ionicons';

import SearchInput from '../components/searchInput/SearchInput';
import SearchContent from '../components/searchContent/SearchContent';

type SearchProps = {};

const Search = ({}: SearchProps) => {
  const [image, setImage] = useState<ImageSourcePropType | null>(null);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const getImage = (img: ImageSourcePropType | null) => setImage(img);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Search Input */}
        <SearchInput />

        {/* SearchContent */}
        <SearchContent getImage={getImage} />
      </ScrollView>

      {image ? (
        <View style={styles.modalContainer}>
          <StatusBar backgroundColor="#525252" barStyle="dark-content" />

          <View
            style={{
              ...styles.modalWrapper,
              top: windowHeight / 8,
              left: windowWidth / 18,
            }}>
            <View style={styles.userInfoContainer}>
              <Image style={styles.userProfileImage} source={image} />

              <View style={styles.userName}>
                <Text style={styles.userNameText}>Tom</Text>
              </View>
            </View>

            <Image style={styles.postImage} source={image} />

            <View style={styles.iconGroup}>
              <Ionic style={styles.heartIcon} name="heart-outline" />
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 58 : 0,
    zIndex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalWrapper: {
    width: '90%',
    height: 465,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  userProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  userName: {
    paddingLeft: 6,
  },
  userNameText: {
    fontSize: 12,
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: '80%',
  },
  iconGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  heartIcon: {
    fontSize: 25,
  },
});
