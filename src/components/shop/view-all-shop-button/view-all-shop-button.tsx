import { SecondaryButton } from "@/components/ui/button";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { useRouter } from "expo-router";

export const ViewAllShopButton = () => {
  const router = useRouter();
  return (
    <SecondaryButton
      className="h-8 px-3"
      onPress={() => {
        router.push("/shop");
      }}
    >
      <SecondaryButton.Label>view all</SecondaryButton.Label>
      <StyledSymbolView
        tintColorClassName={"accent-primary"}
        size={16}
        name={{
          ios: "arrow.right",
          android: "arrow_right_alt",
        }}
      />
    </SecondaryButton>
  );
};
