import { GhostButton } from "@/components/ui/button";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { useRouter } from "expo-router";

export const ViewAllShopButton = () => {
  const router = useRouter();
  return (
    <GhostButton
      className="h-8 px-3"
      onPress={() => {
        router.push("/shop");
      }}
    >
      <GhostButton.Label>view all</GhostButton.Label>
      <StyledSymbolView
        tintColorClassName={"accent-primary"}
        size={16}
        name={{
          ios: "arrow.right",
          android: "arrow_right_alt",
        }}
      />
    </GhostButton>
  );
};
