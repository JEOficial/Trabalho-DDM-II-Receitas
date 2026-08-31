import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';

// IMPORTAÇÕES DO FIREBASE
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { auth, db } from '../app/firebaseConfig'; // Ajuste o caminho se a sua pasta config for diferente

// IMPORTAÇÕES ABSOLUTAS SEGUINDO O PADRÃO (@/)
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeContent } from '@/components/RecipeContent';
import { BottomMenu } from '@/components/BottomMenu';
import { RecipeForm } from '@/components/RecipeForm';
import { SettingsView } from '@/components/SettingsView';
import { RecipeActions } from '@/components/RecipeActions';
import { AuthScreen } from '@/components/AuthScreen'; // 📍 Nova Tela de Login

export interface Recipe {
  id: string;
  title: string;
  img: string;
  ingredients: string;
  instructions: string;
  userId?: string; // Novo campo para identificar o dono da receita
}

// Usaremos isso apenas para o botão de "Restaurar/Popular" configurações
const INITIAL_DATA: Omit<Recipe, 'id'>[] = [
  { 
    title: 'Bolo de Cenoura', 
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500',
    ingredients: '• 3 cenouras\n• 3 ovos\n• 1 xícara de óleo\n• 2 xícaras de açúcar\n• 2 xícaras de farinha',
    instructions: 'Bata os líquidos no liquidificador. Misture os secos manualmente. Asse por 40 minutos.'
  },
  { 
    title: 'Macarronada', 
    img: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=500',
    ingredients: '• 500g de espaguete\n• Molho de tomate\n• Manjericão\n• Alho e sal',
    instructions: 'Cozinhe a massa. Refogue o alho e o molho. Misture tudo e sirva quente.'
  }
];

// Função auxiliar para Alertas Web e Mobile
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function App() {
  // ESTADOS DE AUTENTICAÇÃO E CARREGAMENTO
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  // ESTADOS DO APLICATIVO
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 1️⃣ EFEITO: ESCUTA O LOGIN DO USUÁRIO
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  // 2️⃣ EFEITO: BUSCA AS RECEITAS DO BANCO DE DADOS (FIRESTORE) QUANDO LOGAR
  useEffect(() => {
    if (user) {
      loadRecipes(user.uid);
    } else {
      setRecipes([]); // Limpa as receitas ao deslogar
    }
  }, [user]);

  const loadRecipes = async (userId: string) => {
    setLoadingData(true);
    try {
      // Busca apenas as receitas que pertencem ao ID do usuário logado
      const q = query(collection(db, "recipes"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const fetchedRecipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        fetchedRecipes.push({ id: doc.id, ...doc.data() } as Recipe);
      });
      
      setRecipes(fetchedRecipes);
    } catch (error) {
      showAlert('Erro', 'Não foi possível carregar as receitas da nuvem.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // OPERAÇÃO 1: INSERIR RECEITA (SALVA NO FIRESTORE)
  const handleAddNewRecipe = async (newRecipeData: Omit<Recipe, 'id'>) => {
    if (!user) return;
    
    try {
      // Adiciona no banco e pega o ID gerado automaticamente pelo Firestore
      const docRef = await addDoc(collection(db, "recipes"), {
        ...newRecipeData,
        userId: user.uid
      });

      const newRecipe: Recipe = { id: docRef.id, ...newRecipeData, userId: user.uid };
      setRecipes([...recipes, newRecipe]);
      setActiveTab('home');
      showAlert('Sucesso!', 'Receita salva na nuvem!');
    } catch (error) {
      showAlert('Erro', 'Não foi possível salvar a receita.');
    }
  };

  // OPERAÇÃO 2: ATUALIZAR/EDITAR RECEITA (ATUALIZA NO FIRESTORE)
  const handleUpdateRecipe = async (updatedFields: Omit<Recipe, 'id'>) => {
    if (!selectedRecipe) return;

    try {
      const recipeRef = doc(db, "recipes", selectedRecipe.id);
      await updateDoc(recipeRef, updatedFields); // Atualiza na nuvem

      const updatedRecipes = recipes.map(recipe =>
        recipe.id === selectedRecipe.id ? { ...recipe, ...updatedFields } : recipe
      );

      setRecipes(updatedRecipes);
      setSelectedRecipe({ ...selectedRecipe, ...updatedFields });
      setIsEditing(false);
      showAlert('Sucesso!', 'Receita atualizada na nuvem com sucesso!');
    } catch (error) {
      showAlert('Erro', 'Não foi possível atualizar a receita.');
    }
  };

  // OPERAÇÃO 3: REMOVER RECEITA (APAGA DO FIRESTORE)
  const handleDeleteRecipe = async (id: string) => {
    if (!id) return;
    
    try {
      await deleteDoc(doc(db, "recipes", id)); // Remove da nuvem
      
      const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(filteredRecipes);
      setSelectedRecipe(null);
      showAlert('Sucesso!', 'Receita removida permanentemente!');
    } catch (error) {
      showAlert('Erro', 'Não foi possível remover a receita.');
    }
  };

  // OPERAÇÃO 4: POPULAR COM EXEMPLOS (INSERE NO FIRESTORE)
  const handlePopulateExamples = async () => {
    if (!user) return;
    
    try {
      setLoadingData(true);
      for (const item of INITIAL_DATA) {
        await addDoc(collection(db, "recipes"), {
          ...item,
          userId: user.uid
        });
      }
      await loadRecipes(user.uid); // Recarrega a lista
      setActiveTab('home');
      showAlert('Sucesso!', 'Receitas de exemplo adicionadas!');
    } catch (error) {
      showAlert('Erro', 'Falha ao adicionar exemplos.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setSelectedRecipe(null);
    setIsEditing(false);
  };

  // 🔒 TELA DE CARREGAMENTO DO APP (Enquanto verifica o Firebase)
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  // 🔒 TELA DE LOGIN (Se o usuário não estiver autenticado)
  if (!user) {
    return <AuthScreen />;
  }

  // ✅ APP PRINCIPAL LOGADO
  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* NAVBAR FIXA COM BOTÃO DE SAIR */}
      <View style={[styles.navbar, isDarkMode && styles.navbarDark]}>
        <Text style={styles.navText}>🍳 Receitas Master</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
                onDelete={() => handleDeleteRecipe(selectedRecipe?.id || '')}
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
                <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Suas Receitas Salvas</Text>
                
                {loadingData ? (
                  <ActivityIndicator size="large" color="#FF6347" style={{ marginTop: 50 }} />
                ) : recipes.length === 0 ? (
                  <Text style={[styles.emptyText, isDarkMode && styles.textDark]}>
                    Nenhuma receita encontrada. Adicione uma nova ou use a aba de configurações para gerar receitas de exemplo!
                  </Text>
                ) : (
                  recipes.map(item => (
                    <RecipeCard
                      key={item.id}
                      title={item.title}
                      imageUri={item.img}
                      isDarkMode={isDarkMode}
                      onOpen={() => setSelectedRecipe(item)}
                    />
                  ))
                )}
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
                  // Botão reutilizado para popular o DB na nuvem
                  onResetRecipes={handlePopulateExamples} 
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
  navbar: { height: 70, backgroundColor: '#FF6347', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20, position: 'relative' },
  navbarDark: { backgroundColor: '#B22222' },
  navText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  logoutButton: { position: 'absolute', right: 20, top: 25, padding: 5 },
  logoutText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#444' },
  textDark: { color: '#FFF' },
  backLink: { color: '#FF6347', fontSize: 18, marginBottom: 15, fontWeight: '600' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#888', marginTop: 50, lineHeight: 24 }
});