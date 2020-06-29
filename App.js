
import React,{useState} from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {LoginScreen} from './screens/login';
import {SignUpScreen} from './screens/signup';
import {PayScreen} from './screens/pay';
import {listProductScreen} from './screens/list-product';
import Home from './screens/home-page';
import ReferenceDetailScreen from './screens/reference-detail';
import ProductDetail from './screens/product-detail';
import {ProfileScreen} from './screens/profile';
import {ChangeProfileScreen} from './screens/change-profile';
import {OrderHistoryScreen} from './screens/order-history';
import {SearchScreen} from './screens/search'
import Menu from './components/menu/Menu'
const AppNavigator = createStackNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:{
        title:"App Rau Củ Quả",
        header:null
      }
    },
    ProductDetail: {
        screen:ProductDetail,
       navigationOptions:{
         headerTitleStyle:{
           fontSize:18,
           fontWeight:'bold',
         },
         header:null
       }
    },
    Login:{
      screen:LoginScreen,
      navigationOptions:{
       header:null        
      }
    },
    SignUp:{
      screen:SignUpScreen,
      navigationOptions:{
       
      }
    },
    Pay:{
      screen:PayScreen,
      navigationOptions:{
        title:'Thanh toán'
      }
    },
    ReferenceDetail:{
      screen:ReferenceDetailScreen,
      navigationOptions:{
        title:'Bài tham khảo',
        header:null
      }
    },
    Profile:{
      screen:ProfileScreen,
      navigationOptions:{
        title:'Thông tin cá nhân',
      
      },
    },
    ChangeProfile:{
      screen:ChangeProfileScreen,
      navigationOptions:{
        title:'Chỉnh sửa thông tin'
      }
    },
    ListProduct:{
      screen:listProductScreen,
      navigationOptions:{
        header:null
      }
    },
    OrderHistory:{
      screen:OrderHistoryScreen,
      navigationOptions:{
        title:'Lịch sử mua hàng',
      }
    },
      Search:{
        screen:SearchScreen,
        navigationOptions:{
          header:null
        }
      }
  },
  
  {
    initialRouteName:  'Home',
    headerMode:'float',
    headerTransitionPreset:'uikit',
  }
);

export default createAppContainer(AppNavigator);


