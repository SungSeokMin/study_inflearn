import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Bottom: undefined;
  Status: { name: string; image: ImageSourcePropType } | undefined;
  FriendProfile: undefined;
  EditProfile: undefined;
};
