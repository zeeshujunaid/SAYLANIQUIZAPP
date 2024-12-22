import { View, Text, StyleSheet, ScrollView } from 'react-native';

function Demo() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>Hello, React Native!</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 10,
    },
    box: {
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
    },
    text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Demo;
