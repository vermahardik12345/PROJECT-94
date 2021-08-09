import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import React ,{Component} from 'react';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from 'expo-font';
const {width,height} =Dimensions.get('window')

export default class Welcome extends React.Component{
  constructor(){
    super()
    this.state={
      fontsLoaded:false
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
      }

    });
    this.setState({ fontsLoaded: true });
  }

    componentDidMount(){
        console.log(width,height/35.9)
        this.loadFonts();
    }
    render(){
        
        return(
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.logIntext}>LogIn in to app or sign up for the app and enjoy the experience </Text>
          <Image
          source={require('../assets/Illustration.png')}
          style={styles.image}
          />
          <TouchableOpacity style={styles.loginbutton} onPress={()=>{this.props.navigation.navigate('Login')}}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
         
        </View>
        )
    }
}
const styles = StyleSheet.create({
welcomeText:{
color:"black",
textAlign:"center",
marginTop:120,
fontFamily:'Montserrat',
fontSize:30
},
logIntext:{
  textAlign:"center",
  color:"grey",
  marginTop:20,
  fontFamily:'Montserrat-SemiBold',
  fontSize:12
},
image:{
  width:250,
  height:250,
  alignSelf:"center",
  marginTop:50
},
loginbutton:{
  backgroundColor:"#FFEB3A",
  height:50,
  width:250,
  borderBottomRightRadius:30,
  borderBottomLeftRadius:30,
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  alignSelf:"center",
  marginTop:40,
 
  borderColor:"black",
  shadowColor:"black",
  shadowOffset:{width:0,height:6},
  shadowOpacity:1,
  shadowRadius:80,


},
signupbutton:{
  backgroundColor:"#FFEB3A",
  height:50,
  width:250,
  borderBottomRightRadius:30,
  borderBottomLeftRadius:30,
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  alignSelf:"center",
  marginTop:10,
  borderColor:"blue", 
  shadowColor:"black",
  shadowOffset:{width:0,height:6},
  shadowOpacity:1,
  shadowRadius:80,

},
loginButtonText:{
textAlign:"center",
marginTop:12,
fontFamily:"Montserrat"
}
  });