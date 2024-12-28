import { Box, Card, Container, Grid, GridItem, Heading, Image, Skeleton, VStack, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ItemsService } from "../../../client"
import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import CardQuiz from "./CardQuiz"


interface PageTypes {
    title: string
    description?: string
    id: string
}

const PER_PAGE = 25

function getItemsQueryOptions({ page }: { page: number }) {
    return {
      queryFn: () =>
        ItemsService.readPublicItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
      queryKey: ["itemsPublicRestricted", { page }],
    }
}

export default function LayoutPages () {
    const page = 1
    const PER_PAGE = 25
    
    const {
        data:items,
        isPending,
        isPlaceholderData,
      } = useQuery({
        ...getItemsQueryOptions({ page }),
        placeholderData: (prevData) => prevData,
    })

    return (
        <Box as="section" py="12" id="layoutQuizzesPage">
            <Container maxW="7xl">
                <Heading color="green.500" as="h2" textAlign="center">Quizzes disponibles</Heading>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={5} py='8'>
                    {           
                        isPending 
                        ? new Array(3).fill(null).map((_, index) => (                            
                              <Skeleton key={index} noOfLines={1} height="350px" />                            
                          ))
                               
                        : items?.data.map((item, index) => {
                            return (
                                <GridItem key={index}>
                                    {/* <PageCard itemQuiz={item} /> */}
                                    <CardQuiz itemQuiz={item} />
                                </GridItem>
                            )
                        })
                    }
                </Grid>
                {
                    !isPending && !items?.data && (
                        <Heading textAlign="center" as="h3" size="md" color="gray.500" >No tenemos Quizzes disponibles 😪</Heading>
                    )
                }
            </Container>
        </Box>
    )
}

const PageCard = ({ itemQuiz: { title, description, id } }: { itemQuiz: PageTypes } ) => {
    return (
        <VStack 
            border="1px" 
            p='0' 
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.100', 'gray.800')} 
            as={Link} 
            to={`/quiz?item=${id}`} 
            h='full' 
            align="center" 
            rounded="md" 
            overflow="hidden"
            transition="ease"
            transitionDuration="0.25s"
            _hover={{ 
                transform: 'scale(1.05)',
                shadow: 'lg'
            }}
        >
            <Heading as="h3" fontSize="lg" p='2' fontWeight="medium" >{title}</Heading>
            <Image objectFit={'cover'} mb={0} filter="hue-rotate(90deg)"  h="100%" w='250' src={"https://d1ymz67w5raq8g.cloudfront.net/Pictures/2000xAny/6/5/5/509655_shutterstock_1506580442_769367.jpg"} alt={title} rounded="md" overflow="hidden" />
        </VStack>
    )
}
