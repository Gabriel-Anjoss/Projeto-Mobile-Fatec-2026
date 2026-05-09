import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: "primary" | "danger";
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  isLoading = false,
  variant = "primary",
  style,
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.82}
      style={[
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnDanger,
        isLoading && styles.btnDisabled,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnPrimary: {
    backgroundColor: "#E53935",
    shadowColor: "#E53935",
  },
  btnDanger: {
    backgroundColor: "#263850",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "#000",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});