import React,{Component,useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import {Actions}  from  'react-native-router-flux';
import Button from 'react-native-button';
import { MessageBarManager } from 'react-native-message-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')



export default class HomeTest extends Component{
    constructor(){
        super();
        let data=[
            {title:'居家维修保养',id:require('../../assets/c.png')},
            {title:'住宿优惠',id:require('../../assets/d.png')},
            {title:'出行接送',id:require('../../assets/e.png')},
            {title:'E族活动',id:require('../../assets/f.png')}
        ];
        this.state={
            data,
            
        }
   
    }
   
    render(){
        return(
            <View>
                <View style={{
                backgroundColor:'red',
                zIndex:1001,
                flexDirection:'row',
                width:'100%',
                height:55,
                alignItems:'center',
                borderBottomWidth:1,
                borderBottomColor:'#e8e8e8',
                }}>
                    <View 
                    style={{
                        width:'83%',
                        height:35,
                        borderRadius:20,
                        left:'4%',
                        paddingLeft:'2%',
                        backgroundColor:'#fbb8b8',
                        flexDirection:'row'
                    }}
                    >
                        <Icon 
                        color='white'
                        name="search1" 
                        size={25}
                        style={{
                            left:10,
                            top:5
                        }}
                    />
                        <TextInput 
                            placeholder='请输入您要搜索的关键字'
                            placeholderTextColor='#fff'
                            style={{
                                color:'#fff',
                            paddingLeft:20,
                            width:'80%',
                            height:35,
                            
                            }}
                        />
                    
                    </View>
            
                    <Icon 
                        color='white'
                        name="shoppingcart" 
                        size={30}
                        style={{
                            right:-35
                        }}
                    />
           
                </View>
                <ScrollView>

                <View style={styles.container}>
                    <Swiper style={styles.wrapper} paginationStyle={{bottom:10}} dotStyle={{backgroundColor:'#fff'}} activeDotStyle={{backgroundColor:'red'}}  height={200} horizontal={true} autoplay>
                    <View style={styles.slide} >
                        <Image resizeMode='stretch' style={styles.image} source={require('../../assets/a.png')} />
                    </View>
                    <View style={styles.slide} >
                        <Image resizeMode='stretch' style={styles.image} source={require('../../assets/b.png')} />
                    </View>
                    <View style={styles.slide} >
                        <Image resizeMode='stretch' style={styles.image} source={require('../../assets/a.png')} />
                    </View>
                    </Swiper>
                </View>
            
                <View style={{marginTop:10,width:'100%',flexDirection:'row',flexWrap:'wrap'}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item,index})=>(
                        <View style={{width:'100%',height:90,backgroundColor:'#fff',marginBottom:10,flexDirection:'row'}}>
                            <View style={{width:'90%',flexDirection:'row'}}>
                                <Image  source={item.id} style={{width:80,height:80,marginTop:5,marginLeft:15}}/>
                                <Text style={{lineHeight:80,marginLeft:30,color:'#4f4e4e',fontSize:16}}>
                                {item.title}
                                </Text>
                            </View>
                            <Icon 
                                color='#ccc'
                                name="right" 
                                size={15}
                                style={{
                                    alignSelf:'center'
                                }}
                                
                            />
                            
                        </View>
                    )}
                    />
                </View>
                <Button 
                style={{
                    width:'80%',
                    marginLeft:'10%',
                    borderRadius:10,
                    height:50,
                    lineHeight:50,
                    backgroundColor:'red',
                    color:'#fff',
                    marginTop:10
                }}
                >发布需求</Button>

                <Text style={{textAlign:'center',marginTop:40,color:'#767676',marginBottom:70}}>©E族之家 版权所有</Text>
                </ScrollView>
            </View>
        )
    }
}
const styles = {
    container: {
      height:200,
    },
    wrapper: {
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    image: {
      width,
      height:200,
      flex: 1
    }
  }

