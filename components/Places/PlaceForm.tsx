import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

export const PlaceForm: FC = () => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const changeTitleHandler = () => {
    setEnteredTitle(enteredTitle);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.label}>
        <Text style={styles.input}>Title</Text>
        <TextInput onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
