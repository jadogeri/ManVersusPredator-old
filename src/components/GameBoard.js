import React from "react";
import { Text, StyleSheet,View,Button,ScrollView,TouchableOpacity, Touchable, TextPropTypes } from "react-native";

const GameBoard = (props) => {
// printing out props to the command line

  console.log(props);

return <View style = {styles.gameStyle}>

                  <Text style = {styles.board}> {props.contestantName} </Text>
                  <Text style = {styles.board}> HEALTH {props.contestantHealth}  </Text>
                  <Text style = {styles.board}> STRENGTH {props.contestantStrength}  </Text>
                  <Text style = {styles.board}> SPECIAL ABILITY {props.contestantSpecial}  </Text>                   
               
          </View>  
};

const styles = StyleSheet.create({
 
 gameStyle:{

    backgroundColor:'yellow',
    width:200,
    height:90

     

 },
 
  text: {
    fontSize: 30,
    color : "#700",  
    fontStyle: 'italic' 
  },
  board:{

    borderWidth:0.5,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderLeftColor:'black',
    borderColor :'black'
  }
});

const styles1 = StyleSheet.create({
  text: {
    fontSize: 30,
    color : "black",  

  }
});


export default GameBoard;