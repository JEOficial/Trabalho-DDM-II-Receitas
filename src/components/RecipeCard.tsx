import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RecipeImage } from './RecipeImage';
import { RecipeButton } from './RecipeButton';

interface Props {
  title: string;
  imageUri: string;
  onOpen: () => void;
}

export const RecipeCard = ({ title, imageUri, onOpen }: Props) => {
  return (
    <View style={styles.card}>
      <RecipeImage uri={imageUri} />
      <Text style={styles.cardTitle}>{title}</Text>
      <RecipeButton title="Ver Receita" onPress={onOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 4, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
});