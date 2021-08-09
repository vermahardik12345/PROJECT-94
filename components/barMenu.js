import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import React from 'react';
import firebase, { storage } from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import {Icon} from 'react-native-elements';
import db from '../config';
import { RFValue } from "react-native-responsive-fontsize";
export default class Menu extends React.Component{
    constructor(){
        super();
        this.state={
            img:'#',
            userId:firebase.auth().currentUser.email,
            userName:'',
            docid:''
        }
    }
    getuserprofile=async()=>{
        db.collection('users').where("email_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    userName:doc.data().first_name.toUpperCase()+' '+doc.data().last_name.toUpperCase(),
                       docid:doc.id,
                       //img:doc.data().image()
                 
               })
            
            })
            
        
        })    
       
    }
    uploadimage=async(uri,imagename)=>{
        var response=await fetch(uri)
        var blob=await response.blob();
        const ref=firebase.storage().ref().child("user_profile"+imagename)
    
        return ref.put(blob).then((response)=>{
            this.fetchimage(imagename)
        })
    }

    fetchimage=async(imagename)=>{
        const storageref= firebase.storage().ref().child("user_profile"+imagename)

        //get the downlaod url
    storageref
    .getDownloadURL()
    .then((url)=>{this.setState({img:url})
    })
    .catch((error)=>{
        this.setState({image:'#'})
    } 
    )
    }



    selectimage=async()=>{
       const{cancel,uri}=await ImagePicker.launchImageLibraryAsync({
           mediaTypes:ImagePicker.MediaTypeOptions.All,
           allowsEditing:true,
           aspect:[4,5],
           quality:1


       })
       if(!cancel){
         this.uploadimage(uri,this.state.userId)
       }

    }
    componentDidMount(){
        this.fetchimage(this.state.userId)
        this.getuserprofile()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.3, backgroundColor:"#ffffcc",justifyContent:"center",alignItems:"center",marginTop:0,marginLeft:-120}}>


            <Avatar
            rounded
            source={{
             uri:this.state.img
            }}
            size={'large'}
            onPress={
                ()=>{
                this.selectimage()
                }
            }
            showEditButton
            containerStyle={{marginLeft:-70}}
            />
              
            
            <Text style={{fontWeight:"bold",fontSize:RFValue(20),color:'#000',padding:RFValue(15)}}>{this.state.userName}</Text>
            </View>
            <View style={styles.drawerItemsContainer}>
                
                
            
                
            <TouchableOpacity
               style={styles.logoutbutton}
               onPress={()=>{
                this.props.navigation.navigate('Signup')
                firebase.auth().signOut()
               }}>
               <Icon
               name="logout"
               type="antdesign"
               size={RFValue(20)}
               iconStyle={{paddingLeft:RFValue(12),marginTop:65,marginLeft:-240}}
           

               />
            
            <Text
              style={{fontSize: RFValue(15),fontWeight: "bold",marginLeft: RFValue(30),
              }}>Log Out</Text>  
              </TouchableOpacity>          
               </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },

logoutbutton:{
        width:'85%',
        height:30,
        justifyContent:"center",
 
        marginTop:30,
        marginLeft:20
    },
    text:{
fontSize:20,
fontWeight:"bold",
color:"black"
    },
    avatarImage:{
        flex: 1,
        width: "25%",
        height: "0%",
        marginLeft: 70,
        marginTop: 30,
        borderRadius: 40,
        

    },
    drawerItemsContainer: {
        flex: 0.8,
        backgroundColor:'#ffffcc',
        
      },

}
)