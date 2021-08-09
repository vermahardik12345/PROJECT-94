import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import { Input ,Icon} from 'react-native-elements';
import firebase from 'firebase'
import db from '../config'
export default class LogIn extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
   password:'',
   isModalVisible:false,
   firstName:'',
   lastName:'',
   mobileNum:"",
   confirmPassword:'',
   address:""
        }
    }
   signUp=(email,password,confirmPassword)=>
    {
    if(password!==confirmPassword){
    return alert("Your password does not match")
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>
    {
 
      db.collection("users").add(
        {
           'first_name':this.state.firstName,
           'last_name':this.state.lastName ,
            'mobile_num':this.state.mobileNum,
            'balance':0,
            'email_id':this.state.emailId,
            'Income':0,
            'Expense':0
          
           
        })
        return alert("User Added Successfully",
        "",
        [
            {text:'OK',onPress:()=>this.setState({isModalVisible:false})}
        ]
        )
    })
    .catch((error)=>
    {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage)
        
    }
    )
  
   
 
 }
 }
 displayModal=()=>{
    console.log(this.state.isModalVisible)
      return(
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          >
        <View style={styles.modalContainer}>
            <ScrollView style={{width:'80%'}}>
              <KeyboardAvoidingView style={{alignItems:"center",justifyContent:"center"}}>
         
                <Text style={styles.modalTitle}>Registration Form</Text>
               
              
               <TextInput
               style={styles.formTextInput}
               placeholder="first_name"
               maxLength={8}
               onChangeText={(text)=>{this.setState({firstName:text})}}
               />
                <TextInput
                  style={styles.formTextInput}
               placeholder="last_name"
               maxLength={8}
               onChangeText={(text)=>{this.setState({lastName:text})}}
               />
                <TextInput
                  style={styles.formTextInput}
               placeholder="email_address"
              keyboardType={'email-address'}
               onChangeText={(text)=>{this.setState({emailId:text})}}
               />
                <TextInput
                  style={styles.formTextInput}
               placeholder="mobile"
               maxLength={10}
               onChangeText={(text)=>{this.setState({mobileNum:text})}}
               />
               
                <TextInput
                  style={styles.formTextInput}
               placeholder="Password"
               secureTextEntry={true}
               onChangeText={(text)=>{this.setState({password:text})}}
               />
                <TextInput
                  style={styles.formTextInput}
               placeholder="Confirm_Password"
               secureTextEntry={true}
               onChangeText={(text)=>{this.setState({confirmPassword:text})}}
               />
               <TouchableOpacity style={styles.registerButton}
    
               onPress={()=>{
                 
                 this.signUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}
               
               ><Text >Submit</Text></TouchableOpacity>
               <TouchableOpacity style={styles.cancelButton}
               onPress={()=>{this.setState({isModalVisible:false})}}
               ><Text>cancelButton</Text></TouchableOpacity>
               </KeyboardAvoidingView>
                </ScrollView>
                </View>
                </Modal>
      )
    }
    signIn=async(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            return(alert('Logged In')),
            this.props.navigation.navigate('dashboard')
        }
        )
        .catch((error)=>{
            var errorCode = error.code;
   var errorMessage = error.message;
   return alert(errorMessage)
        })
    }
    render(){
        return(
            <View>
                <Text style={{marginTop:120,textAlign:'center',fontWeight:"bold",fontSize:25,color:"#000000"}}>Login</Text>
                 <Text style={{marginTop:10,textAlign:'center',fontSize:10,color:"grey"}}>Login to your account</Text>
                 <Input
                 label="Email"
                placeholder="email@address.com"
                onChangeText={(text)=>this.setState({emailId:text})}
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
                 label="Password"
                placeholder="password"
                secureTextEntry={true}
                containerStyle={{width:300,marginTop:-10,alignSelf:'center'}}
                onChangeText={(text)=>this.setState({password:text})}
                 leftIcon={
                  <Icon
                  name="lock"
                  type="font-awesome"
                  
                  />
                 }
                 />

                 <TouchableOpacity style={styles.loginButton} onPress={()=>{this.signIn(this.state.emailId,this.state.password)}}> 
                     <Text style={styles.loginbuttontext}>Login</Text>
                 </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20,marginLeft:70}}>
                    <Text>Don't have an account?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:215,marginTop:-19}} onPress={()=>this.setState({isModalVisible:true})}>
                    <Text style={{fontWeight:"bold"}}>Sign up</Text>
                </TouchableOpacity>
                 <Image
                 source={require('../assets/background.png')}
                 style={{width:400,height:300,marginTop:15,marginLeft:-5}}
                 />
               {this.displayModal()}
            </View>
        )
    }
}


const styles=StyleSheet.create({
    loginButton:{
        backgroundColor:"#69F0AE",
        height:50,
        width:250,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        alignSelf:"center",
        marginTop:0,
       
        borderColor:"black",
        shadowColor:"black",
        shadowOffset:{width:0,height:6},
        shadowOpacity:1,
        shadowRadius:80,
        borderTopColor:"black",
        
    },
    loginbuttontext:{
textAlign:"center",
marginTop:13,
fontWeight:"bold",
fontSize:15
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      }
 
})