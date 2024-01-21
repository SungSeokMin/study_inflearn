import {
  StyleProp,
  ViewStyle,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type DismissKeyboardViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DismissKeyboardView = ({
  children,
  style,
  ...props
}: DismissKeyboardViewProps) => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView {...props} style={style}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableNativeFeedback>
  );
};

export default DismissKeyboardView;
