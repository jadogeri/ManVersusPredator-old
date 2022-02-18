import React from "react";
import { Text, StyleSheet, View, Button, ScrollView, TouchableOpacity, Touchable } from "react-native";

const GameStatusText = (props) => {
  // printing out props to the command line
  console.log(props);

  return <View >

    <Text style={style.dimension}> {props.textOnScreen}

    </Text>

  </View>

};

const style = StyleSheet.create({
  dimension: {
    fontSize: 20,
    color: "gold",
    fontStyle: 'italic'

  }
});

const styles1 = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#00f",

  }
});

const styles3 = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    textShadowColor: '#ff0',
    textShadowRadius: 20


  }


});

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowRadius: 20


  }



});

export default GameStatusText
