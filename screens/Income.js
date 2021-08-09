import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header';
import * as Font from 'expo-font';
import { Icon } from 'react-native-elements';
import { Input } from 'react-native-elements';
export default class Income extends React.Component{
    constructor(){
        super();
        this.state={
            amount:'',
            category:'',
            userId:firebase.auth().currentUser.email,
            balance:'',
        }
    }
    getUserDetails=async()=>{
      
        await db.collection('users').where("email_id",'==',this.state.userId)  
        .onSnapshot((snapshot)=>{
          
          snapshot.forEach((doc)=>{
              this.setState({
                 
              
                  balance:doc.data().balance,
                   
               
             })
          
          })
          
      
      })    
      }
    
    updateIncome(){
       db.collection('users').where("email_id","==",this.state.userId).get()
    .then()
 .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        db.collection('users').doc(doc.id).update({
            Income:this.state.amount,
            balance:this.state.amount
      })
    })
  })
 
    }
    render(){
        return(
            <View>
                <MyHeader title=""/>
                <Text style={{marginLeft:130,marginTop:20}}>Add Income</Text>
                <Input
                 label="Amount"
                placeholder="eg:200"
                onChangeText={(text)=>this.setState({amount:text})}
                keyboardType={'email-address'}
                containerStyle={{width:300,marginTop:20,alignSelf:'center'}}
                 leftIcon={
                  <Icon
                  name="envelope"
                  type="font-awesome"
                  
                  />
                 }
                 />
                  <Input
                 label="Category"
                placeholder="eg:Salary"
                secureTextEntry={true}
                containerStyle={{width:300,marginTop:-10,alignSelf:'center'}}
                onChangeText={(text)=>this.setState({category:text})}
                 leftIcon={
                  <Icon
                  name="lock"
                  type="font-awesome"
                  
                  />
                 }
                 />
                 <TouchableOpacity style={{marginLeft:160,marginTop:50,backgroundColor:"aqua",width:100,height:40}} onPress={()=>{
                     this.updateIncome()
                 }}><Text>Add</Text></TouchableOpacity>
            </View>
        )
    }
}
