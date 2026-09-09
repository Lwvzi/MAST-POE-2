import React, { useState } from "react";
// NavigationContainer tracks rendering contexts across our structural views
import { NavigationContainer } from "@react-navigation/native";
// createNativeStackNavigator provides real native hardware screen sliding animations
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Import the strict item schema shape from the root data folder
import { MenuItem } from "./types";
// Import your completed page screens directly from your project folders
import MenuListScreen from "./Screens/MenuListScreen";
import AddDishScreen from "./Screens/AddDishScreen";

// Explicit type catalog defining parameter states available inside the router system
export type RootStackParamList = {
  MenuList: undefined; // undefined ensures that no entry state arguments are needed to navigate
  AddDish: undefined;
};

// Initializes the physical Stack module tracking active views across our application
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Master database array configuration tracking our list items globally
  // We populate it with a small mock dataset so the app isn't blank on launch
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Panko Crumbed Calamari",
      description: "Served with homemade garlic aioli and a fresh lemon wedge.",
      course: "Starter",
      price: 85.0,
    },
    {
      id: "2",
      name: "Flame Grilled Rump Steak",
      description:
        "300g choice cut rump steak served with truffle mushroom sauce and hand-cut chips.",
      course: "Main",
      price: 210.0,
    },
  ]);

  // Handler function adds a new item onto the end of our current array data safely
  const handleAddDish = (newItem: MenuItem) => {
    // Crucial React pattern: using the spread operator (...) ensures a brand-new array
    // reference is created so that React detects the state update and triggers a re-render
    setMenuItems((previousItems) => [...previousItems, newItem]);
  };

  return (
    <NavigationContainer>
      {/* headerShown: false hides the standard navigation top bar so our custom headers draw cleanly */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* VIEW 1: THE MENU LIST SCREEN */}
        <Stack.Screen name="MenuList">
          {/* We use a render-function prop syntax here to inject the global data variables */}
          {(props) => <MenuListScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        {/* VIEW 2: THE ADD NEW DISH FORM SCREEN */}
        <Stack.Screen name="AddDish">
          {/* We pass down the save callback function hook as a prop called onAddDish */}
          {(props) => <AddDishScreen {...props} onAddDish={handleAddDish} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
