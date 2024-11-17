import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ restaurant, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false); // Estado para controlar o menu
    const navigation = useNavigation();

    // Função para abrir/fechar o menu
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Função para confirmar a exclusão
    const handleDelete = () => {
        onDelete(restaurant.id); // Chama a função de deletar
        setShowMenu(false); // Fecha o menu
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => { onEdit(restaurant.id); setShowMenu(false); }}>
                        <Text style={styles.menuItem}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.menuItem}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Exibindo a imagem do restaurante */}
            <View style={styles.imageContainer}>
                {restaurant.imagem ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${restaurant.imagem}` }} // Imagem em base64
                        style={styles.image}
                    />
                ) : (
                    <Text style={styles.noImageText}>Imagem não disponível</Text> // Fallback caso não tenha imagem
                )}
            </View>

            <Text style={styles.name}>{restaurant.nome}</Text>
            <Text style={styles.description}>{restaurant.descricao}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        padding: 10,
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    menuButton: {
        marginRight: 10,
    },
    menu: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 1,
    },
    menuItem: {
        padding: 10,
        fontSize: 16,
        color: 'black',
    },
    imageContainer: {
        width: 100, // Tamanho fixo para a imagem
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 10,
    },
    image: {
        width: '100%', // Ocupa todo o espaço disponível
        height: '100%', // Garante que a imagem ocupe o tamanho do contêiner
        resizeMode: 'cover', // Ajusta a imagem para cobrir o contêiner sem distorcer
    },
    noImageText: {
        textAlign: 'center',
        color: '#ccc',
        fontSize: 12,
        marginTop: 30,
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
});

export default RestaurantCard;
