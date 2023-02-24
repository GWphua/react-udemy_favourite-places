import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AllPlaces } from "./screens/AllPlaces";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AddPlace } from "./screens/AddPlace";
import { IconButton } from "./components/UI/IconButton";
import { RootStackParamList } from "./models/rootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor ? tintColor : "white"}
                  onPress={() =>
                    (
                      navigation as NativeStackNavigationProp<
                        RootStackParamList,
                        "AllPlaces",
                        undefined
                      >
                    ).navigate("AddPlace")
                  }
                />
              ),
            })}
          />
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
