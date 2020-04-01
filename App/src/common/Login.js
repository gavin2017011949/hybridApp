import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity,AsyncStorage,ToastAndroid} from 'react-native';
// import { Icon } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:''
            // isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }

    login = ()=>{
        // this.setState({isloading:true})
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd
        }).then(res=>{
            AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                    if(res.data.token==='2'){
                        ToastAndroid.showWithGravity(res.data.tips,10,ToastAndroid.CENTER);
                    }else if(res.data.token==='1'){
                        ToastAndroid.showWithGravity('正在登陆',10,ToastAndroid.CENTER);
                        // this.setState({isloading:false})
                        Actions.homePage();
                    }
                    
                })
            })
        
    } 
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '70%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red" size={30}/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
                style={{fontSize:20,marginLeft:20}}
            />
          </View>
          <View
            style={{
              width: '70%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="eyeo" color="red" size={30}/>
            <TextInput placeholder="密码" 
                onChangeText={this.pwdhandle}
                secureTextEntry={true}
                style={{fontSize:20,marginLeft:20}}
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
                style={{
                    width: '25%',
                    height: 50,
                    backgroundColor: 'red',
                    marginTop: 50,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    marginLeft:'15%',
                    marginRight:'10%',
                    borderRadius:20
                }}
                onPress={this.login}>
                <Text style={{fontSize:19,color:'#ccc',lineHeight:50}}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '25%',
                    height: 50,
                    backgroundColor: 'red',
                    marginTop: 50,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    marginRight:'15%',
                    marginLeft:'10%',
                    borderRadius:20
                }}
                onPress={()=>{Actions.register()}}
                >
                <Text style={{fontSize:19,color:'#ccc',lineHeight:50}}>返回注册</Text>
            </TouchableOpacity>
            </View>
        </View>
        {/* {
            this.state.isloading
            ?<View style={{width:'20%',flexDirection:'row',alignSelf:'center',marginTop:60}}>
                <Text>正在登录</Text>
                <Icon 
                    color='#8c8c8c'
                    name="loading1" 
                    size={15}
                    style={{
                        alignSelf:'center',
                        marginLeft:10
                    }}
                                
                />
            </View>
            :null
        } */}
        
      </View>
    );
  }
}