import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
// NativeStackScreenProps handles typing parameters routing cleanly within our project structure
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Import the shared structural types from the root directory file
import { Course, MenuItem } from "../types";
// Import the central visual style guide palette object
import { COLORS } from "../colors";
import { RootStackParamList } from "../App";

// Generates the strict object models tracking screen navigation routing states
type Props = NativeStackScreenProps<RootStackParamList, "AddDish"> & {
  onAddDish: (item: MenuItem) => void; // A callback function prop that lifts state up to App.tsx
};

export default function AddDishScreen({ navigation, onAddDish }: Props) {
  // useState hooks to keep track of form inputs in local memory
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<Course>("Main"); // Default selection is set to 'Main'
  const [price, setPrice] = useState("");

  // Track separate error string fields dynamically using an index signature
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation function checks all parameters before saving
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // .trim() strips empty whitespace strings to prevent empty entries
    if (!name.trim()) {
      newErrors.name = "Dish name is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    const priceNumber = parseFloat(price);
    if (!price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = "Enter a valid price greater than 0.";
    }

    setErrors(newErrors);
    // Returns true only if the errors object remains completely empty
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // If validation fails, stop execution immediately and show errors
    if (!validate()) {
      return;
    }

    // Constructs a clean MenuItem object
    const newItem: MenuItem = {
      id: Date.now().toString(), // Quick way to generate a unique string ID stamp
      name: name.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    };

    // Pass the new item up to the parent array state hook
    onAddDish(newItem);

    // Shows an explicit native dialog box alert confirming a successful action
    Alert.alert("Success", `${newItem.name} was added to the menu.`);

    // Smoothly slides the screen stack backward onto the primary menu layout
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Top screen header visual framing block */}
      <View style={styles.header}>
        <Text style={styles.headerText}>New Dish</Text>
      </View>

      <View style={styles.form}>
        {/* DISH NAME FIELD */}
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="e.g. Garlic Butter Prawns"
          value={name}
          onChangeText={setName}
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}

        {/* DESCRIPTION FIELD */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            errors.description ? styles.inputError : null,
          ]}
          placeholder="Describe ingredients, allergies, or serving size..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}

        {/* COURSE SEGMENTED SELECTION BUTTONS */}
        <Text style={styles.label}>Select Course</Text>
        <View style={styles.courseRow}>
          {(["Starter", "Main", "Dessert"] as Course[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.courseButton,
                course === type ? styles.courseButtonActive : null,
              ]}
              onPress={() => setCourse(type)}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  course === type ? styles.courseButtonTextActive : null,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PRICE FIELD */}
        <Text style={styles.label}>Price (ZAR)</Text>
        <TextInput
          style={[styles.input, errors.price ? styles.inputError : null]}
          placeholder="e.g. 145.00"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric" // Forces numeric keypad display layouts on real mobile screens
        />
        {errors.price ? (
          <Text style={styles.errorText}>{errors.price}</Text>
        ) : null}

        {/* SAVE SUBMISSION BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Add to Menu</Text>
        </TouchableOpacity>

        {/* CANCEL/BACK BUTTON */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textDark,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top", // Ensures placeholder string text stays anchored top-left on Android screens
  },
  inputError: {
    borderColor: COLORS.coral, // Highlights field entry limits with red border strokes during validation blocks
  },
  errorText: {
    color: COLORS.coral,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  courseButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 8,
  },
  courseButtonActive: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  courseButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  courseButtonTextActive: {
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.teal,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "600",
  },
});
