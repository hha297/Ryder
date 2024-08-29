import { useAuth } from '@clerk/clerk-expo';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { PaymentProps } from '@/types/type';

const Payment = ({ fullName, email, amount, driverId, rideTime }: PaymentProps) => {
        const openPaymentSheet = async () => {};
        return (
                <>
                        <CustomButton title="Confirm Ride" className="my-10" onPress={openPaymentSheet} />
                </>
        );
};

export default Payment;
