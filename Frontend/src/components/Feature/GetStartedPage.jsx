// GetStartedPage.jsx
import React from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import Tilt from 'react-parallax-tilt';

const GetStartedPage = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <animated.div style={fadeIn}>
      {/* <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05}> */}
        <VStack spacing={8} align="stretch" p={4} boxShadow="lg" borderRadius="lg"alignItems="center" >
          <Image boxSize="300px" src="https://th.bing.com/th/id/OIG1.qwUOOM_3MSTuYMMtTE8U?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Get Started" borderRadius="md" />
          <Text fontSize="lg" fontWeight="bold">
            Get Started for Free
          </Text>
          <Text fontSize="sm" color="gray.600">
            Start with our forever-free Basic plan, or get more from Slido for only US$12.5 per month.
          </Text>
          <Text fontSize="sm" color="gray.600">
            
          </Text>
        </VStack>
      {/* </Tilt> */}
    </animated.div>
  );
};

export default GetStartedPage;
