import { View } from "react-native";
import { WebView } from "react-native-webview";

const TermsConditionScreen = () => {
  return (
    <View className="flex-1 py-safe">
      <WebView
        style={{ flex: 1, backgroundColor: "#fff" }}
        source={{
          uri: "https://about.tetoteto.co.jp/terms-and-conditions/",
        }}
      />
    </View>
  );
};

export default TermsConditionScreen;
