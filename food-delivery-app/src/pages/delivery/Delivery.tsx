import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ing from '../ing/Ing';
import Complete from '../complete/Complete';

type DeliveryProps = {};

const Stack = createNativeStackNavigator();

const Delivery = ({}: DeliveryProps) => {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Delivery;
