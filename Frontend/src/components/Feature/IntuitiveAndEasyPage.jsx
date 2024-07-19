// IntuitiveAndEasyPage.jsx
import React from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import Tilt from 'react-parallax-tilt';

const IntuitiveAndEasyPage = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <animated.div style={fadeIn}>
      {/* <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05}> */}
        <VStack spacing={8} align="stretch" p={4} boxShadow="lg" borderRadius="lg" alignItems="center">
          <Image boxSize="500px" src="https://th.bing.com/th/id/OIG3.ZMhPhuF47eElhNdbrwcv?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Intuitive and Easy" borderRadius="md" />

          <Text fontSize="lg" fontWeight="bold">
            Intuitive and Easy
          </Text>
          <Text fontSize="sm" color="gray.600">
            The attendees can join without any logins or downloads, and the setup for hosts takes only minutes.
          </Text>
          <Text fontSize="sm" color="gray.600">

          </Text>
        </VStack>
      {/* </Tilt> */}
    </animated.div>
  );
};

export default IntuitiveAndEasyPage;
