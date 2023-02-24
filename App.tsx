import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AllPlaces } from "./screens/AllPlaces";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddPlace } from "./screens/AddPlace";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllPlaces" component={AllPlaces} />
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});