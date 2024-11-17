import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textAboveBanner}>Explore os melhores restaurantes da cidade</Text>
            <Image
                source={require("../../assets/rango-banner.jpeg")}
                style={styles.banner}
            />
            <Text style={styles.textBelowBanner}>Falta pouco para matar a sua fome</Text>
            <Button
                title="Ver Restaurantes"
                onPress={() => navigation.navigate('Restaurants')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textAboveBanner: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    banner: {
        width: 300,
        height: 150,
        marginBottom: 10,
    },
    textBelowBanner: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});


export default HomeScreen;