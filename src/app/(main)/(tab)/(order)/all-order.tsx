import MoreVert from "@expo/material-symbols/more_vert.xml";
import Share from "@expo/material-symbols/share.xml";
import { Stack } from "expo-router";
import { useState } from "react";

const AllOrderScreen = () => {
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name");
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  return (
    <Stack.Toolbar>
      <Stack.Toolbar.Menu icon={Share} inline title="Sort By">
        {/* Inline submenu - options appear directly in the menu */}
        <Stack.Toolbar.MenuAction
          isOn={sortBy === "name"}
          onPress={() => setSortBy("name")}
        >
          Name
        </Stack.Toolbar.MenuAction>
        <Stack.Toolbar.MenuAction
          isOn={sortBy === "date"}
          onPress={() => setSortBy("date")}
        >
          Date
        </Stack.Toolbar.MenuAction>
        <Stack.Toolbar.MenuAction
          isOn={sortBy === "size"}
          onPress={() => setSortBy("size")}
        >
          Size
        </Stack.Toolbar.MenuAction>
      </Stack.Toolbar.Menu>
      <Stack.Toolbar.Spacer />
      <Stack.Toolbar.Button icon={MoreVert} onPress={() => {}} />
    </Stack.Toolbar>
  );
};

export default AllOrderScreen;
