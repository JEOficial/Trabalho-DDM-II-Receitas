import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

// IMPORTAÇÕES ABSOLUTAS SEGUINDO O PADRÃO EXIGIDO (@/)
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeContent } from '@/components/RecipeContent';
import { BottomMenu } from '@/components/BottomMenu';
import { RecipeForm } from '@/components/RecipeForm';
import { SettingsView } from '@/components/SettingsView';
import { RecipeActions } from '@/components/RecipeActions';

// Definição estrita da tipagem das receitas
export interface Recipe {
  id: string;
  title: string;
  img: string;
  ingredients: string;
  instructions: string;
}

const INITIAL_DATA: Recipe[] = [
  {
    id: '1',
    title: 'Bolo de Cenoura',
    img: 'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/c98520bf155ee3243720b6ed424203ef.jpg',
    ingredients: '• 3 cenouras\n• 3 ovos\n• 1 xícara de óleo\n• 2 xícaras de açúcar\n• 2 xícaras de farinha',
    instructions: 'Bata os líquidos no liquidificador. Misture os secos manualmente. Asse por 40 minutos.'
  },
  {
    id: '2',
    title: 'Macarronada',
    img: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=500',
    ingredients: '• 500g de espaguete\n• Molho de tomate\n• Manjericão\n• Alho e sal',
    instructions: 'Cozinhe a massa. Refogue o alho e o molho. Misture tudo e sirva quente.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_DATA);

  // ESTADOS GLOBAIS DE AJUSTES
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // OPERAÇÃO 1: INSERIR RECEITA
  const handleAddNewRecipe = (newRecipeData: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = { id: String(Date.now()), ...newRecipeData };
    setRecipes([...recipes, newRecipe]);
    setActiveTab('home');
  };

  // OPERAÇÃO 2: ATUALIZAR/EDITAR RECEITA
  const handleUpdateRecipe = (updatedFields: Omit<Recipe, 'id'>) => {
    if (!selectedRecipe) return;

    // Mudamos de === para == para evitar problemas de tipo (String vs Number)
    const updatedRecipes = recipes.map(recipe =>
      String(recipe.id) === String(selectedRecipe.id) ? { ...recipe, ...updatedFields } : recipe
    );

    setRecipes(updatedRecipes);

    // Atualiza o estado da receita selecionada com os novos campos E mantém o ID original!
    setSelectedRecipe({ ...selectedRecipe, ...updatedFields });

    setIsEditing(false);
    Alert.alert('Sucesso!', 'Receita atualizada com sucesso!');
  };

  // OPERAÇÃO 3: REMOVER RECEITA
  const handleDeleteRecipe = (id: string) => {
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(filteredRecipes);
    setSelectedRecipe(null);
    Alert.alert('Sucesso!', 'Receita removida com sucesso!');
  };

  // OPERAÇÃO 4: RESETAR ESTADO (FUNÇÃO QUE CORRIGE O ERRO ANTERIOR)
  const handleResetRecipes = () => {
    setRecipes([...INITIAL_DATA]);
    setSelectedRecipe(null);
    setIsEditing(false);
    setActiveTab('home');
    Alert.alert('Restaurado!', 'O catálogo de receitas voltou ao padrão inicial.');
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setSelectedRecipe(null);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* NAVBAR FIXA */}
      <View style={[styles.navbar, isDarkMode && styles.navbarDark]}>
        <Text style={styles.navText}>🍳 Receitas Master</Text>
      </View>

      {/* ÁREA CENTRAL EM SCROLL */}
      <ScrollView style={styles.content}>
        {selectedRecipe ? (
          isEditing ? (
            /* SUB-TELA: FORMULÁRIO DE EDIÇÃO */
            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Text style={styles.backLink}>← Cancelar Edição</Text>
              </TouchableOpacity>
              <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>✏️ Editar Receita</Text>
              <RecipeForm
                initialData={selectedRecipe}
                buttonText="Salvar Alterações"
                onSubmit={handleUpdateRecipe}
                isDarkMode={isDarkMode}
              />
            </View>
          ) : (
            /* SUB-TELA: DETALHES DE UMA RECEITA SELECIONADA */
            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
                <Text style={styles.backLink}>← Voltar para a lista</Text>
              </TouchableOpacity>

              <RecipeImage uri={selectedRecipe.img} />

              <RecipeActions
                onEdit={() => setIsEditing(true)}
                onDelete={() => handleDeleteRecipe(selectedRecipe.id)}
              />

              <RecipeContent
                title={selectedRecipe.title}
                ingredients={selectedRecipe.ingredients}
                instructions={selectedRecipe.instructions}
                isDarkMode={isDarkMode}
              />
            </View>
          )
        ) : (
          /* NAVEGAÇÃO PRINCIPAL DO BOTTOM MENU */
          <View>
            {activeTab === 'home' && (
              <View style={{ marginBottom: 30 }}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Sugestões do Dia</Text>
                {recipes.map(item => (
                  <RecipeCard
                    key={item.id}
                    title={item.title}
                    imageUri={item.img}
                    isDarkMode={isDarkMode}
                    onOpen={() => setSelectedRecipe(item)}
                  />
                ))}
              </View>
            )}

            {activeTab === 'add' && (
              <View style={{ marginBottom: 30 }}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>➕ Nova Receita</Text>
                <RecipeForm
                  onSubmit={handleAddNewRecipe}
                  isDarkMode={isDarkMode}
                />
              </View>
            )}

            {activeTab === 'settings' && (
              <View style={{ marginBottom: 30 }}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>⚙️ Configurações</Text>
                <SettingsView
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  notificationsEnabled={notificationsEnabled}
                  onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
                  onResetRecipes={handleResetRecipes}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* COMPONENTE DE MENU FIXO */}
      <BottomMenu currentTab={activeTab} onChangeTab={handleTabChange} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  containerDark: { backgroundColor: '#1A1A1A' },
  navbar: { height: 70, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  navbarDark: { backgroundColor: '#B22222' },
  navText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#444' },
  textDark: { color: '#FFF' },
  backLink: { color: '#FF6347', fontSize: 18, marginBottom: 15, fontWeight: '600' },
});