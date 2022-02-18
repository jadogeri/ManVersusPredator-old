import React from "react";
import { Text, StyleSheet,View,Button,TouchableOpacity,Image } from "react-native";

const GuageButton = (props) => {
// printing out props to the command line
  console.log(props);

  return <View  style ={styles1.text}>                            
                            <TouchableOpacity onPress={props.decrease}  >
                                <Image style ={styles.imageStyle} source={require('../../assets/icons/minusSign.png')}/>

                            </TouchableOpacity>

                            <Text style={styles.textStyle}> The current {props.attribute} is {props.value}</Text> 

                                            
                            <TouchableOpacity onPress={props.increase} >
                                <Image style ={styles.imageStyle} source={require('../../assets/icons/plusSign.png')}/>

                            </TouchableOpacity>

                                   
          </View>
  
};

const styles2 = StyleSheet.create({
  text: {
    fontSize: 30,
    color : "#700",  
    fontStyle: 'italic' 

  }
});

const styles1 = StyleSheet.create({
  text: {
    fontSize: 30,
    color : "#00f",  
    flexDirection : 'row'
  }
});

const styles3 = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle:"italic",
    fontWeight :"bold",
    textAlign: 'center',
    textShadowColor : '#ff0',
    textShadowRadius:20
   

  }

  
});

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
    fontStyle:"italic",
    fontWeight :"bold",
    textAlign: 'center',
    textShadowColor : 'green',
    textShadowRadius:20
   

  } , imageStyle:{

    height:40,
    width:40
  },
  textStyle:{

    fontSize: 20,
    fontStyle:"italic",
    fontWeight :"bold",
    textAlign: 'center',
    textShadowColor : 'white',
    textShadowRadius:20
   
  }



});

export default GuageButton;
