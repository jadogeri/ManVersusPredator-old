import React from "react";
import {View , Text , StyleSheet, ScrollView , Button, TextInput, Image,TouchableOpacity } from "react-native";

const AttributeDetail = (props) =>{

    console.log(props);

    return  <View style={{flex:2,flexDirection:"row", alignItems:'center',margin:10}}>
            <TouchableOpacity >                 

                <Image style = {imageStyle.style} source={props.imageSource} />
                               
            </TouchableOpacity> 

            <Text style={{backgroundColor:'black',color: 'green'}}> {props.points}</Text>


            </View>

                
           
};

const style1 = StyleSheet.create({

    text: {
        fontSize: 30,
        fontStyle:"italic",
        fontWeight :"bold",
        textAlign: 'center',
        textShadowColor : 'white'
        
    }
});

const imageStyle = StyleSheet.create({   

    style:{  
        
        height:80,
        width:80

    }
});

export default AttributeDetail;