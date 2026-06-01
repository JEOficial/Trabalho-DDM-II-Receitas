import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';

interface Props {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onResetRecipes: () => void;
}

export const SettingsView = ({
  isDarkMode,
  onToggleDarkMode,
  notificationsEnabled,
  onToggleNotifications,
  onResetRecipes,
}: Props) => {
  
  const handleResetPress = () => {
    Alert.alert(
      'Redefinir Aplicação',
      'Tem certeza de que deseja apagar todas as receitas adicionadas e voltar ao padrão de fábrica?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, Restaurar', style: 'destructive', onPress: onResetRecipes },
      ]
    );
  };

  return (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <View style={[styles.row, isDarkMode && styles.rowDark]}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>🌙 Modo Escuro</Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={onToggleDarkMode} 
          trackColor={{ false: '#767577', true: '#FF6347' }}
          thumbColor={isDarkMode ? '#FFF' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.row, isDarkMode && styles.rowDark]}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>🔔 Notificações</Text>
        <Switch 
          value={notificationsEnabled} 
          onValueChange={onToggleNotifications} 
          trackColor={{ false: '#767577', true: '#FF6347' }}
          thumbColor={notificationsEnabled ? '#FFF' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.dangerButton} onPress={handleResetPress}>
        <Text style={styles.dangerButtonText}>🧹 Restaurar Padrão de Fábrica</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  cardDark: { backgroundColor: '#2A2A2A' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  rowDark: { borderBottomColor: '#444' },
  label: { fontSize: 16, color: '#333', fontWeight: '500' },
  textDark: { color: '#FFF' },
  dangerButton: { backgroundColor: '#FF4D4D', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  dangerButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});