import { icons } from '@/constants';
import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GoogleTextInput = ({ icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress }: GoogleInputProps) => {
        const googlePlaceApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

        return (
                <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
                        <GooglePlacesAutocomplete
                                fetchDetails={true}
                                placeholder="Where do you want to go?"
                                debounce={200}
                                styles={{
                                        textInputContainer: {
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 20,
                                                marginHorizontal: 20,
                                                position: 'relative',
                                                shadowColor: '#d4d4d4',
                                        },
                                        textInput: {
                                                backgroundColor: textInputBackgroundColor || 'white',
                                                fontSize: 16,
                                                fontWeight: '600',
                                                marginTop: 5,
                                                width: '100%',
                                                borderRadius: 20,
                                        },
                                        listView: {
                                                backgroundColor: textInputBackgroundColor || 'white',
                                                position: 'relative',
                                                top: 0,
                                                width: '100%',
                                                borderRadius: 10,
                                                shadowColor: '#d4d4d4',
                                                zIndex: 99,
                                        },
                                }}
                                onPress={(data, details = null) => {
                                        handlePress({ latitude: details?.geometry.location.lat!, longitude: details?.geometry.location.lng!, address: data.description });
                                }}
                                query={{
                                        key: googlePlaceApiKey,
                                        language: 'en',
                                }}
                                renderLeftButton={() => (
                                        <View className="justify-center items-center w-6 h-6">
                                                <Image source={icon ? icon : icons?.search} className="w-6 h-6" />
                                        </View>
                                )}
                                textInputProps={{
                                        placeholderTextColor: 'gray',
                                        placeholder: initialLocation ?? 'Where do you want to go?',
                                }}
                        />
                </View>
        );
};

export default GoogleTextInput;
