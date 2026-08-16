import { SecondaryButton } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCSSVariable } from "uniwind";

export const ViewAllShopButton = () => {
  const router = useRouter();
  const primaryColor = useCSSVariable("--color-primary") as string;
  return (
    <SecondaryButton
      className="h-8 px-3"
      onPress={() => {
        router.push("/shop");
      }}
    >
      <SecondaryButton.Label>view all</SecondaryButton.Label>
      <SymbolView
        tintColor={primaryColor}
        size={16}
        name={{
          ios: "arrow.right",
          android: "arrow_right_alt",
        }}
      />
    </SecondaryButton>
  );
};
