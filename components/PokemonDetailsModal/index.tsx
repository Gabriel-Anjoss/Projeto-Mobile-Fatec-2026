import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pokemon } from "../../services/pokemon.service";

type Props = {
  pokemon: Pokemon | null;
  visible: boolean;
  onClose: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const TYPE_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  Elétrico: { bg: "rgba(255,214,0,0.15)",   text: "#FFD600", accent: "#FFD600" },
  Fogo:     { bg: "rgba(255,107,53,0.15)",  text: "#FF6B35", accent: "#FF6B35" },
  Água:     { bg: "rgba(79,195,247,0.15)",  text: "#4FC3F7", accent: "#4FC3F7" },
  Planta:   { bg: "rgba(102,187,106,0.15)", text: "#66BB6A", accent: "#66BB6A" },
  Fantasma: { bg: "rgba(171,71,188,0.15)",  text: "#AB47BC", accent: "#AB47BC" },
  Normal:   { bg: "rgba(168,168,168,0.15)", text: "#A8A8A8", accent: "#A8A8A8" },
  Psíquico: { bg: "rgba(240,98,146,0.15)",  text: "#F06292", accent: "#F06292" },
  Pedra:    { bg: "rgba(161,136,127,0.15)", text: "#A1887F", accent: "#A1887F" },
  Lutador:  { bg: "rgba(255,138,101,0.15)", text: "#FF8A65", accent: "#FF8A65" },
  Venenoso: { bg: "rgba(186,104,200,0.15)", text: "#BA68C8", accent: "#BA68C8" },
  Terra:    { bg: "rgba(215,160,110,0.15)", text: "#D7A06E", accent: "#D7A06E" },
  Voador:   { bg: "rgba(144,202,249,0.15)", text: "#90CAF9", accent: "#90CAF9" },
  Inseto:   { bg: "rgba(156,204,101,0.15)", text: "#9CCC65", accent: "#9CCC65" },
  Dragão:   { bg: "rgba(92,107,192,0.15)",  text: "#5C6BC0", accent: "#5C6BC0" },
  Sombrio:  { bg: "rgba(110,110,110,0.15)", text: "#8E8E8E", accent: "#8E8E8E" },
  Aço:      { bg: "rgba(144,164,174,0.15)", text: "#90A4AE", accent: "#90A4AE" },
  Fada:     { bg: "rgba(244,143,177,0.15)", text: "#F48FB1", accent: "#F48FB1" },
  Gelo:     { bg: "rgba(128,222,234,0.15)", text: "#80DEEA", accent: "#80DEEA" },
};

const DEFAULT_COLORS = { bg: "rgba(255,255,255,0.06)", text: "#8FA8C0", accent: "#8FA8C0" };

export function PokemonDetailsModal({ pokemon, visible, onClose }: Props) {
  if (!pokemon) return null;

  const mainType = pokemon.tipo;
  const palette = TYPE_COLORS[mainType] ?? DEFAULT_COLORS;

  const statsList = [
    { label: "HP", value: pokemon.stats.hp, max: 255, color: "#66BB6A" },
    { label: "Ataque", value: pokemon.stats.ataque, max: 190, color: "#FF6B35" },
    { label: "Defesa", value: pokemon.stats.defesa, max: 230, color: "#4FC3F7" },
    { label: "Atq. Esp.", value: pokemon.stats.ataqueEspecial, max: 194, color: "#AB47BC" },
    { label: "Def. Esp.", value: pokemon.stats.defesaEspecial, max: 230, color: "#5C6BC0" },
    { label: "Velocidade", value: pokemon.stats.velocidade, max: 180, color: "#FFD600" },
  ];

  const paddedId = String(pokemon.id).padStart(3, "0");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header com fundo colorido */}
          <View style={[styles.headerCard, { backgroundColor: palette.accent }]}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                <Ionicons name="close" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.pokeId}>#{paddedId}</Text>
            </View>

            {/* Layout horizontal: imagem + info básica lado a lado */}
            <View style={styles.headerContent}>
              {/* Imagem do Pokémon — dentro do header, sem position absolute */}
              <View style={styles.imageContainer}>
                <Image
                  source={pokemon.imagem}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              {/* Nome e tipos ao lado da imagem */}
              <View style={styles.headerInfo}>
                <Text style={styles.name}>{pokemon.nome}</Text>
                <View style={styles.typesRow}>
                  {pokemon.tipos?.map((t, idx) => {
                    const typePalette = TYPE_COLORS[t] ?? DEFAULT_COLORS;
                    return (
                      <View
                        key={idx}
                        style={[
                          styles.typeBadge,
                          { backgroundColor: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.4)" },
                        ]}
                      >
                        <Text style={[styles.typeText, { color: "#FFFFFF" }]}>
                          {t.toUpperCase()}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Altura / Peso no header */}
                <View style={styles.headerMeasurements}>
                  <View style={styles.measureItem}>
                    <Ionicons name="resize-outline" size={14} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.measureVal}>{pokemon.altura} m</Text>
                  </View>
                  <View style={styles.measureSeparator} />
                  <View style={styles.measureItem}>
                    <Ionicons name="scale-outline" size={14} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.measureVal}>{pokemon.peso} kg</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Body Card — sem padding-top excessivo */}
          <ScrollView
            style={styles.bodyCard}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.statsTitle}>Status Base</Text>

              {statsList.map((stat, idx) => {
                const percentage = Math.min((stat.value / stat.max) * 100, 100);
                return (
                  <View key={idx} style={styles.statRow}>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <View style={styles.progressBg}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${percentage}%`,
                            backgroundColor: stat.color,
                            shadowColor: stat.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(6, 12, 22, 0.8)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.82,
    backgroundColor: "#0D1B2A",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  headerCard: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  pokeId: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  // Layout horizontal: imagem + info
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  imageContainer: {
    width: SCREEN_HEIGHT * 0.18,
    height: SCREEN_HEIGHT * 0.18,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  image: {
    width: "90%",
    height: "90%",
  },
  headerInfo: {
    flex: 1,
    gap: 8,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  typesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  headerMeasurements: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  measureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  measureVal: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "700",
  },
  measureSeparator: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  // Body
  bodyCard: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  statsSection: {
    gap: 16,
  },
  statsTitle: {
    color: "#F7F9FC",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    color: "#8FA8C0",
    fontSize: 13,
    fontWeight: "600",
    width: 80,
  },
  statValue: {
    color: "#F7F9FC",
    fontSize: 14,
    fontWeight: "800",
    width: 32,
    textAlign: "right",
    marginRight: 12,
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
