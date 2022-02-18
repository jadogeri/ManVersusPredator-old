import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import GameDifficultyScreen from "./src/screens/GameDifficultyScreen";
import GameScreen from "./src/screens/GameScreen"
import CharacterScreen from "./src/screens/CharacterScreen"
import StageScreen from "./src/screens/StageScreen";

//in this file we have three route names
//Home, components and Lists are keys ** route names**
// which will be diplayed to the screen immediately using navigate function
const navigator = createStackNavigator(
  {
    Difficulty : GameDifficultyScreen,
    Game:GameScreen,
    character:CharacterScreen,
    Stage:StageScreen        
   
  },
  {
    initialRouteName: "Game",
    defaultNavigationOptions: {
      title: "Man Versus The Predator",
    },
  }
);


export default createAppContainer(navigator);
