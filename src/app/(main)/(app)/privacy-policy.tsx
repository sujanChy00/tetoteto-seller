import { View } from "react-native";
import { WebView } from "react-native-webview";

const PrivacyPolicyScreen = () => {
  return (
    <View className="flex-1 py-safe">
      <WebView
        style={{ flex: 1, backgroundColor: "#fff" }}
        source={{ uri: "https://about.tetoteto.co.jp/privacy-policy/" }}
      />
    </View>
  );
};

export default PrivacyPolicyScreen;
