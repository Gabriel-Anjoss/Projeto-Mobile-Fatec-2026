import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";

import { AlertProps } from "./types";

const SEMANTIC = {
  error: {
    bg:     "#2D1215",
    border: "#E53935",
    text:   "#FF8A80",
    icon:   "✕",
  },
  success: {
    bg:     "#0D2318",
    border: "#66BB6A",
    text:   "#A5D6A7",
    icon:   "✓",
  },
  warning: {
    bg:     "#2D1F00",
    border: "#FFD600",
    text:   "#FFE57F",
    icon:   "⚠",
  },
  info: {
    bg:     "#0D1E2D",
    border: "#4FC3F7",
    text:   "#81D4FA",
    icon:   "i",
  },
};

const AlertWeb: React.FC<AlertProps> = ({
  title,
  message,
  visible,
  onClose,
  type = "info",
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(-20);
    }
  }, [visible]);

  const palette = SEMANTIC[type];

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              backgroundColor: palette.bg,
              borderLeftColor: palette.border,
            },
          ]}
        >
          {/* Ícone do tipo */}
          <View style={[styles.iconWrap, { borderColor: palette.border }]}>
            <Text style={[styles.iconText, { color: palette.border }]}>
              {palette.icon}
            </Text>
          </View>

          {/* Conteúdo */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: palette.text }]}>
              {title}
            </Text>
            <Text style={[styles.message, { color: palette.text }]}>
              {message}
            </Text>
          </View>

          {/* Botão fechar */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={[styles.closeText, { color: palette.text }]}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 14,
    borderLeftWidth: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 18,
    gap: 14,
    ...Platform.select({
      web: { boxShadow: "0px 12px 32px rgba(0,0,0,0.5)" } as any,
      default: { elevation: 10 },
    }),
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "900",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  closeBtn: {
    padding: 2,
    flexShrink: 0,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default AlertWeb;