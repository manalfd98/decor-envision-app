import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Main from './Main';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../tabs/Home';
import Sofa from '../screens/Sofa';
import Categories from '../screens/Categories';
import AllProductpage from '../screens/AllProductpage';
import SpecificProductPage from '../screens/SpecificProductPage';
import Customization from '../screens/Customization';
import ARView from '../screens/ARView';
import Cart from '../tabs/Cart';
import WishList from '../tabs/WishList';
import User from '../tabs/User';
import Checkout from '../screens/Checkout';
import OrderSummary from '../screens/OrderSummary';
import thankupage from '../screens/Thankupage';
import OrderFinalpage from '../screens/OrderFinalpage';
import CustomizedList from '../screens/CustomizedList';
import ViewData from '../screens/ViewData';
import UserOrder from '../screens/UserOrder';
import OrderDetailUser from '../screens/OrderDetailUser';


const stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Main' component={Main} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Home' component={Home} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Login' component={Login} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}></stack.Screen>
        {/* <stack.Screen name='Sofa' component={Sofa} options={{headerShown:false}}></stack.Screen> */}
        <stack.Screen name='categories' component={Categories} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='SpecificProductPage' component={SpecificProductPage} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Customization' component={Customization} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='ARView' component={ARView} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='cart' component={Cart} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='user' component={User} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='wishlist' component={WishList} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='Customizedlist' component={CustomizedList} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='ViewData' component={ViewData} options={{headerShown: false}}></stack.Screen>


        <stack.Screen name='ordersummary' component={OrderSummary} options={{ headerShown: false }}></stack.Screen>


        <stack.Screen name='orderfinal' component={OrderFinalpage} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name='UserOrder' component={UserOrder} options={{headerShown: false}}></stack.Screen>


        <stack.Screen name='OrderDetails' component={OrderDetailUser} options={{ headerShown: false }}></stack.Screen>



        {/* Set initialRouteName to your desired starting screen */}
        <stack.Screen
          name="SofaProducts"
          options={{ title: 'Sofa Products' }}>
          {() => <AllProductpage type="Sofa" />}
        </stack.Screen>

        <stack.Screen
          name="Bed"
          options={{ title: 'Bed Products' }}>
          {() => <AllProductpage type="Bed" />}
        </stack.Screen>

        <stack.Screen
          name="Chair"
          options={{ title: 'Chair Products' }}>
          {() => <AllProductpage type="Chair" />}
        </stack.Screen>
        
        <stack.Screen
          name="Table"
          options={{ title: 'Table Products' }}>
          {() => <AllProductpage type="Table" />}
        </stack.Screen>

      </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
