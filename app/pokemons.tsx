import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { PokemonCard } from "../components/PokemonCard";
import { PokemonDetailsModal } from "../components/PokemonDetailsModal";
import { BottomNavigation } from "../components/BottomNavigation";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { fetchPokemons, Pokemon } from "../services/pokemon.service";

export default function Pokemons() {
  const { isLogged, logout } = useAuth();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemons(151);
      setPokemonList(data);
      setFilteredList(data);
    } catch (err) {
      setError("Não foi possível carregar os pokémons. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPokemons(); }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredList(pokemonList);
      return;
    }
    const filtered = pokemonList.filter((p) =>
      p.nome.toLowerCase().includes(query.toLowerCase()) || p.id.includes(query)
    );
    setFilteredList(filtered);
  };

  const handleCardPress = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  if (!isLogged) return <Redirect href="/" />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1B2A" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.pokeball}>
            <View style={styles.pokeballTop} />
            <View style={styles.pokeballStripe} />
            <View style={styles.pokeballBottom} />
            <View style={styles.pokeballBtn} />
          </View>
          <View>
            <Text style={styles.headerTitle}>POKÉDEX</Text>
            <Text style={styles.headerSub}>
              {loading ? "Carregando..." : `${pokemonList.length} pokémons`}
            </Text>
          </View>
        </View>
        <Button title="Sair" onPress={logout} variant="danger" style={{ width: 90, marginTop: 0 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#E53935" size="large" />
          <Text style={styles.loadingText}>Carregando Pokédex...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Tentar Novamente" onPress={loadPokemons} style={{ width: 220 }} />
        </View>
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Search Bar */}
              <View style={styles.searchBarContainer}>
                <Ionicons name="search" size={18} color="#8FA8C0" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Pesquisar por nome ou ID..."
                  placeholderTextColor="#8FA8C0"
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                {searchQuery.length > 0 && (
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color="#8FA8C0"
                    onPress={() => handleSearch("")}
                  />
                )}
              </View>

              <Text style={styles.sectionTitle}>
                {searchQuery ? `${filteredList.length} resultado(s)` : "Seus Pokémons"}
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <PokemonCard
              nome={item.nome}
              tipo={item.tipo}
              imagem={item.imagem}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
      )}

      <PokemonDetailsModal
        pokemon={selectedPokemon}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <BottomNavigation activeTab="pokemons" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E53935",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: "#B71C1C",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  pokeball: {
    width: 36, height: 36, borderRadius: 18, borderWidth: 3,
    borderColor: "#111", overflow: "hidden", position: "relative", backgroundColor: "#fff",
  },
  pokeballTop: { position: "absolute", top: 0, left: 0, right: 0, height: "50%", backgroundColor: "#E53935" },
  pokeballStripe: { position: "absolute", top: "50%", left: 0, right: 0, height: 4, backgroundColor: "#111", marginTop: -2 },
  pokeballBottom: { position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", backgroundColor: "#EFEFEF" },
  pokeballBtn: {
    position: "absolute", width: 10, height: 10, borderRadius: 5,
    backgroundColor: "#bd3e3e", borderWidth: 2, borderColor: "#111",
    top: "50%", left: "50%", marginTop: -5, marginLeft: -5,
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#fff", letterSpacing: 3 },
  headerSub: { fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: 0.5, marginTop: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", gap: 16 },
  loadingText: { fontSize: 16, color: "#8FA8C0", fontWeight: "600", letterSpacing: 0.5 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32, gap: 20 },
  errorText: { fontSize: 15, color: "#F48FB1", textAlign: "center", lineHeight: 22, fontWeight: "500" },
  list: { padding: 20, paddingBottom: 110 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#162234",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchBar: { flex: 1, paddingVertical: 12, fontSize: 14, color: "#FFFFFF" },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", color: "#8FA8C0",
    letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16,
  },
});
