import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

// Importando nossos componentes personalizados
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeButton } from '@/components/RecipeButton';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeContent } from '@/components/RecipeContent';

// Dados das 3 receitas
const DATA = [
  {
    id: '1',
    title: 'Bolo de Cenoura',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500',
    ingredients: '• 3 cenouras\n• 3 ovos\n• 1 xícara de óleo\n• 2 xícaras de açúcar\n• 2 xícaras de farinha',
    instructions: 'Bata os líquidos no liquidificador. Misture os secos manualmente. Asse por 40 minutos.'
  },
  {
    id: '2',
    title: 'Macarronada',
    img: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=500',
    ingredients: '• 500g de espaguete\n• Molho de tomate\n• Manjericão\n• Alho e sal',
    instructions: 'Cozinhe a massa. Refogue o alho e o molho. Misture tudo e sirva quente.'
  },
  // Adicione a terceira receita seguindo o mesmo padrão...
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navText}>🍳 Receitas Master</Text>
      </View>

      <ScrollView style={styles.content}>
        {selected ? (
          // TELA DE DETALHES
          <View>
            {selected && (
              <View>
                <TouchableOpacity onPress={() => setSelected(null)}>
                  <Text style={styles.backLink}>← Voltar para a lista</Text>
                </TouchableOpacity>

                <RecipeImage uri={selected.img} />

                {/* A MÁGICA ACONTECE AQUI: */}
                <RecipeContent
                  title={selected.title}
                  ingredients={selected.ingredients}
                  instructions={selected.instructions}
                />
              </View>
            )}
          </View>
        ) : (
          // TELA INICIAL (LISTAGEM)
          <View>
            <Text style={styles.sectionTitle}>Sugestões do Dia</Text>
            {DATA.map(item => (
              <RecipeCard
                key={item.id}
                title={item.title}
                imageUri={item.img}
                onOpen={() => setSelected(item)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Receba</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  navbar: { height: 70, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  navText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#444' },
  backLink: { color: '#FF6347', fontSize: 18, marginBottom: 15, fontWeight: '600' },
  detailTitle: { fontSize: 28, fontWeight: 'bold', marginVertical: 15 },
  detailDesc: { fontSize: 16, lineHeight: 24, color: '#666' },
  footer: { padding: 10, backgroundColor: '#333', alignItems: 'center' },
  footerText: { color: '#BBB', fontSize: 12 }
});