import React from 'react';
import { Box } from '@chakra-ui/react';
import tutorial from '../assets/Tutorial.mp4';

const Tutorial = () => {
  return (
    <Box 
      maxW="full" 
      p={4}
      display="flex" 
      justifyContent="center"
      alignItems="center"
    >
      <video 
        src={tutorial} 
        controls 
        style={{ 
          maxWidth: '100%', 
          height: 'auto' 
        }} 
      />
    </Box>
  );
};

export default Tutorial;
