import React from "react";
import { Text, StyleSheet,View } from "react-native";

const PlayerPointStatus = (props) => {
 
  return <View >

                  <Text style = {styles.text}> {props.text} </Text>                 
               
          </View>
  
};

const styles = StyleSheet.create({
 
 
  text: {
    fontSize: 30,
    color : "#700",  
    fontStyle: 'italic' 
  }
});


export default PlayerPointStatus;