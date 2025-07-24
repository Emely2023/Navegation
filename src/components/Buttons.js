import { act } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
 
const Button = ({ texto, action }) => {
  return (
    <TouchableOpacity onPress={action} style={Styles.boton}>
      <Text style={Styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};
 
const Styles = StyleSheet.create({
  boton: {
    padding: 10,
    backgroundColor: "#0a7d7fff",
  },
  texto: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
});
 
export default Button;