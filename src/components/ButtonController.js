import React from "react";
import {StyleSheet,TouchableOpacity,Image } from "react-native";
 
const ButtonController = (props) => {
// printing out props to the command line
  console.log(props);
 
  return   (
                                
                    <TouchableOpacity style={styles.text} onPress = {props.buttonHandler}>

                        <Image style = {imageStyle.style} source={props.imageSource} />
                                                  
                     </TouchableOpacity>    
               
  )
  
};

const styles = StyleSheet.create({
  text: {
    height:40,
    width:75,
    margin : 15   
  } 

});

const imageStyle = StyleSheet.create({

    style:{

        width :70,
        height :50,
        margin:1,
      
    }
});

export default ButtonController;
