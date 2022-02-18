import React from "react";
import {View , Text , StyleSheet, Image,TouchableOpacity } from "react-native";

const ImageDetail = (props) =>{

    console.log(props);

    return  <View style={{flex:2,flexDirection:"row", alignItems:'center'}}>
            <TouchableOpacity onPress={props.levelHandler}>                 

                <Image style = {imageStyle.style} source={props.imageSource} />
                               
            </TouchableOpacity> 

            <Text style={{backgroundColor:'black',color: 'green'}}> {props.points} points</Text>


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

    }
});

export default ImageDetail;