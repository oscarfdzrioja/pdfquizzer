import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { Link } from '@tanstack/react-router'

interface PageTypes {
    title: string
    description?: string
    id: string
}

export default function CardQuiz( { itemQuiz: { title, description, id } }: { itemQuiz: PageTypes }  ) {
  const [liked, setLiked] = useState(false)

  return (
    <Center py={6}>
      <Box                  
        overflow="hidden"
        transition="ease"
        transitionDuration="0.25s"
        _hover={{ 
            transform: 'scale(1.05)',
            shadow: 'lg'
        }}
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}        
        bg="#1C1C1C"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 #171923')}>
        <Box 
          as={Link} 
          to={`/quiz?item=${id}`} 
          h={'200px'} borderBottom={'1px'} borderColor="black"
        >
          <Img
            filter="hue-rotate(290deg)" 
            // src={"https://d1ymz67w5raq8g.cloudfront.net/Pictures/2000xAny/6/5/5/509655_shutterstock_1506580442_769367.jpg"}
            src={"/assets/images/pdfquizzer.png"}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>

          <Heading color={'white'} fontSize={'2xl'} noOfLines={1}>
            {title}
          </Heading>
        </Box>
        <HStack borderTop={'1px'} color="green">
          <Flex
            as={Link} 
            to={`/quiz?item=${id}`} 
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text color={"white"} fontSize={'md'} fontWeight={'semibold'}>
              Ver Quiz
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="green" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  )
}