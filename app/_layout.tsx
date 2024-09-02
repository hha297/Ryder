import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { tokenCache } from '@/lib/auth';
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Clerk:']);
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
        throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

export default function RootLayout() {
        const [loaded] = useFonts({
                'Jakarta-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
                'Jakarta-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
                'Jakarta-ExtraLight': require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
                'Jakarta-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
                'Jakarta-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
                Jakarta: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
                'Jakarta-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        });

        useEffect(() => {
                if (loaded) {
                        SplashScreen.hideAsync();
                }
        }, [loaded]);

        if (!loaded) {
                return null;
        }

        return (
                <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
                        <ClerkLoaded>
                                <Stack>
                                        <Stack.Screen name="index" options={{ headerShown: false }} />
                                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                                        <Stack.Screen name="(root)" options={{ headerShown: false }} />

                                        <Stack.Screen name="+not-found" />
                                </Stack>
                        </ClerkLoaded>
                </ClerkProvider>
        );
}
