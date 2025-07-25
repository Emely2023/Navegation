import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CardUser = ({ user, onEditar, onEliminar }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEditar(user)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onEliminar(user.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#F4A261",
  },
  deleteButton: {
    backgroundColor: "#E76F51",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default CardUser;
