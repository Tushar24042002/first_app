import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { Text } from 'react-native';
import { ActivityIndicator, View } from 'react-native';

function Loader({ target, text }) {
    const [show, setShow] = useState(true); // Initialize as true to show loader initially

    useEffect(() => {
        // Hide loading component after a short delay (simulating window load)
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000); // Simulating a 2-second window load action

        return () => {
            clearTimeout(timer); // Cleanup timer
        };
    }, []); // Empty dependency array to run the effect only once on component mount

    useEffect(() => {
        // Function to handle loading state updates from the target
        const handleLoading = (loading) => {
            setShow(prevShow => prevShow + (loading ? 1 : -1)); // Increment or decrement show count
        };

        // Attach loading function to the target
        if (target) {
            target.loading = handleLoading;

            // Cleanup function to remove loading function from target
            return () => {
                delete target.loading;
            };
        }
    }, [target]); // Depend on target to re-run the effect when target changes

    return (
        show && (
            <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <View style={{ marginTop: 10 }}>
                    <Text>{text}</Text>
                </View>
            </Modal>
        )
    );
}

export default Loader;
