import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';

import { STORY_INFO } from './stories.data';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {};

const Stories = ({}: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onPressStory = (name: string, image: ImageSourcePropType) => {
    navigation.push('Status', { name, image });
  };

  return (
    <ScrollView style={styles.container} horizontal={true}>
      {STORY_INFO.map(story => (
        <TouchableOpacity
          key={story.id}
          onPress={() => onPressStory(story.name, story.image)}>
          <View style={styles.storyContainer}>
            <View style={styles.story}>
              <Image style={styles.storyImage} source={story.image} />
            </View>

            {story.id === 1 ? (
              <View style={styles.circlePlusContainer}>
                <Entypo style={styles.circlePlus} name="circle-with-plus" />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  storyContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    position: 'relative',
  },
  story: {
    width: 68,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#c13584',
  },
  storyImage: {
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  circlePlusContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 1,
  },
  circlePlus: {
    fontSize: 20,
    color: '#405de6',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
