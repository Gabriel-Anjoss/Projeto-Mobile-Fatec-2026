import { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

type Props = TextInputProps & {
  secureTextEntry?: boolean;
};

export function Input({ secureTextEntry, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View
      style={[
        styles.wrapper,
        focused && styles.wrapperFocused,
      ]}
    >
      <TextInput
        {...rest}
        secureTextEntry={hidden}
        placeholderTextColor="#8FA8C0"
        style={[styles.input, style]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Botão mostrar/ocultar senha */}
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setHidden((h) => !h)}
          style={styles.eyeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.eyeText}>{hidden ? "👁" : "🙈"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    marginBottom: 4,
  },
  wrapperFocused: {
    borderColor: "#E53935",
    backgroundColor: "rgba(229,57,53,0.06)",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#F7F9FC",
  },
  eyeBtn: {
    paddingHorizontal: 14,
  },
  eyeText: {
    fontSize: 16,
  },
});