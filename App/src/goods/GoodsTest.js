
import React ,{Component}from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
export default class GoodsTest extends Component{
    constructor(){
        super();
        let data=[];
        for(var i=1;i<7;i++){
        if(i%2==1){
            data.push({title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',money:'36.00',id:require('../../assets/1.png')})
        }else{
            data.push({title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',money:'36.00',id:require('../../assets/2.png')})
        } 
        }
        this.state={
            data,
            
        }
   
    }
    render(){
        return(
            <View>
            <View style={{
                flexDirection:'row',
                width:'100%',
                height:55,
                backgroundColor:'#fff',
                justifyContent:'center',
                alignItems:'center',
                borderBottomWidth:1,
                borderBottomColor:'#e8e8e8'
              }}>
                <View 
                style={{
                  width:'85%',
                  height:35,
                 
                  paddingLeft:'0%',
                  backgroundColor:'#efeff4',
                  flexDirection:'row'
                }}
                >
                <TextInput 
                  placeholder='请输入商品名称'
                  style={{
                    placeholderTextColor:'#e8e8e8',
                    width:'90%',
                    height:35,
                    backgroundColor:'#efeff4'
                  }}
                />
                <Image source={require('../../assets/搜索.png')} style={{
                  width:15,
                  height:15,
                  top:10
                }} />
                </View>
              </View>
      
              <View style={{
                width:'100%',
                height:55,
                borderBottomWidth:1,
                borderBottomColor:'#e8e8e8',
                flexDirection:"row",
                justifyContent:'space-evenly',
                backgroundColor:'#fff'
              }}>
                <View>
                  <Text style={{fontSize:16,lineHeight:55,color:'red'}}>综合</Text>
                </View>
                <View >
                  <Text style={{fontSize:16,lineHeight:55}}>销量</Text>
                </View>
                <View >
                  <Text style={{fontSize:16,lineHeight:55}}>新品</Text>
                </View>
                <View >
                  <Text style={{fontSize:16,lineHeight:55}}>价格</Text>
                </View>
                <View >
                  <Text style={{fontSize:16,lineHeight:55}}>信用</Text>
                </View>
              </View> 
              
              <ScrollView>
                <View style={{marginTop:10,height:1150,width:'100%',backgroundColor:'#f4f4f4',justifyContent:'space-evenly',flexDirection:'row',flexWrap:'wrap'}}>
                <FlatList
                  numColumns={2}
                  data={this.state.data}
                  renderItem={({item,index})=>(
                    <View style={{width:'45%',height:310,marginLeft:'3%',marginRight:'1%',backgroundColor:'#fff',marginBottom:10}}>
                      <Image  source={item.id} style={{width:'100%',height:'74%'}}/>
                      <Text style={{marginLeft:5,marginRight:5}}>
                        {item.title}
                      </Text>
                      <Text style={{marginTop:10,color:'red',marginLeft:5,marginRight:5}}>
                        {item.money}
                      </Text>
                    </View>
                 )}
                />
                </View>
            </ScrollView>
            </View>
        )
    }
}
