import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

interface Props {
  title: string;
  imageUri: string;
  onOpen: () => void;
  isDarkMode?: boolean;
}

export const RecipeCard = ({ title, imageUri, onOpen, isDarkMode }: Props) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isDarkMode && styles.cardDark]} 
      onPress={onOpen}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, isDarkMode && styles.textDark]}>{title}</Text>
        <Text style={styles.linkText}>Ver Receita →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: '#2A2A2A',
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  textDark: {
    color: '#FFF',
  },
  linkText: {
    color: '#FF6347',
    fontWeight: '600',
    fontSize: 14,
  },
});