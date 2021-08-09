import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header';
import * as Font from 'expo-font';
import { Icon } from 'react-native-elements';
export default class dashboard extends React.Component{
   
    
    constructor(){
        
        super();
        this.state={
        userId:firebase.auth().currentUser.email,
        userName:'',
        currentTime:new Date().getHours(),
        fontsLoaded:false,
        balance:null,
        expense:null,
        income:1,
        buttonClicked:false,
        
        }
      
       
    }
    async loadFonts() {
        await Font.loadAsync({
          // Load a font `Montserrat` from a static resource
          Montserrat: require('../assets/fonts/Montserrat.ttf'),
    
          // Any string can be used as the fontFamily name. Here we use an object to provide more control
          'Montserrat-SemiBold': {
            uri: require('../assets/fonts/Montserrat-SemiBold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Sawarbi':{
            uri: require('../assets/fonts/SawarabiGothic-Regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Dancing':{
            uri: require('../assets/fonts/DancingScript-Bold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'ZenLoop':{
            uri: require('../assets/fonts/ZenLoop-Regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserratBold':{
            uri: require('../assets/fonts/Montserrat-Bold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Abel':{
            uri: require('../assets/fonts/Abel-Regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Teko':{
              uri:require('../assets/fonts/Teko-Bold.ttf'),
              display: Font.FontDisplay.FALLBACK,
          }

        });
        this.setState({ fontsLoaded: true });
      }
    
    GreetUser=()=>{
        if(this.state.currentTime>17 || this.state.currentTime==17){
            return(
                <Text style={style.greetText}>Good Evening!{this.state.userName}</Text>
            )
        }
        else if(this.state.currentTime>12 || this.state.currentTime==12){
            return(
                <Text style={style.greetText}>Good AfterNoon!{this.state.userName}</Text>
            )
        }
        else{
            return(
                <Text style={style.greetText}>Good Morning!{this.state.userName}</Text>
            )
        }
        
       
    }
    displaySavingsCard=()=>{
     return(
         <View style={{backgroundColor:"#738AE1",width:330,height:110,marginLeft:15,justifyContent:"center",marginTop:40,borderRadius:15}}> 
             <Text style={{color:'white',fontFamily:'Montserrat',marginTop:-20,marginLeft:230,fontSize:12}}>Your Savings</Text>
             <Text style={{color:"white",marginLeft:285,marginTop:10}}>₹{this.state.balance}</Text>

         </View>
     )
    } 
    displayIncomeCard=()=>{
        return(
            <View style={{backgroundColor:'#E83C4F',width:150,height:80,marginLeft:15,justifyContent:"center",marginTop:40,borderRadius:15}}>
                <Text style={{marginLeft:10,marginTop:-10,fontFamily:"Abel"}}>Income</Text>
                <Text style={{marginTop:12,marginLeft:10,color:'lightgreen'}}>{this.state.income}</Text>
            </View>
        )
    }
    displayExpenseCard=()=>{
        return(
            <View style={{backgroundColor:"#FED651",width:150,height:80,marginLeft:185,justifyContent:"center",marginTop:-80,borderRadius:15}}>
                <Text style={{marginLeft:10,marginTop:-10,fontFamily:"Abel"}}>Expense</Text>
                <Text style={{marginTop:12,marginLeft:10,color:'red'}}>{this.state.expense}</Text>
            </View>
        )
    }
    
    getUserDetails=async()=>{
      
      await db.collection('users').where("email_id",'==',this.state.userId)  
      .onSnapshot((snapshot)=>{
        
        snapshot.forEach((doc)=>{
            this.setState({
                userName:doc.data().first_name.toUpperCase(),
            
                balance:doc.data().balance,
                income:doc.data().Income,
                expense:doc.data().Expense
             
           })
        
        })
        
    
    })    
    }
 
    displayAddbutton=()=>{
        if(this.state.buttonClicked===false){
        return(
        <View>
            <TouchableOpacity style={{backgroundColor:"#7B93E2",borderRadius:30,width:50,height:50,marginLeft:280,marginTop:190}}
            onPress={()=>{this.setState({buttonClicked:true})}}
            >
                <Text style={{alignSelf:'center',marginTop:-12,fontSize:50,color:"white"}}>+</Text>
                </TouchableOpacity>
        </View>
        )
        }
        else if(this.state.buttonClicked===true){
          return(
            <View style={{backgroundColor:"#83C4FF",width:280,height:280,marginTop:12,marginLeft:75,borderRadius:10}}> 
              <Icon
              name='users'
              type="font-awesome"
              style={{marginTop:20,marginLeft:-210}}
              
              />
              <Text style={{marginTop:-25,marginLeft:110,color:'white'}}>Quick Manager</Text>         
             
             <Text style={{marginTop:0}}>___________________________________________</Text>
     <Text style={{color:"#333333",fontSize:11,marginLeft:20,marginTop:15,fontFamily:'Teko'}}>Add Savings</Text>
     <TouchableOpacity style={{height:40,marginTop:-12}} onPress={()=>{this.props.navigation.navigate('Savings')}}><Text style={{fontSize:15,marginLeft:18,marginTop:10}}>Add Savings Instantly                        $</Text></TouchableOpacity>
    <Text style={{marginTop:-10}}>___________________________________________</Text>
    <Text style={{color:"#333333",fontSize:11,marginLeft:20,marginTop:15,fontFamily:'Teko'}}>Add Income</Text>
    <Icon
     name='credit-card'
     type='font-awesome'
     color="green"
     style={{marginLeft:220,marginTop:0}}
     />
     <TouchableOpacity style={{height:40,marginTop:-12}}><Text style={{fontSize:15,marginLeft:18,marginTop:-10}} onPress={()=>{this.props.navigation.navigate('Income')}}>Add Income Instantly</Text></TouchableOpacity>
     
    <Text style={{marginTop:-30}}>___________________________________________</Text>
    <Text style={{color:"#333333",fontSize:11,marginLeft:20,marginTop:5,fontFamily:'Teko'}}>Add Expense</Text>
    <Icon
     name='credit-card'
     type='font-awesome'
     color="red"
     style={{marginLeft:220,marginTop:0}}
     />
    <TouchableOpacity style={{height:40,marginTop:-12}}><Text style={{fontSize:15,marginLeft:18,marginTop:-10}} onPress={()=>{this.props.navigation.navigate('Expense')}}>Add Expense Instantly</Text></TouchableOpacity>
    
              </View>
          )
        }
    }
    componentDidMount(){
 
        this.getUserDetails()
        console.log(this.state.income)
        this.loadFonts();
       // this.addIncome()
    
    }
    render(){
        return(
            <View>
                <MyHeader title='' />
             {this.GreetUser()}
             <Text style={{marginLeft:33,color:'grey',fontSize:10,fontFamily:"Montserrat-SemiBold"}}>Hope you're doing well today</Text>
              {this.displaySavingsCard()}
              {this.displayIncomeCard()}
              {this.displayExpenseCard()}
              {this.displayAddbutton()}
            </View>
        )
    }
}

const style=StyleSheet.create({
    greetText:{
     fontSize:15,
     marginTop:20,
     marginLeft:30,
     
     fontFamily:"Sawarbi"
    }
})