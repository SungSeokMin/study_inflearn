import {
  StyleProp,
  ViewStyle,
  TouchableNativeFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        {...props}
        style={style}>
        {children}
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
};

export default DismissKeyboardView;
