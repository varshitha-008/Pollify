import React from 'react'
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const FeatureMain = () => {
    return (
        <VStack spacing={8} align="stretch">
          <Link to="/intuitive-and-easy">
            <Box p={4} borderRadius="lg" boxShadow="md" bg="white" cursor="pointer">
              <Flex align="center" justify="space-between">
                {/* <Image src="" alt="Intuitive and Easy" boxSize="50px" borderRadius="md" /> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00774A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.9 5.9 0 0 0-7.75 0L12 10.5l-5.09-5.89a5.9 5.9 0 0 0-7.75 0l5.88 6.88 5.09 5.9a5.88 5.88 0 0 0 7.75 0l6.88-5.9 5.09-5.89a5.89 5.89 0 0 0 0-7.75z" />
          </svg>
                <Text fontSize="lg" fontWeight="bold">
                  Intuitive and Easy
                </Text>
              </Flex>
              <Text mt={2} fontSize="sm" color="gray.600">
                The attendees can join without any logins or downloads, and the setup for hosts takes only minutes.
              </Text>
            </Box>
          </Link>
          <Link to="/5+-polling-options">
            <Box p={4} borderRadius="lg" boxShadow="md" bg="white" cursor="pointer">
              <Flex align="center" justify="space-between">
                <Image src="polling-options.jpg" alt="Polling Options" boxSize="50px" borderRadius="md" />
                <Text fontSize="lg" fontWeight="bold">
                  5+ Polling Options
                </Text>
              </Flex>
              <Text mt={2} fontSize="sm" color="gray.600">
                With Slido's 5 types of polls, Q&A, quizzes and surveys, you can engage your participants in a variety of ways.
              </Text>
            </Box>
          </Link>
          <Link to="/get-started-for-free">
            <Box p={4} borderRadius="lg" boxShadow="md" bg="white" cursor="pointer">
              <Flex align="center" justify="space-between">
                <Image src="get-started.jpg" alt="Get Started" boxSize="50px" borderRadius="md" />
                <Text fontSize="lg" fontWeight="bold">
                  Get Started for Free
                </Text>
              </Flex>
              <Text mt={2} fontSize="sm" color="gray.600">
                Start with our forever-free Basic plan, or get more from Slido for only US$12.5 per month.
              </Text>
            </Box>
          </Link>
        </VStack>
      );
    
    
}

export default FeatureMain
