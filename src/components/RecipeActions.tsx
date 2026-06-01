import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const RecipeActions = ({ onEdit, onDelete }: Props) => {
  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Receita',
      'Tem certeza de que deseja apagar permanentemente esta receita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, Eliminar', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onEdit}>
        <Text style={styles.buttonText}>✏️ Editar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeletePress}>
        <Text style={styles.buttonText}>🗑️ Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});