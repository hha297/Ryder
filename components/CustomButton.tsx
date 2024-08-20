import { ButtonProps } from '@/types/type';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
        switch (variant) {
                case 'secondary':
                        return 'bg-gray-500';
                case 'danger':
                        return 'bg-red-500';
                case 'success':
                        return 'bg-green-500';
                case 'outline':
                        return 'bg-transparent bg-neutral-300 border-1';
                default:
                        return 'bg-[#0286FF]';
        }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
        switch (variant) {
                case 'primary':
                        return 'text-black';
                case 'secondary':
                        return 'text-gray-200';
                case 'danger':
                        return 'text-red-500';
                case 'success':
                        return 'text-green-500';
                default:
                        return 'text-white';
        }
};
const CustomButton = ({ onPress, title, bgVariant = 'primary', textVariant = 'default', IconLeft, IconRight, className, ...props }: ButtonProps) => {
        return (
                <TouchableOpacity
                        onPress={onPress}
                        className={`w-4/5 rounded-full p-4 mb-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400 ${getBgVariantStyle(bgVariant)} ${className}`}
                        {...props}
                >
                        {IconLeft && <IconLeft />}
                        <Text className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
                        {IconRight && <IconRight />}
                </TouchableOpacity>
        );
};

export default CustomButton;
