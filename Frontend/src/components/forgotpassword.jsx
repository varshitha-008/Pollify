
import React, { useState } from 'react';
import axios from './api';
import { PinInput, PinInputField, VStack, Button, useToast, Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const toast = useToast();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/send-otp', { email });
            setIsOtpSent(true);
            toast({
                title: 'OTP Sent',
                description: response.data,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const handleOtpComplete = async (value) => {
        // e.preventDefault();
        try {
            const response = await axios.post('/verify-otp', { email, otp: value });
            const { message, token } = response.data; // Destructure message and token from response.data

            toast({
                title: 'Success',
                description: message, // Render the message directly
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
    
            localStorage.setItem('resetToken', token);
            console.log("Token:", token);
    
            setTimeout(() => {
                window.location.href = '/change-password';
            }, 1500);

        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        < Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
            <VStack spacing={4}>
                {!isOtpSent ? (
                    <form onSubmit={handleEmailSubmit}>
                        <FormControl id="password" mt="4" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required /><br/>
                            <Button type="submit" colorScheme="teal">
                                Send OTP
                            </Button>
                        </FormControl>
                    </form>

                ) : (
                    <>
                        <PinInput value={otp} onChange={handleOtpChange} onComplete={handleOtpComplete}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                        <Button onClick={() => handleOtpComplete(otp)} colorScheme="teal">
                            Verify OTP
                        </Button>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default ForgotPassword;
