import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

// Componente de tarjeta
import CardUser from "../components/Users/CardUser";

import useFetchUser from "../hooks/useFetchUsers";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ShowUser = () => {
  const {
    usuarios,
    loading,
    fetchUsuarios,
    prepararEdicion,
    handleEliminar,
  } = useFetchUser();

  const navigation = useNavigation();

  // Se ejecuta cada vez que esta pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  const handleEditarUsuario = (usuario) => {
    prepararEdicion(usuario);
    navigation.navigate("AddUsers"); // Asegúrate de tener una ruta "Formulario"
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>

      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser
              user={item}
              onEditar={handleEditarUsuario}
              onEliminar={handleEliminar}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ShowUser;
