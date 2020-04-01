import React,{Component,useState} from 'react';
import {View,Text, StatusBar,Button,ToastAndroid,TouchableWithoutFeedback,TouchableOpacity,ScrollView} from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import {Actions}  from  'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
export default class PublishTest extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            page:1,
            num:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            isloading:false
        }
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+this.state.page)
        .then(res=>res.json())
        .then(res=>{
            this.setState({data:res.data})
        })
    }
    next=()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+this.state.page+1)
        .then(res=>res.json())
        .then(res=>{
            this.setState({data:res.data,page:this.state.page+1,isloading:true})
        })
        console.log(parseInt(Math.random()*2))
    }
    last=()=>{
        if(this.state.page<=1){
            ToastAndroid.showWithGravity(
                '已是第一页！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
        }else{
            console.log(this.state.page-1)
            fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+(this.state.page-1))
            .then(res=>res.json())
            .then(res=>{
                this.setState({data:res.data,page:this.state.page-1,isloading:true})
            })
            // console.log(this.state.data)
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <StatusBar backgroundColor='red'/>
                <ScrollView>
                <View style={{width:'100%',height:60,backgroundColor:'red',flexDirection:'row'}}> 
                    <TouchableOpacity style={{width:'20%'}} onPress={()=>{Actions.user();this.setState({isloading:true})}}>
                        <View>
                            <Icon 
                                color='#fff'
                                name="left"
                                size={25}
                                style={{
                                opacity:0.7,
                                marginTop:10,
                                marginLeft:10,
                                // textAlign:'left'
                                }}
                            />        
                        </View> 
                    </TouchableOpacity>     
                    <View style={{width:'60%'}}>     
                        <Text style={{color:'#fff',textAlign:'center',lineHeight:50,fontSize:20}}>我的发布</Text>
                    </View>
                    <View style={{width:'20%'}}>
                        <Icon 
                            color='#fff'
                            name="ellipsis1"
                            size={25}
                            style={{
                            opacity:0.9,
                            marginTop:10,
                            marginRight:20,
                            textAlign:'right'
                            }}
                        />        
                    </View>
                </View>
                {
                    !this.state.isloading
                    ?ToastAndroid.showWithGravity(
                        '正在加载',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      )
                    :<></>
                }
                    <View flexDirection='row'>
                    <View style={{marginLeft:'2%',width:'60%'}}>
                        {
                            this.state.data.map((item)=>(
                                <Text style={{fontSize:18,marginTop:25}}>{item.title.substring(0,15)+'...'}</Text>
                            ))
                        }
                    </View>
                    <View style={{width:'20%'}}>
                        {
                            this.state.data.map((item)=>(
                                <Text style={{fontSize:18,marginTop:25}}>{item.create_at.substring(0,10)}</Text>
                            ))   
                        }
                    </View>
                    <View style={{marginLeft:'3%',width:'15%'}} >
                        {
                            this.state.num.map((item)=>(
                                parseInt(Math.random()*2)===0?
                                    <Text style={{fontSize:18,marginTop:25}}>已回复</Text>
                                :
                                    <Text style={{fontSize:18,marginTop:25,color:'red'}}>待回复</Text>
                            ))
                        }
                    </View>
                </View>
                
                
                <View flexDirection='row' style={{marginTop:50}}>
                    <TouchableWithoutFeedback onPress={this.last}>
                        <View style={{height:45,width:'27%',marginLeft:'3%',borderRadius:20,backgroundColor:'red'}}>
                            <Text style={{textAlign:'center',lineHeight:45,color:'#fff',fontSize:18}}>上一页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{width:'40%',textAlign:'center',lineHeight:45,fontSize:18}}>第{this.state.page}页</Text>
                    <TouchableWithoutFeedback onPress={this.next}>
                        <View style={{height:45,width:'27%',marginRight:'3%',borderRadius:20,backgroundColor:'red',color:'#fff'}}>
                            <Text style={{textAlign:'center',lineHeight:45,color:'#fff',fontSize:18}}>下一页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                </ScrollView>
            </View>
        );
    }
}
