

import React from 'react';
import { Box, Grid, GridItem, Text, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// import CardCarousel from './Caraousal';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Box p={4} mt="0px" ml="-270px">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {features.map((feature, index) => (
            <GridItem
              key={index}
              p={4}
              borderRadius="lg"
              boxShadow="md"
              bg="white"
              backgroundColor="#faf7f0"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)', transition: 'all 0.3s ease-in-out' }}
            >
              <Link as={RouterLink} to={feature.link}>
                <Image src={feature.image} alt={feature.title} borderRadius="md" />
                <Text fontSize="lg" fontWeight="bold" mt={4}>
                  {feature.title}
                </Text>
                <Text mt={2} fontSize="sm" color="gray.600">
                  {feature.description}
                </Text>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
      {/* <CardCarousel /> */}
      <Footer />
    </>
  );
};

const features = [
  {
    title: 'Intuitive and Easy',
    description: 'The attendees can join without any logins or downloads, and the setup for hosts takes only minutes.',
    image: 'https://www.slido.com/static/slido-ico-intuitive-and-easy.8e57ab53.svg',
    link: '/intuitive-and-easy',
  },
  {
    title: '5+ Polling Options',
    description: 'With Slido\'s 5 types of polls, Q&A, quizzes and surveys, you can engage your participants in a variety of ways.',
    image: 'https://www.slido.com/static/slido-ico-5-polling-options.d9f3c44e.svg',
    link: '/5+-polling-options',
  },
  {
    title: 'Get Started for Free',
    description: 'Start with our forever-free Basic plan, or get more from Slido for only US$12.5 per month.',
    image: 'https://www.slido.com/static/slido-ico-get-started-for-free.6aa69787.svg',
    link: '/get-started-for-free',
  },
];

export default Home;
