import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header';
import * as Font from 'expo-font';
import { Icon } from 'react-native-elements';

export default class Expense extends React.Component{
    render(){
        return(
            <View>
                      <MyHeader title=""/>
                <Text>Hi</Text>
            </View>
        )
    }
}