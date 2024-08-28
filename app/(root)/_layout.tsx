import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Layout = () => {
        return (
                <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="find-ride" options={{ headerShown: false }} />
                        <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
                </Stack>
        );
};

export default Layout;
