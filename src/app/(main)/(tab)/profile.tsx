import { Stack } from "expo-router";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View className="p-safe-offset-16">
      <Stack.SearchBar
        placeholder="Search..."
        barTintColor={"red"}
        onChangeText={(text) => console.log(text)}
      />
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
