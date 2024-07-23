// import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import api from './login-signup/api'; 

// const UserPolls = () => {
//   const [polls, setPolls] = useState([]);
//   const [scalepolls, setScalepolls] = useState([]);
//   const [binary, setBinary] = useState([]);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const response = await api.get('/polls', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPolls(response.data.polls || []);
//         setScalepolls(response.data.scalepolls || []);
//         setBinary(response.data.binarypoll || []);
//         console.log('Response:', response.data);
//       } catch (error) {
//         console.error('Error fetching user polls:', error.response?.data || error.message);
//         setError('Error fetching polls. Please try again later.');
//       }
//     };

//     fetchPolls();
//   }, [token]);

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   if (!polls.length && !scalepolls.length && !binary.length) return <Text>No polls available.</Text>;

//   const renderPolls = (polls, type) => (
//     <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
//       {polls.map((poll) => (
//         <Box
//           key={poll._id}
//           p={4}
//           boxShadow="lg"
//           borderWidth={1}
//           borderRadius="lg"
//           textAlign="center"
//           _hover={{ backgroundColor: 'gray.100' }}
//         >
//           <Link to={`/${type}/${poll._id}`}>
//             <Text fontSize="xl" fontWeight="bold">
//               {poll.title}
//             </Text>
//           </Link>
//           <Text mt={2}>{poll.questions.length} Questions</Text>
//           <Flex w="100%" justifyContent="space-between" mt={4}>
//             <Button as={Link} to={`/${type}/${poll._id}`} colorScheme="blue">
//               View Poll
//             </Button>
//             <Button as={Link} to={`/results/${poll._id}`} colorScheme="green">
//               View Results
//             </Button>
//           </Flex>
//         </Box>
//       ))}
//     </SimpleGrid>
//   );

//   return (
//     <Box maxW="1200px" mx="auto" p={4}>
//       <VStack spacing={6}>
//         {/* Displaying Regular Polls */}
//         {polls.length > 0 && (
//           <Box>
//             <Heading mb={4}>MCQ Polls</Heading>
//             {renderPolls(polls, 'polls')}
//           </Box>
//         )}

//         {/* Displaying Scale Polls */}
//         {scalepolls.length > 0 && (
//           <Box>
//             <Heading mb={4}>Scaling Polls</Heading>
//             {renderPolls(scalepolls, 'scalepolls')}
//           </Box>
//         )}

//         {/* Displaying Binary Polls */}
//         {binary.length > 0 && (
//           <Box>
//             <Heading mb={4}>Binary Polls</Heading>
//             {renderPolls(binary, 'true-false-poll')}
//           </Box>
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default UserPolls;




// import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import api from './login-signup/api'; 

// const UserPolls = () => {
//   const [polls, setPolls] = useState([]);
//   const [scalepolls, setScalepolls] = useState([]);
//   const [binary, setBinary] = useState([]);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const response = await api.get('/polls', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPolls(response.data.polls || []);
//         setScalepolls(response.data.scalepolls || []);
//         setBinary(response.data.binarypoll || []);
//         console.log('Response:', response.data);
//       } catch (error) {
//         console.error('Error fetching user polls:', error.response?.data || error.message);
//         setError('Error fetching polls. Please try again later.');
//       }
//     };

//     fetchPolls();
//   }, [token]);

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   if (!polls.length && !scalepolls.length && !binary.length) return <Text>No polls available.</Text>;

//   return (
//     <Box maxW="1200px" mx="auto" p={4}>
//       <VStack spacing={6}>
//         {/* Displaying All Polls in Grid */}
//         <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
//           {/* MCQ Polls */}
//           {polls.length > 0 && polls.map((poll) => (
//             <Box
//               key={poll._id}
//               p={4}
//               borderWidth={1}
//               borderRadius="lg"
//               boxShadow="lg"
//               _hover={{ backgroundColor: 'gray.50' }}
//             >
//               <Heading as={Link} to={`/polls/${poll._id}`} size="md" mb={2}>
//                 {poll.title}
//               </Heading>
//               <Text mt={2}>{poll.questions.length} Questions</Text>
//               <Flex w="100%" justifyContent="space-between" mt={4}>
//                 <Button colorScheme="teal" as={Link} to={`/polls/${poll._id}`}>
//                   Attempt Poll
//                 </Button>
//                 <Button colorScheme="teal" as={Link} to={`/polls/${poll._id}/responses`}>
//                   See Poll Result
//                 </Button>
//               </Flex>
//             </Box>
//           ))}

//           {/* Scale Polls */}
//           {scalepolls.length > 0 && scalepolls.map((poll) => (
//             <Box
//               key={poll._id}
//               p={4}
//               borderWidth={1}
//               borderRadius="lg"
//               boxShadow="lg"
//               _hover={{ backgroundColor: 'gray.50' }}
//             >
//               <Heading as={Link} to={`/scalepolls/${poll._id}`} size="md" mb={2}>
//                 {poll.title}
//               </Heading>
//               <Text mt={2}>{poll.questions.length} Questions</Text>
//               <Flex w="100%" justifyContent="space-between" mt={4}>
//                 <Button colorScheme="teal" as={Link} to={`/scalepolls/${poll._id}`}>
//                   Attempt Poll
//                 </Button>
//                 <Button colorScheme="teal" as={Link} to={`/scalepolls/${poll._id}/responses`}>
//                   See Poll Result
//                 </Button>
//               </Flex>
//             </Box>
//           ))}

//           {/* Binary Polls */}
//           {binary.length > 0 && binary.map((poll) => (
//             <Box
//               key={poll._id}
//               p={4}
//               borderWidth={1}
//               borderRadius="lg"
//               boxShadow="lg"
//               textAlign="center"
//               _hover={{ backgroundColor: 'gray.100' }}
//             >
//               <Link to={`/true-false-poll/${poll._id}`}>
//                 <Text fontSize="xl" fontWeight="bold">
//                   {poll.title}
//                 </Text>
//               </Link>
//               <Button
//                 as={Link}
//                 to={`/true-false-poll/${poll._id}`}
//                 colorScheme="blue"
//                 mt={2}
//               >
//                 View Poll
//               </Button>
//               <Button
//                 as={Link}
//                 to={`/true-false-poll/results/${poll._id}`}
//                 colorScheme="green"
//                 mt={2}
//               >
//                 View Results
//               </Button>
//             </Box>
//           ))}
//         </SimpleGrid>
//       </VStack>
//     </Box>
//   );
// };

// export default UserPolls;

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from './login-signup/api';

const UserPollsResult = () => {
    const [polls, setPolls] = useState([]);
    const [scalepolls, setScalepolls] = useState([]);
    const [binary, setBinary] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPolls = async () => {
            //   console.log('Token used for request:', token); // Debug line to check token value
            try {
                const response = await api.get('/polls', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPolls(response.data.polls || []);
                setScalepolls(response.data.scalepolls || []);
                setBinary(response.data.binarypoll || [])
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error fetching user polls:', error.response?.data || error.message);
                setError('Error fetching polls. Please try again later.');
            }
        };

        fetchPolls();
    }, [token]);

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!polls.length && !scalepolls.length) return <Text>No polls available.</Text>;

    return (
        <Box maxW="600px" mx="auto" p={4}>
            <Box w="100%" mx="auto" p={4}>
            <Heading fontSize={"24px"}>MCQ Polls</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6}>
                {polls.map((poll) => (
                    <GridItem key={poll._id} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" _hover={{ backgroundColor: 'gray.50' }}>
                        <Box>
                            <Heading as={Link} to={`/polls/${poll._id}`} size="md" mb={2}>
                                {poll.title}
                            </Heading>
                            <Text mt={2}>{poll.questions.length} Questions</Text>
                            <Flex w="100%" justifyContent="space-between" mt={4}>
                                <Button mt={2}
                                    ml={2} m={"2px"} colorScheme="blue" as={Link} to={`/polls/${poll._id}`}>
                                    View Poll
                                </Button>
                                <Button colorScheme="green"
                                    mt={2}
                                    ml={2} m={"2px"} as={Link} to={`/polls/${poll._id}/responses`}>
                                    View Result
                                </Button>
                            </Flex>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            </Box>
            <Box mt={8}  w="100%" mx="auto" p={4}>

                <Heading fontSize={"24px"}>Scalling Polls</Heading>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
                    gap={6}
                >
                    {scalepolls.map((poll) => (
                        <GridItem key={poll._id}>
                            <Box
                                // w="100%"
                                p={4}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="lg"
                                _hover={{ backgroundColor: 'gray.50' }}
                            >
                                <Heading as={Link} to={`/scalepolls/${poll._id}`} size="md" mb={2}>
                                    {poll.title}
                                </Heading>
                                <Text mt={2}>{poll.questions.length} Questions</Text>
                                <Flex w="100%" justifyContent="space-between" mt={4}>
                                    <Button mt={2}
                                        ml={2} m={"2px"} colorScheme="blue" as={Link} to={`/scalepolls/${poll._id}`}>
                                        View Poll
                                    </Button>
                                    <Button colorScheme="green"
                                        mt={2}
                                        ml={2} m={"2px"} as={Link} to={`/scalepolls/${poll._id}/responses`}>
                                        View Result
                                    </Button>
                                </Flex>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
            <Box w="100%" mx="auto" p={4}>

                <Heading fontSize={"24px"}>Binary Polls</Heading>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
                    gap={6}
                >
                    {binary.map((poll) => (
                        <GridItem key={poll._id}>
                            <Box
                                p={4}
                                boxShadow='lg'
                                borderWidth={1}
                                borderRadius="lg"
                                // textAlign='center'
                                _hover={{ backgroundColor: 'gray.100' }}
                            >
                                <Link to={`/true-false-poll/${poll._id}`}>
                                    <Text fontSize="xl" fontWeight="bold">
                                        {poll.title}
                                    </Text>
                                </Link>
                                <Text mt={2}>{poll.questions.length} Questions</Text>
                                <Flex w="100%" justifyContent="space-between" mt={4}>
                                    <Button
                                        as={Link}
                                        to={`/true-false-poll/${poll._id}`}
                                        colorScheme="blue"
                                        mt={2}
                                    >
                                        View Poll
                                    </Button>
                                    <Button
                                        as={Link}
                                        to={`/true-false-poll/results/${poll._id}`}
                                        colorScheme="green"
                                        mt={2}
                                        ml={2}
                                    >
                                        View Results
                                    </Button>
                                </Flex>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Box>

    );
};

export default UserPollsResult; 
