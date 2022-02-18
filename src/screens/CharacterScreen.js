import React, { useState,useReducer } from "react";
import {View, Text, StyleSheet, ScrollView,Button } from "react-native";
import GuageButton from "../components/GuageButton";
import AttributeDetail from "../components/AttributeDetail";
import PlayerPointStatus from "../components/PlayerPointStatus";

const INCREMENT = 10
const STATUS_POWER = 'GROWING IN POWER';
const STATUS_ZERO = "ZERO IN POWER"

const reducer = (state,action ) => {

    switch(action.attributeToChange){

        case "special":    
            if(state.totalPoints - action.amount < 0){
                return state
            }else{

                return (state.special + action.amount > 100 ||state.special + action.amount < 0 ) ?
                 state :   {...state,special : state.special + action.amount,totalPoints:state.totalPoints - action.amount}        
            }

        case "health":  
            
            if(state.totalPoints - action.amount < 0){
                return state

            }else{
                return (state.health + action.amount > 100 || state.health + action.amount < 0 ) ?
                    state : {...state,health : state.health + action.amount,totalPoints:state.totalPoints - action.amount}    

            }            

    case "strength":  
    
            if(state.totalPoints - action.amount < 0){

                return state;
            }else{
                return (state.strength + action.amount > 100 ||state.strength + action.amount < 0 )?
                    state : {...state,strength : state.strength + action.amount,totalPoints:state.totalPoints - action.amount}        

            }
        
    default:
        return state

    }

}

const CharacterScreen = (props) => {

    const playerName = {
        name:'Arnold'}
    const [state,dispatch] = useReducer(reducer,{name:playerName.name,special:0,strength:0,health:0,
                                                totalPoints:props.navigation.getParam('value'),MAX:props.navigation.getParam('value')});
                                                console.log(state);

    return <View style={styles.background}>
        <ScrollView>          
           
                    <PlayerPointStatus text={state.totalPoints === state.MAX ? STATUS_ZERO : STATUS_POWER}/>                    

                    <Text style={styles.textStyle}>Total Points Remaining is {state.totalPoints}</Text>
            <View>
                                                 
                    <AttributeDetail title="health" imageSource={require('../../assets/icons/fighterHealth.png')} />

                    <GuageButton attribute="health"  value={state.health} increase={() =>{dispatch({attributeToChange : "health",amount:INCREMENT});}}
                                                                  decrease={() =>{dispatch({attributeToChange : "health",amount:-1*INCREMENT});}} />
                    <AttributeDetail title="strength" imageSource={require('../../assets/icons/strength.jpg')} />

                    <GuageButton attribute="strength" value={state.strength} increase={() =>{dispatch({attributeToChange : "strength",amount:INCREMENT});}}
                                                                  decrease={() =>{dispatch({attributeToChange : "strength",amount:-1*INCREMENT});}} />                   
                    <AttributeDetail title="specialability" imageSource={require('../../assets/icons/specialAbility.png')} />

                    <GuageButton attribute="special ability"  value={state.special} increase={() =>{dispatch({attributeToChange : "special",amount:INCREMENT});}}
                                                                  decrease={() =>{dispatch({attributeToChange : "special",amount:-1*INCREMENT});}} />

                   <View style={{flex:0.05}}>
                    <Button style={styles.button} title = {state.totalPoints === 0 ? "BEGIN GAME":"USE ALL POINTS"}
                                    onPress = {state.totalPoints === 0 ? () => {props.navigation.navigate("Stage",state)} : ()=>{} }/>
                                   
                    </View>
              
            </View>

        </ScrollView>


    </View>

}

const styles = StyleSheet.create({

    text: {

        margin: 10,
        borderWidth: 10,
        borderColor: 'green',
        padding: 1

    },
    background:{

        flex:1,
        backgroundColor :'gray',
        textShadowColor : 'green',
        textShadowRadius:20
    },
    button:{
        width:20,
        height:50,
    },
    textStyle:{
        fontSize: 50,
        fontStyle:"italic",
        fontWeight :"bold",
        textAlign: 'center',
        textShadowColor : 'green',
        textShadowRadius:20   
    },
    textHeader:{
        fontSize: 20,
        fontStyle:"italic",
        fontWeight :"bold",
        textAlign: 'center',
        textShadowColor : 'green',
        textShadowRadius:20
    }

});

export default CharacterScreen;



