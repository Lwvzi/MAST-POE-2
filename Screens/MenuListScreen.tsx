import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
// NativeStacksScreenProps handles typing parameters routing safely within our projects
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Import the shared structural interfaces from the root file tracking array shapes
import { MenuItem } from "../types";
// Import the visual design system palette colors configuration mapping parameters
import { COLORS } from "../colors";
// Import the list items template layout row constructed in our Components folder
import MenuItemCard from "../Components/MenuItemCard";
import { RootStackParamList } from "../App";

// Generates the strict object models tracking screen navigation routing states
type Props = NativeStackScreenProps<RootStackParamList, "MenuList"> & {
  menuItems: MenuItem[]; // Declares an active prop binding passing our array of menu items
};

export default function MenuListScreen({ navigation, menuItems }: Props) {
  return (
    <View style={styles.container}>
      {/* Visual top app bar branding section header layout */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Christoffel's Menu</Text>
      </View>

      {/* Ternary condition verifying if list contains data models to prevent blank canvas layouts */}
      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No dishes yet. Tap + to add your first dish.
          </Text>
        </View>
      ) : (
        /* High-performance virtual list displaying your menu entries cleanly */
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id} // Extracts a distinct string key identifier tag from each node
          renderItem={({ item }) => <MenuItemCard item={item} />} // Passes individual objects to row templates
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Floating Action Button dimming slightly upon touch engagement interactions */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddDish")} // Safely triggers card transitions into input frames
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Provides clearance buffer spacing below rows for our FAB circle layer
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 24,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: COLORS.coral,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // Configures floating component shadow profiles across Android devices
    shadowColor: COLORS.textDark, // Configures matching floating shadow layouts across iOS devices
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: "400",
    marginTop: -2, // Micro-alignment formatting centering the math character cleanly
  },
});
