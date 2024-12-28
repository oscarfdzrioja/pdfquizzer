import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { Outlet, createFileRoute} from "@tanstack/react-router"
import Logo from "/assets/images/dalle-pdfquizzer3.webp"
import { Nav } from "../components/Common/Nav"

export const Route = createFileRoute("/_layout-public")({
  component: Layout,
  beforeLoad: async () => {
  },
})

function Layout () {
  const BrandName = 'LeadSmart'
  return (
    <>

        <Flex minH="100vh" bg={useColorModeValue('white', 'gray.800')} as="main">
            <Box
                w='50%'
                display={{ base: 'none', lg: 'block' }} 
                bgSize="cover"
                bgPos="center"
                position="relative"
                style={{                                        
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat' 
                }}
            >
                <Box bg="gray.900" opacity="0.1" position="absolute" top="0" left="0" w='100%' h="100%"></Box>
            </Box>
            <Box w={{ base: '100%', lg: '50%' }} minH="100vh" p='8'>
                <VStack align="center" spacing="5" justify="center" h="100%" alignItems="stretch">
                  <Outlet />
                </VStack>
            </Box>
        </Flex>
    </>
  )
}
