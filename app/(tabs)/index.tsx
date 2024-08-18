import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
        return (
                <SafeAreaView className="flex-1 bg-white items-center justify-center">
                        <Text className="text-red-500">Test</Text>
                        <StatusBar style="auto" />
                </SafeAreaView>
        );
}
