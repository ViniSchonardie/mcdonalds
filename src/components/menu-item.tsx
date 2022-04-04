// @flow

import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

export type MenuItemType = {
    item: {
        description: string;
        name: string;
        price: number;
        url: string;
    }
};

export const MenuItem = ({ item }: MenuItemType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { description, name, price, url } = item;
  return (
    <>
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            style={styles.container}
        >
            <Image style={styles.image} source={{ uri: url }} resizeMode={'contain'} />
            <Text numberOfLines={3} style={styles.title}>{name}</Text>
        </TouchableOpacity>
        <Modal
            collapsable
            swipeDirection={'down'}
            backdropOpacity={0.6}
            hasBackdrop
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
            isVisible={modalVisible} 
            style={{ margin: 0 }}
        >
            <View style={styles.containerModal}>
                <Image style={styles.imageModal} source={{ uri: url }} resizeMode={'contain'} />
                <Text style={styles.titleModal}>{name}</Text>
                <View style={styles.containerPrice}>
                    <Text>${price}</Text>  
                </View>
                <Text style={{ textAlign: 'center' }}>{description}</Text>
            </View>
        </Modal>
    </>
  );
};

const styles = StyleSheet.create({
    container: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 1, 
        marginRight: 16, 
        borderRadius: 5,
        width: 160,
        height: 160,
        borderColor: '#D8D8D8'
    },
    image: { height: 100, width: 100 },
    imageModal: { height: 250, width: 250 },
    title: { fontSize: 12, lineHeight: 12, fontWeight: '400', paddingHorizontal: 18 },
    containerModal: { 
        alignItems: 'center', 
        paddingHorizontal: 30, 
        bottom: 0, 
        position: 'absolute', 
        backgroundColor: 'white', 
        width: '100%', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        height: '95%' 
    },
    titleModal: { fontWeight: '700', fontSize: 24, lineHeight: 24, textAlign: 'center' },
    containerPrice: { borderWidth: 1, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10, marginVertical: 15 }
  });

