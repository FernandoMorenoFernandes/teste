import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from "../../services/api";

const RestaurantsScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigation = useNavigation();

    const fetchRestaurants = async () => {
        try {
            const response = await api.get('/restaurantes');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Erro ao buscar restaurantes:', error);
            Alert.alert('Erro', 'Não foi possível carregar os restaurantes');
        }
    };

    const confirmDelete = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja deletar este restaurante?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Deletar', onPress: () => deleteRestaurant(id), style: 'destructive' },
            ]
        );
    };

    const deleteRestaurant = async (id) => {
        try {
            await api.delete(`/restaurantes/${id}`);
            Alert.alert('Sucesso', 'Restaurante deletado com sucesso!');
            fetchRestaurants(); // Atualiza a lista após deletar
        } catch (error) {
            console.error('Erro ao deletar restaurante:', error);
            Alert.alert('Erro', 'Não foi possível deletar o restaurante.');
        }
    };

    // Atualiza os dados toda vez que a tela ganha foco
    useFocusEffect(
        useCallback(() => {
            fetchRestaurants();
        }, [])
    );

    const renderRestaurant = ({ item }) => (
        <View style={styles.card}>
            {item.imagem ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
                    style={styles.image}
                />
            ) : (
                <Text style={styles.noImageText}>Imagem não disponível</Text>
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.description}>{item.descricao}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                            navigation.navigate('RestaurantForm', { id: item.id })
                        }
                    >
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => confirmDelete(item.id)}
                    >
                        <Text style={styles.deleteButtonText}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum restaurante encontrado</Text>}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('RestaurantForm')}
            >
                <Text style={styles.addButtonText}>Adicionar Restaurante</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 100,
        height: 100,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noImageText: {
        textAlign: 'center',
        color: '#aaa',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default RestaurantsScreen;
