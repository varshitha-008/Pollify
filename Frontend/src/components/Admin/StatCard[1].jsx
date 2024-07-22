import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

const StatCard = ({ label, value }) => (
  <Box
    px={{ base: 4, md: 8 }}
    py={'5'}
    shadow={'xl'}
    border={'1px solid'}
    borderColor={'gray.800'}
    rounded={'lg'}
  >
    <Stat>
      <StatLabel fontWeight={'medium'} isTruncated>
        {label}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {value}
      </StatNumber>
      <StatHelpText>As of today</StatHelpText>
    </Stat>
  </Box>
);

export default StatCard;
