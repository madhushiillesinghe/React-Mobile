import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Appbar, IconButton, Title } from 'react-native-paper';
import { Link } from 'expo-router';

function Index() {
    return (
        <View style={styles.container}>
            {/* Appbar */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.Content title="Dashboard" />
            </Appbar.Header>

            {/* Scrollable Dashboard Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text variant="headlineLarge" style={styles.title}>Welcome Back!</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>Let's manage your system with ease.</Text>

                {/* Grid Layout for Cards */}
                <View style={styles.gridContainer}>
                    {/* Orders Card */}
                    <Card style={styles.card}>
                        <Card.Content>
                            <IconButton icon="cart" size={40} color="#4CAF50" style={styles.icon} />
                            <Title style={styles.cardTitle}>Orders</Title>
                            <Text>Manage and view your orders.</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => console.log('Go to Orders')} style={styles.cardButton}>View Orders</Button>
                        </Card.Actions>
                    </Card>

                    {/* Customers Card */}
                    <Card style={styles.card}>
                        <Card.Content>
                            <IconButton icon="account-group" size={40} color="#2196F3" style={styles.icon} />
                            <Title style={styles.cardTitle}>Customers</Title>
                            <Text>Manage your customer base and profiles.</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => console.log('Go to Customers')} style={styles.cardButton}>View Customers</Button>
                        </Card.Actions>
                    </Card>

                    {/* Items Card */}
                    <Card style={styles.card}>
                        <Card.Content>
                            <IconButton icon="package" size={40} color="#FF9800" style={styles.icon} />
                            <Title style={styles.cardTitle}>Items</Title>
                            <Text>Manage your product inventory.</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => console.log('Go to Items')} style={styles.cardButton}>View Items</Button>
                        </Card.Actions>
                    </Card>

                    {/* Settings Card */}
                    <Card style={styles.card}>
                        <Card.Content>
                            <IconButton icon="settings" size={40} color="#9C27B0" style={styles.icon} />
                            <Title style={styles.cardTitle}>Settings</Title>
                            <Text>Configure your system settings.</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => console.log('Go to Settings')} style={styles.cardButton}>Settings</Button>
                        </Card.Actions>
                    </Card>
                </View>

                {/* Example Link */}
                <Link href="/someOtherPage">
                    <Button mode="outlined" style={styles.linkButton}>Go to Another Page</Button>
                </Link>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    appbar: {
        backgroundColor: '#6200EE',
    },
    content: {
        padding: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 30,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '45%',
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    icon: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    cardButton: {
        marginTop: 8,
    },
    linkButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default Index;
