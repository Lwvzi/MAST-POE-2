import React from "react";
import { View, Text, StyleSheet } from "react-native";
// We import the structured data item shape from types file
import { MenuItem } from "../types";
// We import the badge component we just finished to display the colored course tag
import CourseBadge from "./CourseBadge";
// Global color object configuration matching the wireframe
import { COLORS } from "../colors";

// This contract tells TypeScript that this component expects exactly one item prop matching a MenuItem structure
interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>

      {/* This line was missing — it actually places the badge on screen */}
      <CourseBadge course={item.course} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.teal,
  },
});
