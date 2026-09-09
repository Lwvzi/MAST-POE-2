import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Ensure both are inside curly braces to resolve named export definitions
import { Course } from "../types";
import { COLORS } from "../colors";

// Maps specfic string variants safely into their designated colors object references
const badgeColor = (course: Course): string => {
  switch (course) {
    case "Starter":
      return COLORS.starter;
    case "Main":
      return COLORS.main;
    case "Dessert":
      return COLORS.dessert;
    default:
      return COLORS.white; // Fallback color for any unexpected course type
  }
};

// Tells TypeScript that this component expects to receive a parameter named 'course'
interface Props {
  course: Course;
}

// Main element architecture drawing individual pills into parent layouts
export default function CourseBadge({ course }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: badgeColor(course) }]}>
      <Text style={styles.text}>{course}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  text: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
});
