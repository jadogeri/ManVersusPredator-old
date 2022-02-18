import React, { useReducer } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import GameBoard from "../components/GameBoard";
import ButtonController from "../components/ButtonController"
import GameStatusText from "../components/GameStatusText";


const gameOverPrompt = (health, name) => {

    const verdict = [` ${name} WON`, `${name} LOST`]

    if (health > 0)
        return verdict[0]
    else
        return verdict[1]
}
const buttonPressed = {

    SPECIAL: 15,
    LAUNCHER: 12,
    GRENADE: 11,
    MACHINEGUN: 10,
    HEAL: 10,
    FIRE: 9,
    KNIFE: 7,
    PUNCH: 5
}
////////////////////monster data//////////////

//level of Predato strength and health will
// be dependent on the user game level

let monsterHealRate;
let monsterStrengthRate;
let monsterAbilityRate;
let monsterMessage = ``;
let randomAttackValue = 0;
let monsterAbilityUsed = 0;

let randomAttack = {
    bite: 9,
    punch: 5,
    ricochet: 3,
    graze: 1,
    miss: 0,
    laser: 15,
    spear: 7,
}

function gameSetting(state) {

    //setting the rate based on game difficulty
    if (state.level === 250) {
        monsterHealRate = 4
        monsterStrengthRate = 2
        monsterAbilityRate = 3

    }
    else if (state.level === 200) {
        monsterHealRate = 7
        monsterStrengthRate = 6
        monsterAbilityRate = 7

    }
    else {
        monsterHealRate = 9
        monsterStrengthRate = 9
        monsterAbilityRate = 9

    }

    let attack = Object.keys(randomAttack)
    const damage = attack[Math.floor(Math.random() * attack.length)]
    //assign the value for the random hit
    randomAttackValue = randomAttack[damage]

    //assigning new rate for the monster
    // to keep attributes <= 100
    if (state.monsterHealth === 100) {
        monsterHealRate = 0;
    } else {
        if (monsterHealRate + state.monsterHealth >= 100)
            monsterHealRate = 100 - state.monsterHealth
    }

    if (state.monsterStrength === 100) {
        monsterStrengthRate = 0;
    } else {
        if (monsterStrengthRate + state.monsterStrength >= 100)
            monsterStrengthRate = 100 - state.monsterStrength
    }

    if (state.monsterAbility === 100) {
        monsterAbilityRate = 0;
    } else {
        if (monsterAbilityRate + state.monsterAbility >= 100)
            monsterAbilityRate = 100 - state.monsterAbility
    }
    //random messages displayed on phone

    if (randomAttackValue === 0) {
        monsterAbilityUsed = 0

        monsterMessage = `${state.monsterName}  missed you , the\n ${state.monsterName}
    healed by ${monsterHealRate}  `
    }
    else if (randomAttackValue === 1) {
        monsterAbilityUsed = 0

        monsterMessage = `${state.monsterName}  ${damage} you , taking ${randomAttackValue} points the\n ${state.monsterName}
   healed by ${monsterHealRate}  `
    }
    else if (randomAttackValue === 3)
        monsterMessage = `${state.monsterName}  ${damage} you , taking ${randomAttackValue} points the\n ${state.monsterName}
    healed by ${monsterHealRate}  `

    else if (randomAttackValue === 5) {
        monsterAbilityUsed = 0

        monsterMessage = `${state.monsterName}  ${damage} you , taking ${randomAttackValue} points the\n ${state.monsterName}
    healed by ${monsterHealRate}  `
    }

    else if (randomAttackValue === 7) {
        monsterAbilityUsed = 0

        monsterMessage = `${state.monsterName}  ${damage} you , taking ${randomAttackValue} points the\n ${state.monsterName}
    healed by ${monsterHealRate}  `
    }

    else if (randomAttackValue === 9) {
        monsterAbilityUsed = 0

        monsterMessage = `${state.monsterName}  ${damage} you , taking ${randomAttackValue} points the\n ${state.monsterName}
    healed by ${monsterHealRate}  `
    }
    else {
        if (state.monsterAbility < randomAttack.laser) {
            monsterAbilityUsed = 0
            monsterMessage = `${state.monsterName} cause 0 damage using ${damage} on ${state.fighterName} 
        `

        } else {
            monsterAbilityUsed = randomAttack.laser
            monsterMessage = `${state.monsterName} used special ability ${damage} on ${state.fighterName} , taking ${randomAttackValue} points the\n ${state.monsterName}
    healed by ${monsterHealRate}  `
        }
    }

}

const reducer = (state, action) => {

    gameSetting(state);

    switch (action.attributeToUse) {

        case "health":

            if (state.fighterHealth === 100) {
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} is at full health`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    monsterPrompt: monsterMessage,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed
                }

            } else {
                if (state.fighterHealth + action.amount > 100 && state.fighterStrength >= action.amount)
                    return {
                        ...state,
                        fighterPrompt: ` ${state.fighterName} is at full health  invincible`,
                        fighterStrength: state.fighterStrength,
                        fighterAbility: state.fighterAbility,
                        monsterPrompt: monsterMessage,
                        monsterHealth: state.monsterHealth + monsterHealRate,
                        fighterHealth: 100 - randomAttackValue,
                        monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                        monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                    }
                else if (state.fighterHealth + action.amount < 100 && state.fighterStrength >= action.amount)
                    return {
                        ...state,
                        fighterPrompt: ` ${state.fighterName} increased health by ${action.amount}`,
                        fighterStrength: state.fighterStrength,
                        fighterAbility: state.fighterAbility,
                        monsterPrompt: monsterMessage,
                        monsterHealth: state.monsterHealth + monsterHealRate,
                        fighterHealth: state.fighterHealth - randomAttackValue + action.amount,
                        monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                        monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                    }
                else
                    return {
                        ...state,
                        fighterPrompt: ` ${state.fighterName} not enough strength to heal `,
                        fighterStrength: state.fighterStrength + 10,
                        fighterAbility: state.fighterAbility,
                        monsterPrompt: monsterMessage,
                        monsterHealth: state.monsterHealth + monsterHealRate,
                        fighterHealth: state.fighterHealth - randomAttackValue + action.amount,
                        monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                        monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                    }
            }

        case "fire":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} lacks the fire to burn the Predator`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }
            else
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} points of fire to burn the Predator`,
                    fighterStrength: state.fighterStrength - action.amount,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate - action.amount,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }
        case "gun":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} lacks the ammo to hurt the Predator`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }
            else
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} points of bullets hurt the Predator`,
                    fighterStrength: state.fighterStrength - action.amount,
                    monsterHealth: state.monsterHealth - action.amount + monsterHealRate,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate,

                }
        case "grenade":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} lacks strength to use a grenade`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate
                }
            else
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} points to blow up the Predator`,
                    fighterStrength: state.fighterStrength - action.amount,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate - action.amount,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }
        case "punch":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} lacks strength to fight the Predator`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate
                }
            else
                return {
                    ...state,
                    monsterHealth: state.monsterHealth - action.amount,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} points of punching the Predator`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }
        case "knife":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} is weak to use a knife`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate
                }
            else
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} sharp knife to slash the Predator`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate - action.amount,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate


                }
        case "launcher":
            if (state.fighterStrength < action.amount)
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} is out of grenade lauchers ammo`,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue + action.amount,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate
                }
            else
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} points of grenades propelled against the Predator`,
                    fighterStrength: state.fighterStrength - action.amount,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate - action.amount,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate

                }

        case "special":
            if (state.fighterAbility < action.amount) {
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} not enough strength to use special `,
                    fighterStrength: state.fighterStrength,
                    fighterAbility: state.fighterAbility,
                    monsterPrompt: monsterMessage,
                    monsterHealth: state.monsterHealth + monsterHealRate,
                    fighterHealth: state.fighterHealth - randomAttackValue,
                    monsterStrength: state.monsterStrength - randomAttackValue + monsterStrengthRate,
                    monsterAbility: state.monsterAbility - monsterAbilityUsed + monsterAbilityRate
                }

            } else {
                return {
                    ...state,
                    fighterPrompt: ` ${state.fighterName} used ${action.amount} volts against the predator`,
                    fighterAbility: state.fighterAbility - action.amount,
                    fighterHealth: state.fighterHealth + action.amount,
                    fighterStrength: state.fighterStrength,
                    monsterHealth: state.monsterHealth - action.amount,
                    monsterPrompt: `the predator is hurt bad by ${state.fighterName}`

                }
            }

        default:

            return state
    }
}

const StageScreen = (props) => {
    //props.navigation.getParam('value'),MAX:props.navigation.getParam('value')
    const [state, dispatch] = useReducer(reducer, {
        fighterPrompt: 'fight in commence what would you like to do',
        monsterPrompt: 'Predator is ready for battle',
        fighterHealth: props.navigation.getParam('health'),
        fighterAbility: props.navigation.getParam('special'),
        fighterStrength: props.navigation.getParam('strength'),
        monsterName: "Predator",
        monsterHealth: 50,
        monsterAbility: 50,
        monsterStrength: 50,
        fighterName: props.navigation.getParam('name'),
        level: props.navigation.getParam('MAX')
    });

    return <View style={styles.gameScreenStyle}>

        <View style={styles.statsBoard}>
            <GameBoard contestantName={state.fighterName} contestantHealth={state.fighterHealth}
                contestantStrength={state.fighterStrength} contestantSpecial={state.fighterAbility} />
            <GameBoard contestantName={state.monsterName} contestantHealth={state.monsterHealth}
                contestantStrength={state.monsterStrength} contestantSpecial={state.monsterAbility} />

        </View>

        <View style={styles.fighterImageStyle}>
            <Image source={(state.fighterHealth > 0) ?
                require('../../assets/villainImages/arnold.jpg') :
                require('../../assets/villainImages/arnold2.jpg')}

                style={styles.image} />
            <Image source={(state.monsterHealth > 0) ?
                require('../../assets/villainImages/Predator.jpg') :
                require('../../assets/villainImages/Predator2.jpg')}
                style={styles.image} />
        </View>
        <View style={{ borderColor: 'black', flex: 0.75 }}>

            <GameStatusText textOnScreen={(state.monsterHealth > 0 && state.fighterHealth > 0) ?
                state.fighterPrompt : gameOverPrompt(state.fighterHealth, state.fighterName)} />
            <GameStatusText textOnScreen={(state.monsterHealth > 0 && state.fighterHealth > 0) ?
                state.monsterPrompt : gameOverPrompt(state.monsterHealth, state.monsterName)} />
        </View>

        <View style={{ flex: 0.5, backgroundColor: 'black', margin: 1, alignItems: 'center', paddingBottom: 1 }}>
            <View style={styles.buttons} >
                <ButtonController imageSource={require('../../assets/weaponImages/grenade.png')} buttonHandler={() => { dispatch({ attributeToUse: "grenade", amount: buttonPressed.GRENADE }); }} />

                <ButtonController imageSource={require('../../assets/weaponImages/Fireball.jpg')} buttonHandler={() => { dispatch({ attributeToUse: "fire", amount: buttonPressed.FIRE }); }} />

                <ButtonController imageSource={require('../../assets/weaponImages/gun.jpg')} buttonHandler={() => { dispatch({ attributeToUse: "gun", amount: buttonPressed.MACHINEGUN }); }} />

                <ButtonController imageSource={require('../../assets/weaponImages/fight.jpg')} buttonHandler={() => { dispatch({ attributeToUse: "punch", amount: buttonPressed.PUNCH }) }} />

            </View>
            <View style={styles.buttons} >
                <ButtonController imageSource={require('../../assets/weaponImages/healthPack.png')} buttonHandler={() => { dispatch({ attributeToUse: "health", amount: buttonPressed.HEAL }); }
                } />

                <ButtonController imageSource={require('../../assets/weaponImages/grenadeLauncher.jpg')} buttonHandler={() => { dispatch({ attributeToUse: "launcher", amount: buttonPressed.LAUNCHER }); }} />

                <ButtonController imageSource={require('../../assets/weaponImages/knife.jpg')} buttonHandler={() => { dispatch({ attributeToUse: "knife", amount: buttonPressed.KNIFE }); }} />

                <ButtonController imageSource={require('../../assets/weaponImages/specialAbility.png')} buttonHandler={() => { dispatch({ attributeToUse: "special", amount: buttonPressed.SPECIAL }) }} />

            </View>

        </View>

    </View>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 5,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: 'black'
    },
    gameScreenStyle: {
        backgroundColor: 'red',
        margin: 5,
        flex: 1

    },
    style1: {
        fontSize: 5,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: 'center'

    },
    edge: {

        flex: 1,
        fontSize: 1,
        fontStyle: "italic",
        fontWeight: "bold"

    },
    board1: {

        //flexDirection:"row",
        margin: 5

    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        margin: 1,
        alignItems: 'center',
    },
    statsBoard: {
        margin: 1,
        flex: 0.,
        flexDirection: 'row'
    },
    fighterImageStyle: {
        flex: 1,
        flexDirection: 'row',
        margin: 2


    },
    gamePrompt: {

        flex: 1,
        backgroundColor: 'blue'
    },
    gameStatus: {
        flex: 1,
        backgroundColor: 'pink'
    },
    image: {
        margin: 1,
        width: 197,
        height: 290

    }
});

export default StageScreen;
