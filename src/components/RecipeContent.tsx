import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  ingredients: string;
  instructions: string;
  isDarkMode?: boolean;
}

export const RecipeContent = ({ title, ingredients, instructions, isDarkMode }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainTitle, isDarkMode && styles.textDark]}>{title}</Text>

      <Text style={styles.sectionTitle}>📋 Ingredientes</Text>
      <Text style={[styles.bodyText, isDarkMode && styles.textDark]}>{ingredients}</Text>

      <Text style={styles.sectionTitle}>👨‍🍳 Modo de Preparo</Text>
      <Text style={[styles.bodyText, isDarkMode && styles.textDark]}>{instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  textDark: {
    color: '#DDD',
  },
});