/* eslint-disable prettier/prettier */
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';

const SignIn = () => {
        const onSignInPress = async () => {};
        const [form, setForm] = useState({
                email: '',
                password: '',
        });
        return (
                <ScrollView className="flex-1 bg-white">
                        <View className="flex-1 bg-white">
                                <View className="relative w-full h-60">
                                        <Image source={images.signUpCar} className="z-0 w-full h-60" />
                                        <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome</Text>
                                </View>
                        </View>
                        <View className="p-5">
                                <InputField label="Email" placeholder="Enter your email" icon={icons.email} value={form.email} onChangeText={(value) => setForm({ ...form, email: value })} />
                                <InputField
                                        label="Password"
                                        placeholder="Enter your password"
                                        icon={icons.lock}
                                        value={form.password}
                                        secureTextEntry={true}
                                        onChangeText={(value) => setForm({ ...form, password: value })}
                                />
                                <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

                                <OAuth />

                                <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
                                        <Text className="">Don't have an account? </Text>
                                        <Text className="text-primary-500">Sign Up</Text>
                                </Link>
                                {/* TODO: Verification Modal */}
                        </View>
                </ScrollView>
        );
};
export default SignIn;
