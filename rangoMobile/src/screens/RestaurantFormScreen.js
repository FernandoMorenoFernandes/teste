import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from "../../services/api";

const RestaurantFormScreen = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { id } = route.params || {};

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchRestaurantDetails();
        }
    }, [id]);

    const fetchRestaurantDetails = async () => {
        try {
            const response = await api.get(`/restaurantes/${id}`);
            const { nome, descricao, imagem } = response.data;
            setName(nome);
            setDescription(descricao);
            setImage(imagem ? `data:image/jpeg;base64,${imagem}` : null);
        } catch (error) {
            console.error('Erro ao buscar detalhes do restaurante:', error);
        }
    };

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'É necessário permitir o acesso à galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name || !description || !image) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        const formData = new FormData();
        formData.append('nome', name);
        formData.append('descricao', description);

        const imageData = {
            uri: image,
            type: 'image/jpeg',
            name: 'imagem.jpg',
        };

        formData.append('imagem', imageData);

        try {
            if (isEditing) {
                await api.put(`/restaurantes/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert('Sucesso', 'Restaurante atualizado com sucesso!');
            } else {
                await api.post('/restaurantes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert('Sucesso', 'Restaurante salvo com sucesso!');
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar o restaurante.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Restaurante</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite o nome"
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Digite a descrição"
            />

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePickerText}>Escolha uma imagem</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>
                    {isEditing ? 'Atualizar Restaurante' : 'Salvar Restaurante'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    imagePickerText: {
        fontSize: 16,
        color: '#555',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RestaurantFormScreen;
