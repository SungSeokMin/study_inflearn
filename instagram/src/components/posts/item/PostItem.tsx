import React, { useState } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IPost {
  postTitle: string;
  postPersonImage: any;
  postImage: any;
  likes: number;
  isLiked: boolean;
}

interface Props {
  post: IPost;
}

const PostItem = ({ post }: Props) => {
  const [like, setLike] = useState(post.isLiked);
  const onLike = () => setLike(!like);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerUserInfo}>
          <Image style={styles.headerUserImage} source={post.postPersonImage} />

          <View style={styles.headerUserName}>
            <Text style={styles.headerUserNameText}>{post.postTitle}</Text>
          </View>
        </View>

        <Feather name="more-vertical" style={styles.headerMoreButton} />
      </View>

      <View style={styles.postImageContainer}>
        <Image style={styles.postImage} source={post.postImage} />
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.actionWrapper}>
          <TouchableOpacity onPress={onLike}>
            <AntDesign
              style={{ ...styles.actionLike, color: like ? 'red' : 'black' }}
              name={like ? 'heart' : 'hearto'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionic style={styles.actionChat} name="chatbubble-outline" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather style={styles.actionDirectMessage} name="navigation" />
          </TouchableOpacity>
        </View>

        <Feather style={styles.actionBookmark} name="bookmark" />
      </View>

      <View style={styles.commentContainer}>
        <Text>좋아요 {like ? post.likes + 1 : post.likes} 개</Text>

        <Text style={styles.postDesc}>{post.postTitle}</Text>

        <Text style={styles.showMoreComment}>댓글 모두 보기</Text>

        <View style={styles.insertCommentContainer}>
          <View style={styles.insertCommentWrapper}>
            <Image
              style={styles.commentAuthorProfileImage}
              source={post.postPersonImage}
            />

            <TextInput
              style={styles.insertCommentInput}
              placeholder="댓글 달기..."
            />
          </View>

          <View style={styles.insertTextContainer}>
            <Text style={styles.insertText}>게시</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  headerUserName: {
    paddingLeft: 5,
  },
  headerUserNameText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerMoreButton: {
    fontSize: 20,
  },
  postImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLike: {
    paddingRight: 10,
    fontSize: 20,
  },
  actionChat: {
    paddingRight: 10,
    fontSize: 20,
  },
  actionDirectMessage: {
    fontSize: 20,
  },
  actionBookmark: {
    fontSize: 20,
  },
  commentContainer: {
    paddingHorizontal: 15,
  },
  postDesc: {
    paddingVertical: 2,
    fontSize: 14,
    fontWeight: '700',
  },
  showMoreComment: {
    paddingVertical: 2,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.4,
  },
  insertCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insertCommentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthorProfileImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  insertCommentInput: {
    opacity: 0.5,
  },
  insertTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insertText: {
    color: '#0095F6',
  },
});
