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
import { Colors } from "./constants/Colors";
import { Map } from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((error) => console.error(error));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
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
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add New Place" }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: "Map View" }}
          />
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
