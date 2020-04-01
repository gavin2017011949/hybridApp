import React,{Component,useState} from 'react';
import {View,Text,ImageBackground,Image,FlatList, ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions}  from  'react-native-router-flux';
import ImageCropPicker from 'react-native-image-crop-picker';
export default class ShopTest extends Component{
    constructor(){
        super();
        let data=[
            {title:'账户管理',name:'gear'},
            {title:'收货地址',name:'map-marker'},
            {title:'我的信息',name:'vcard-o'},
            {title:'我的订单',name:'file-text-o'},
            {title:'我的二维码',name:'qrcode'},
            {title:'我的积分',name:'database'},
            {title:'我的收藏',name:'star-o'}
        ];
        let data1=[
            {title:'居家维修保养',name:'wrench'},
            {title:'出行接送',name:'automobile'},
            {title:'我的受赠人',name:'user'},
            {title:'我的住宿优惠',name:'bed'},
            {title:'我的活动',name:'flag'},
            {title:'我的发布',name:'edit'}
        ];
        
        
        this.state={
            data,
            data1,
            imageUrl:'',
            num:'0'
            
        }
   
    }
    //获得头像图片数据
    componentDidMount(){
        AsyncStorage.getItem('url').then((res)=>{
            if(res){
                this.setState({imageUrl:{uri:res}})
                // console.log(res);
            }else{
                this.setState({imageUrl:''})
                // console.log(res);
            }
        });
        AsyncStorage.getItem('num').then((res)=>{
            if(res==='1'){
                this.setState({num:res})
                // console.log(res);
            }else{
                this.setState({num:'0'})
                // console.log(res);
            }
        });
       
        // AsyncStorage.removeItem('url')
        //   AsyncStorage.removeItem('num')
    }
    //拍照，存头像图片数据
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.setState({imageUrl:{uri:image.path},num:'1'})
            console.log(this.state.imageUrl.uri)
            AsyncStorage.setItem('url',this.state.imageUrl.uri);
           AsyncStorage.setItem('num','1');
          });
          
           
    }
    login = ()=>{
        this.setState({isloading:false});
        AsyncStorage.removeItem('user')
        .then(res=>{
			let user = JSON.parse(res)
            console.log(user)
        })
        Actions.login();
        console.log(AsyncStorage.getItem('user'))
        // myFetch.post('/login',{
        //     username:this.state.username,
        //     pwd:this.state.pwd
        // }).then(res=>{
        //     AsyncStorage.setItem('user',JSON.stringify(res.data))
        //         .then(()=>{
        //             this.setState({isloading:false})
        //             Actions.lightbox();
        //         })
        //     })
        
    } 
    render(){
        return(
            <View>
                <ScrollView>
                    <ImageBackground style={{width:'100%',height:300}} source={require('../../assets/red.png')}>
                        <View >
                            <TouchableOpacity   onPress={()=>{this.takephoto()}}>
                                <View style={{alignSelf:'center',marginTop:50,width:120,height:120,borderRadius:60,overflow:'hidden'}}>
                                    {
                                        this.state.num==='0'
                                        ?<Image style={{width:120,height:120}}  source={require('../../assets/people.png')}/>
                                        :<Image style={{width:120,height:120}} source={this.state.imageUrl}/>
                                    }
                                    
                                </View>
                            </TouchableOpacity>
                            <Text style={{color:'#fff',fontSize:23,textAlign:'center',marginTop:10}}>BINNU DHILLON</Text>
                        </View>
                    </ImageBackground>
                    <View style={{width:'100%',height:60,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#eeeeee',flexDirection:'row'}}>
                        <Icon 
                            color='#c3c3c3'
                            name="user" 
                            size={30}
                                style={{
                                marginLeft:15,
                                marginTop:15
                            }}
                        />
                        <Text style={{fontSize:18,lineHeight:60,paddingLeft:10,color:'#4f4e4e'}}>我的个人中心</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',paddingTop:20}}>
                        <FlatList
                        numColumns={3}
                        data={this.state.data}
                        renderItem={({item,index})=>(
                            <View style={{width:'33%',height:90,backgroundColor:'#fff'}}>
                                <Icon 
                                    color='#c3c3c3'
                                    name={item.name} 
                                    size={30}
                                        style={{
                                        marginTop:10,
                                        textAlign:'center'
                                    }}
                                />
                                <Text style={{marginTop:5,textAlign:'center',fontSize:18,color:'#4f4e4e'}}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        />
                    </View>
                    <View style={{marginTop:10,width:'100%',height:60,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#eeeeee',flexDirection:'row'}}>
                        <Icon 
                            color='#c3c3c3'
                            name="tag" 
                            size={30}
                                style={{
                                marginLeft:15,
                                marginTop:15
                            }}
                        />
                        <Text style={{fontSize:18,lineHeight:60,paddingLeft:10,color:'#4f4e4e'}}>E族活动</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',paddingTop:20,paddingBottom:10}}>
                        <FlatList
                        numColumns={3}
                        data={this.state.data1}
                        renderItem={({item,index})=>(
                            index===5?
                                <TouchableOpacity style={{width:'33%',height:90,backgroundColor:'#fff'}}  onPress={()=>Actions.publishtest()}>
                                    <View style={{width:'100%',height:90,backgroundColor:'#fff'}}>
                                        <Icon 
                                            color='#c3c3c3'
                                            name={item.name} 
                                            size={30}
                                                style={{
                                                marginTop:10,
                                                textAlign:'center'
                                            }}
                                        />
                                        <Text style={{marginTop:5,textAlign:'center',fontSize:18,color:'#4f4e4e'}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            :
                                <View style={{width:'33%',height:90,backgroundColor:'#fff'}}>
                                    <Icon 
                                        color='#c3c3c3'
                                        name={item.name} 
                                        size={30}
                                            style={{
                                            marginTop:10,
                                            textAlign:'center'
                                        }}
                                    />
                                    <Text style={{marginTop:5,textAlign:'center',fontSize:18,color:'#4f4e4e'}}>
                                        {item.title}
                                    </Text>
                                </View>
                        )}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '80%',
                            height: 50,
                            backgroundColor: 'red',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft:'10%',
                            // marginRight:'10%',
                            borderRadius:20
                        }}
                        onPress={this.login}>
                        <Text style={{fontSize:19,color:'#fff',lineHeight:50}}>退出登录</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
