import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          alignItems:"center",
          bottom: 10, // Add more bottom spacing for better alignment
          left: 20,
          right: 20,
          height: 50, // Increased height for better visibility
          borderRadius: 35,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          paddingBottom: 8, // Add padding for better tab spacing
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* Donate Tab (Custom Center Button) */}
      <Tabs.Screen
        name="LiveQuiz"
        options={{
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <TabBarIcon name="plus" color="white" />
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 70, // Increased size for better prominence
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50', // Main color for the floating button
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position it absolutely to center above the tab bar
    bottom: 5, // Position above the tab bar
    left: '50%',
    transform: [{ translateX: -35 }], // Center the button horizontally
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});
