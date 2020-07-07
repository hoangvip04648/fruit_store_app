import React,{useState} from 'react';
import Pay from '../components/pay/pay';
import useGlobal from '../store';
export const PayScreen= (props) => {
  const [globalState,globalAction]  = useGlobal();
  const [userInfo, setUserInfo] = useState(globalState.user);
    return (
        <Pay data={userInfo} navigation={props.navigation}  isEmty={globalState.numberItem !=0 ? 1:0} />
    )
}