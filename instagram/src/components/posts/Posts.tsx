import React from 'react';

import { View } from 'react-native';

import PostItem from './item/PostItem';

import { POSTS_INFO } from './posts.data';

const Posts = () => {
  return (
    <View>
      {POSTS_INFO.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </View>
  );
};

export default Posts;
