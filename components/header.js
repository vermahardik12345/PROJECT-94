import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert,SafeAreaView} from 'react-native';
import db from '../config'

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      value:''
    }
  }






 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}/>
         <Badge
          value='0'
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        
        <Header
          leftComponent={<Icon name='bars' type='font-awesome' color='#696969'/>}
          centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#ffffff"
          containerStyle={{marginTop:50}}
        />

)
}

}