import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth } from '@/app/firebaseConfig'; // Ajuste o caminho conforme o seu projeto
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/app/firebaseConfig';

export const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Controla se está na tela de Login ou Cadastro
  const [loading, setLoading] = useState(false);

  // Função de Login
  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Erro', 'Preencha todos os campos!');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O app/index.tsx vai detectar o login automaticamente!
    } catch (error: any) {
      Alert.alert('Erro no Login', 'Verifique se o e-mail e senha estão corretos.');
    } finally {
      setLoading(false);
    }
  };

  // Função de Cadastro
  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Erro', 'Preencha todos os campos!');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso!', 'Conta criada com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍳 Receitas Master</Text>
      <Text style={styles.subtitle}>{isLogin ? 'Faça login para continuar' : 'Crie sua conta'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Sua Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FF6347" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleRegister}>
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Criar Conta'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F8F8F8' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#FF6347', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', color: '#666', marginBottom: 30 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#FF6347', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  toggleText: { color: '#FF6347', textAlign: 'center', fontSize: 16, fontWeight: '600' }
});