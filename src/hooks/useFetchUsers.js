import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [idEditar, setIdEditar] = useState(null); // Nuevo estado para identificar si estás editando

  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar o editar usuario
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    if (idEditar) {
      // Si hay ID, estamos editando
      try {
        const response = await fetch(
          `https://retoolapi.dev/zZhXYF/movil/${idEditar}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre,
              edad: parseInt(edad),
              correo,
            }),
          }
        );

        if (response.ok) {
          Alert.alert("Éxito", "Usuario actualizado correctamente");
          limpiarFormulario();
          fetchUsuarios();
        } else {
          Alert.alert("Error", "No se pudo actualizar el usuario");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Ocurrió un error al actualizar el usuario");
      }
    } else {
      // Si no hay ID, estamos creando
      try {
        const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            edad: parseInt(edad),
            correo,
          }),
        });

        if (response.ok) {
          Alert.alert("Éxito", "Usuario guardado correctamente");
          limpiarFormulario();
          fetchUsuarios();
        } else {
          Alert.alert("Error", "No se pudo guardar el usuario");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Ocurrió un error al enviar los datos");
      }
    }
  };

  // Preparar formulario para editar
  const prepararEdicion = (usuario) => {
    setNombre(usuario.nombre);
    setEdad(usuario.edad.toString());
    setCorreo(usuario.correo);
    setIdEditar(usuario.id);
  };

  // Eliminar un usuario
  const handleEliminar = async (id) => {
    Alert.alert("Confirmar", "¿Estás seguro de que deseas eliminar este usuario?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `https://retoolapi.dev/zZhXYF/movil/${id}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              Alert.alert("Éxito", "Usuario eliminado correctamente");
              fetchUsuarios();
            } else {
              Alert.alert("Error", "No se pudo eliminar el usuario");
            }
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al eliminar el usuario");
          }
        },
      },
    ]);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre("");
    setEdad("");
    setCorreo("");
    setIdEditar(null);
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    usuarios,
    loading,
    fetchUsuarios,
    prepararEdicion,
    handleEliminar,
  };
};

export default useFetchUser;
