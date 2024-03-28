import React, {
  StyleSheet,
} from 'react-native';
import Homescreen from './screens/homescreen';
import Game from './screens/game';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import Store from './store/configStore';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <PaperProvider> 
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Game" component={Game}/>
        <Stack.Screen name="Homescreen" component={Homescreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
