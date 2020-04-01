
import React,{useState, useEffect} from 'react';
import {Router,Scene, Tabs, Drawer, Lightbox, Modal, Overlay,Actions} from 'react-native-router-flux';
import {
  StyleSheet,View,Text, Image, 
	BackHandler,ToastAndroid,AsyncStorage
} from 'react-native';
 
import SplashScreen from 'react-native-splash-screen'
import HomeTest from './src/home/HomeTest';
import GoodsTest from './src/goods/GoodsTest';
import UserTest from './src/user/UserTest';
import PublishTest from './src/user/PublishTest';
import Login from './src/common/Login';
import Register from './src/common/Register';
import Guide from './src/common/Guide';
import Icon from 'react-native-vector-icons/AntDesign';

const App= () => {
  let now=0;
  let [isLogin,setLogin] = useState(false);
  let [isInstall,setInstall] = useState(true);
  useEffect(()=>{
    AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
    AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
  },[])

  let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<Guide afterInstall={afterInstall}/>
		</View>
	}

  return (
    <>
      <Router
        backAndroidHandler={()=>{
          console.log('111111')
          if(Actions.currentScene != 'home'&&Actions.currentScene != 'login'){
            console.log('2222')
            Actions.pop();
            return true;
          }else{
            if(new Date().getTime()-now<2000){
              BackHandler.exitApp();
            }else{
              ToastAndroid.show('确定要退出吗',100);
              now = new Date().getTime();
              return true;
            }
          }
          
        }}
      >
        <Overlay>
          <Modal key="modal" hideNavBar>
            <Lightbox key="lightbox">
              <Drawer 
                key="drawer"
                contentComponent={()=><Text>drawer</Text>}
                drawerIcon={()=><Icon name="menu"/>}
                drawerWidth={400}
              >
                <Scene key="root"> 
                  <Tabs 
                      key='tabbar'                   
                      hideNavBar
                      activeTintColor='red'
                      inactiveTintColor='#979797'
                      tabBarStyle={{backgroundColor:'#fff'}}                 
                  >
                      <Scene key='homePage'
                          title='首页'
                          hideNavBar
                          icon={        
                          ({focused})=><Icon 
                              color={focused?'red':'#979797'} 
                              name="home" 
                              size={25}
                            />
                          }
                      >
                          <Scene key='home' component={HomeTest}/>
                      </Scene>
                      <Scene key='goods'
                          title='商品分类'
                          hideNavBar        
                          icon={
                          ({focused})=><Icon 
                              size={25}
                              color={focused?'red':'#979797'}  
                              name="appstore-o" 
                            />
                          }
                      >
                          <Scene key='goods' component={GoodsTest} />
                      </Scene>
                      <Scene key='user'
                          title='个人中心'
                          hideNavBar
                          icon={
                            ({focused})=><Icon 
                                size={25}
                                color={focused?'red':'#979797'} 
                                name="user" 
                            />
                          }
                      >
                          <Scene key='user' component={UserTest} />
                          <Scene key="publishtest" hideTabBar={true} component={PublishTest} />
                      </Scene>
                  </Tabs>
                </Scene>
              </Drawer>
            </Lightbox>
            <Scene initial={!isLogin} key="register" component={Register} />
            <Scene initial={!isLogin} key="login" component={Login} />
          </Modal>
        </Overlay>
      </Router>
    </>
  );
};


export default App;
