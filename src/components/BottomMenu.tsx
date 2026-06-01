import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const BottomMenu = ({ currentTab, onChangeTab, isDarkMode }: Props) => {
  return (
    <View style={[styles.menuContainer, isDarkMode && styles.menuContainerDark]}>
      <TouchableOpacity style={[styles.menuItem, currentTab === 'home' && (isDarkMode ? styles.activeDark : styles.activeLight)]} onPress={() => onChangeTab('home')}>
        <Text style={[styles.menuText, currentTab === 'home' && styles.activeText]}>🏠 Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, currentTab === 'add' && (isDarkMode ? styles.activeDark : styles.activeLight)]} onPress={() => onChangeTab('add')}>
        <Text style={[styles.menuText, currentTab === 'add' && styles.activeText]}>➕ Nova</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, currentTab === 'settings' && (isDarkMode ? styles.activeDark : styles.activeLight)]} onPress={() => onChangeTab('settings')}>
        <Text style={[styles.menuText, currentTab === 'settings' && styles.activeText]}>⚙️ Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: { flexDirection: 'row', height: 60, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  menuContainerDark: { backgroundColor: '#2A2A2A', borderTopColor: '#444' },
  menuItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeLight: { backgroundColor: '#FFF5F2' },
  activeDark: { backgroundColor: '#3A2420' },
  menuText: { fontSize: 14, color: '#888', fontWeight: '500' },
  activeText: { color: '#FF6347', fontWeight: 'bold' },
});