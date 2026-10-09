const tintColorLight = "#6C63FF";   // Royal Blue-Purple
const tintColorDark = "#FFB703";    // Golden highlight

const primary = "#73dd2c";          // Coral (food + energy)
const secondary = "#363638";        // Charcoal (premium)

export const Colors = {
  light: {
    text: "#1F2937",                // Soft black
    background: "#FFF8F5",          // Warm off-white
    tint: tintColorLight,
    icon: "#6B7280",
    tabIconDefault: "#9ca3af",
    tabIconSelected: tintColorLight,
  },

  dark: {
    text: "#E5E7EB",                // Soft white
    background: "#0F172A",          // Deep navy dark
    tint: tintColorDark,
    icon: "#9CA3AF",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
  },

  PRIMARY: primary,
  SECONDARY: secondary,
};
