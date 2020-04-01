import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity,AsyncStorage, ToastAndroid} from 'react-native';
// import { Icon } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false,
            num1:true
        }
    }
    userhandle = (text)=>{
        // console.log(/[^\u4E00-\u9FA5\w]/.test(text))
        this.setState({username:text});
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }

    register = ()=>{
        // this.setState({isloading:true})
        myFetch.post('/register',{
            username:this.state.username,
            pwd:this.state.pwd
        }).then(res=>{
            AsyncStorage.setItem('userR',JSON.stringify(res.data))
                .then(()=>{
                    if(res.data.token==='1'||res.data.token==='2'){
                        ToastAndroid.showWithGravity(res.data.tips,10,ToastAndroid.CENTER);
                    }else if(res.data.token==='3'){
                        ToastAndroid.showWithGravity('注册成功',10,ToastAndroid.CENTER);
                        Actions.login();
                    }
                    
                    // console.log(res)
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
          <View>
              {/* {
                
                !this.state.num1
                ?<Text>用户名仅支持中英文、数字和下划线</Text>
                :<></>
              } */}
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
                onPress={this.register}
                >
                <Text style={{fontSize:19,color:'#ccc',lineHeight:50}}>注册</Text>
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
                onPress={()=>{Actions.login();}}
                >
                <Text style={{fontSize:19,color:'#ccc',lineHeight:50}}>去登录</Text>
            </TouchableOpacity>
            </View>
        </View>
        {/* {
            this.state.isloading
            ?<View style={{width:'20%',flexDirection:'row',alignSelf:'center',marginTop:60}}>
                <Text>正在注册</Text>
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