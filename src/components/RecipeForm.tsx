import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  onSubmit: (recipe: { title: string; img: string; ingredients: string; instructions: string }) => void;
  initialData?: { title: string; img: string; ingredients: string; instructions: string };
  buttonText?: string;
  isDarkMode?: boolean;
}

export const RecipeForm = ({ onSubmit, initialData, buttonText = 'Salvar Receita', isDarkMode }: Props) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [img, setImg] = useState(initialData?.img || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setImg(initialData.img);
      setIngredients(initialData.ingredients);
      setInstructions(initialData.instructions);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title || !ingredients || !instructions) {
      Alert.alert('Atenção', 'Por favor, preencha o Título, Ingredientes e Modo de Preparo!');
      return;
    }

    const finalImg = img.trim() !== '' ? img : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=500';

    onSubmit({ title, img: finalImg, ingredients, instructions });

    if (!initialData) {
      setTitle('');
      setImg('');
      setIngredients('');
      setInstructions('');
    }
  };

  return (
    <View style={[styles.form, isDarkMode && styles.formDark]}>
      <Text style={[styles.label, isDarkMode && styles.textDark]}>Nome da Receita *</Text>
      <TextInput 
        style={[styles.input, isDarkMode && styles.inputDark]} 
        placeholder="Ex: Panqueca de Aveia" 
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={title} 
        onChangeText={setTitle} 
      />

      <Text style={[styles.label, isDarkMode && styles.textDark]}>Link da Imagem (URL)</Text>
      <TextInput 
        style={[styles.input, isDarkMode && styles.inputDark]} 
        placeholder="https://linkdaimagem.com/foto.jpg" 
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={img} 
        onChangeText={setImg} 
        autoCapitalize="none" 
      />

      <Text style={[styles.label, isDarkMode && styles.textDark]}>Ingredientes *</Text>
      <TextInput 
        style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]} 
        placeholder="• Ingredientes..." 
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={ingredients} 
        onChangeText={setIngredients} 
        multiline 
        numberOfLines={4} 
      />

      <Text style={[styles.label, isDarkMode && styles.textDark]}>Modo de Preparo *</Text>
      <TextInput 
        style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]} 
        placeholder="Como preparar..." 
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={instructions} 
        onChangeText={setInstructions} 
        multiline 
        numberOfLines={4} 
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  formDark: { backgroundColor: '#2A2A2A' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 5, marginTop: 10 },
  textDark: { color: '#FFF' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#FAFAFA', color: '#333' },
  inputDark: { backgroundColor: '#1A1A1A', borderColor: '#444', color: '#FFF' },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#FF6347', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});