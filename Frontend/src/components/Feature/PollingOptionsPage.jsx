// PollingOptionsPage.jsx
import React from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import Tilt from 'react-parallax-tilt';

const PollingOptionsPage = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <animated.div style={fadeIn}>
      {/* <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05}> */}
        <VStack spacing={8} align="stretch" p={4} boxShadow="lg" borderRadius="lg" textAlign='center' alignItems="center" >
          <Image boxSize='500px' src="https://th.bing.com/th/id/OIG4.oT0ulb.jgNbOkPTX0zFU?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Polling Options" borderRadius="md" />
          <Text fontSize="lg" fontWeight="bold">
            5+ Polling Options
          </Text>
          <Text fontSize="sm" color="gray.600">
            With Slido's 5 types of polls, Q&A, quizzes and surveys, you can engage your participants in a variety of ways.
          </Text>
          <Text fontSize="sm" color="gray.600">
            
          </Text>
        </VStack>
      {/* </Tilt> */}
    </animated.div>
  );
};

export default PollingOptionsPage;
