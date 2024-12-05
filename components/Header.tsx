import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Saylani Quiz App</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#81C784',
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
