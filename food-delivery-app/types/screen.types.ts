export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type DeliveryParamList = {
  Ing: undefined;
  Complete: { orderId: string };
};
