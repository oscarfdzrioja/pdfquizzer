import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    Container,
    useColorModeValue
} from '@chakra-ui/react'
import { Link } from "@tanstack/react-router"
import useAuth, { isLoggedIn } from "../../../hooks/useAuth"
import { useState } from 'react'
import SignUp from '../../../routes/_layout-public/signup';
import { FiLogIn, FiUserPlus, FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Navbar () {
    const [isLogged, setIsLogged ] =  useState( isLoggedIn() )
    const { logout } = useAuth()
    const handleLogout = async () => {
      logout()
    }
    return (
        <Box 
            as="nav"
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            
        >
            <Container maxW='7xl'>
                <Flex align={'center'}>
                    <Flex
                     display={{ base: 'none', md: 'block' }}
                     flex={{ base: 1 }}>
                        <Text                            
                            fontFamily={'heading'}
                            fontSize={{base:'md',md:'xl'}}
                            fontWeight="medium"
                            color="green.500"                            
                            >
                            PDFQuizeer
                        </Text>
                    </Flex>

                    <Stack
                        flex={{ base: 1, md: 0 }}                        
                        justify={{ base: 'center', md: 'flex-end' }}
                        direction={'row'}
                        spacing={6}
                    >
                        ThemeToggle 
                        {
                            isLogged ? ( <>
                                <Button
                                as={Link}
                                to="/"
                                variant="outline"
                                fontSize={{base:'xs',md:'lg'}}
                                fontWeight={400}
                                px={{ base:"4",md:"8"}}
                                py={{base:"3",md:"6"}}
                                leftIcon={<FiSettings />}
                                >
                                Dashboard
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    fontSize={{base:'xs',md:'lg'}}
                                    fontWeight={400}
                                    px={{ base:"4",md:"8"}}
                                    py={{base:"3",md:"6"}}
                                    leftIcon={<FiLogIn />}
                                    >
                                    Logout
                                </Button>
                                </>
                            ) : ( <>
                                <Button
                                as={Link}
                                to="/signup"
                                variant="outline"
                                fontSize={{base:'xs',md:'lg'}}
                                fontWeight={400}
                                px={{ base:"4",md:"8"}}
                                py={{base:"3",md:"6"}}
                                leftIcon={<FiUserPlus />}
                                >
                                Registro
                                </Button>
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="outline"
                                    fontSize={{base:'xs',md:'lg'}}
                                    fontWeight={400}
                                    px={{ base:"4",md:"8"}}
                                    py={{base:"3",md:"6"}}
                                    leftIcon={<FiUser />}
                                    >
                                    Login
                                </Button>
                            </>
                            )
                        }


                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}
