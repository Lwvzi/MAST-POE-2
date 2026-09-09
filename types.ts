// A union type defining the strict valid categories for the different meal courses.
// Typescript will flag a red line if a course is misspelled
export type Course = "Starter" | "Main" | "Dessert";

// An interface that establishing a contract for what properties a menu dish must possess
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}
