import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/routes/index';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"auto"}/>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>



  )
}