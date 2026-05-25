import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface Props {
  uri: string;
}

export const RecipeImage = ({ uri }: Props) => {
  return <Image source={{ uri }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});

