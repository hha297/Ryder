import { useStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';

import CustomButton from '@/components/CustomButton';
import { PaymentProps } from '@/types/type';
import { Alert } from 'react-native';
import { fetchAPI } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { useAuth } from '@clerk/clerk-expo';

const Payment = ({ fullName, email, amount, driverId, rideTime }: PaymentProps) => {
        const { initPaymentSheet, presentPaymentSheet } = useStripe();
        const { userAddress, userLongitude, userLatitude, destinationLatitude, destinationAddress, destinationLongitude } = useLocationStore();
        const userId = useAuth();
        const [success, setSuccess] = useState<boolean>(false);
        const [publishableKey, setPublishableKey] = useState('');

        const initializePaymentSheet = async () => {
                const { error } = await initPaymentSheet({
                        merchantDisplayName: 'Example, Inc.',
                        intentConfiguration: {
                                mode: {
                                        amount: 1099,
                                        currencyCode: 'USD',
                                },
                                confirmHandler: async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
                                        const { paymentIntent, customer } = await fetchAPI('/(api)/(stripe)/create', {
                                                method: 'POST',
                                                headers: {
                                                        'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                        name: fullName || email.split('@')[0],
                                                        email: email,
                                                        amount: amount,
                                                        paymentMethodId: paymentMethod.id,
                                                }),
                                        });
                                        if (paymentIntent.client_secret) {
                                                const { result } = await fetchAPI('/(api)/(stripe)/pay', {
                                                        method: 'POST',
                                                        headers: {
                                                                'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                                payment_method_id: paymentMethod.id,
                                                                payment_intent_id: paymentIntent.id,
                                                                customer_id: customer,
                                                                client_secret: paymentIntent.client_secret,
                                                        }),
                                                });
                                                if (result.client_secret) {
                                                        await fetchAPI('/(api)/ride/create', {
                                                                method: 'POST',
                                                                headers: {
                                                                        'Content-Type': 'application/json',
                                                                },
                                                                body: JSON.stringify({
                                                                        origin_address: userAddress,
                                                                        destination_address: destinationAddress,
                                                                        origin_latitude: userLatitude,
                                                                        origin_longitude: userLongitude,
                                                                        destination_latitude: destinationLatitude,
                                                                        destination_longitude: destinationLongitude,
                                                                        ride_time: rideTime.toFixed(0),
                                                                        fare_price: parseInt(amount) * 100,
                                                                        payment_status: 'paid',
                                                                        driver_id: driverId,
                                                                        user_id: userId,
                                                                }),
                                                        });
                                                }
                                        }
                                },
                        },
                });
                if (error) {
                }
        };

        const confirmHandler = async () => {};
        const openPaymentSheet = async () => {
                await initializePaymentSheet();

                const { error } = await presentPaymentSheet();

                if (error) {
                        Alert.alert(`Error code: ${error.code}`, error.message);
                } else {
                        setSuccess(true);
                }
        };

        return (
                <>
                        <CustomButton title="Confirm Ride" className="my-10" onPress={openPaymentSheet} />
                </>
        );
};

export default Payment;
