import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ActivityIndicator, SectionList, FlatList, StyleSheet } from 'react-native';
import { mcDonaldsApi } from '../api';
import { MenuItem, MenuItemType } from '../components/menu-item';

type MenuContent = {
    items: Array<MenuItemType>,
    name: string
}

export const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [mcDonaldsMenu, setMcDonaldsMenu] = useState([]);

  useEffect(() => {
    setLoading(true);
    mcDonaldsApi.get('/menu').then((response) => {
        const menuFormatted = response.data.menus.map((menu: MenuContent) => {
            return {
                data: menu.items,
                title: menu.name
            }
        })
        setMcDonaldsMenu(menuFormatted);
        setLoading(false);
    }).catch((err) => {
        setLoading(false)
    })
  }, []);

  const menuContent = () => {
        return (
          <SectionList 
            keyExtractor={(item) => item.name}
            sections={mcDonaldsMenu} 
            stickySectionHeadersEnabled={false}
            ListEmptyComponent={
                <View style={styles.containerEmptyList}>
                    <Text>O menu está vazio, tente novamente mais tarde.</Text>
                </View> 
            }
            renderItem={() => null}
            renderSectionHeader={({ section: { title, data } }) => (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    <FlatList 
                        keyExtractor={(item) => item.name}
                        data={data}
                        renderItem={({item}) => <MenuItem item={item}/>} 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )} />
        )
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/mcdonalds.png')} />
        </View>
        <View style={styles.separatorHeader} />

        {loading ?
            <View style={styles.containerLoading}>
                <ActivityIndicator size={'large'} /> 
                <Text>Carregando cardápio...</Text>
            </View> 
            :
            menuContent()
        }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    containerEmptyList: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    sectionTitle: { fontWeight: '700', fontSize: 36, lineHeight: 36, marginBottom: 22 },
    content: { paddingHorizontal: 19, marginTop: 26 },
    containerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    separatorHeader: { 
        height: 1, 
        backgroundColor: '#fff', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 2 
    }
  });
