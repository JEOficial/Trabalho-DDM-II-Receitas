import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  ingredients: string;
  instructions: string;
}

export const RecipeContent = ({ title, ingredients, instructions }: Props) => {
  return (
    <View style={styles.container}>
      {/* Título com destaque maior */}
      <Text style={styles.mainTitle}>{title}</Text>

      {/* Seção de Ingredientes */}
      <Text style={styles.sectionTitle}>📋 Ingredientes</Text>
      <Text style={styles.bodyText}>{ingredients}</Text>

      {/* Seção de Preparo */}
      <Text style={styles.sectionTitle}>👨‍🍳 Modo de Preparo</Text>
      <Text style={styles.bodyText}>{instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347', // Cor de destaque para os subtítulos
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
});