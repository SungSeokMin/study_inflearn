import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { SEARCH_CONTENT_INFO } from './searchContent.data';

interface SearchContentProps {
  getImage: (image: ImageSourcePropType | null) => void;
}

const SearchContent = ({ getImage }: SearchContentProps) => {
  return (
    <View>
      {SEARCH_CONTENT_INFO.map((data, index) => (
        <View key={index}>
          {data.id === 0 ? (
            <View style={styles.firstContentUIContainer}>
              {data.images.map((image, imageIndex) => (
                <TouchableOpacity
                  style={styles.firstContentUIImageContainer}
                  onPressIn={() => getImage(image)}
                  onPressOut={() => getImage(null)}
                  key={imageIndex}>
                  <Image style={styles.firstContentUIImage} source={image} />
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          {data.id === 1 ? (
            <View style={styles.secondContentUIContainer}>
              <View style={styles.secondContentUIWrapper}>
                {data.images.slice(0, 4).map((image, imageIndex) => (
                  <TouchableOpacity
                    style={styles.secondContentUIImageContainer}
                    onPressIn={() => getImage(image)}
                    onPressOut={() => getImage(null)}
                    key={imageIndex}>
                    <Image style={styles.secondContentUIImage} source={image} />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.secondContentVerticalImageContainer}
                onPressIn={() => getImage(data.images[5])}
                onPressOut={() => getImage(null)}>
                <Image
                  style={styles.secondContentVerticalImage}
                  source={data.images[5]}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({
  container: {},
  firstContentUIContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  firstContentUIImageContainer: {
    width: '33%',
    paddingBottom: 2,
  },
  firstContentUIImage: {
    width: '100%',
    height: 150,
  },
  secondContentUIContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondContentUIWrapper: {
    width: '66.5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  secondContentUIImageContainer: {
    width: '49.5%',
    paddingBottom: 2,
  },
  secondContentUIImage: {
    width: '100%',
    height: 150,
  },
  secondContentVerticalImageContainer: {
    marginLeft: 2,
    width: '33%',
  },
  secondContentVerticalImage: {
    width: '100%',
    height: 300,
  },
});
