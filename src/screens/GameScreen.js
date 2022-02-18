import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

let promptLog = 'button pressed';
let alertPrompt = 'button pressed';

//<Button title = "ComponentScreen" onPress = {()=> { navigation.navigate("Components")/> 
const GameScreen = (props) => {

  return <View style={{ backgroundColor: 'black', flex: 1 }}>

    <View style={{ flex: 3 }}>

      <Text style={styles.text}> MAN </Text>
      <Text style={styles.text}> Versus
      </Text>
      <Text style={styles.text}> The Predator
      </Text>
      <Image
        style={{
          alignSelf: 'center',
          height: 150,
          width: 150,
          marginTop: 30
        }}
        source={require('../../assets/villainImages/PredatorHome.jpg')} />

    </View>

    <View style={{ flex: 1.25, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { props.navigation.navigate("Difficulty") }}>
        <Image source={require('../../assets/icons/start.jpg')} />
      </TouchableOpacity>
    </View>

  </View>

};

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    textShadowColor: 'green',
    textShadowRadius: 20

  }

});

export default GameScreen;
