import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { RefObject } from 'react';

interface Props { 
  surveyRef: RefObject<HTMLDivElement>;
  handleGoToRef: (ref: RefObject<HTMLDivElement>) => void;
}

export default function Hero({surveyRef, handleGoToRef}: Props) {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        './assets/images/dalle-pdfquizzer3.webp'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack       
        w={'full'}
        justify={'end'}
        px={useBreakpointValue({ base: 4, md: 8 })}       
        bgGradient={'linear(to-r, blackAlpha.900, transparent)'}> 
        <Stack         
          mb={{ base: 40, md: 20 }}
          p={5}          
          maxW={'2xl'} align={'flex-start'} spacing={6}
          rounded={'xl'} borderWidth={1} borderColor={'gray.800'}
          border={0}
        >
          <Text       
            display={'none'}    
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}        
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            La Herramienta Definitiva para Generar Encuestas Tipo Quiz con IA
          </Text>
          <Stack direction={'row'}>
            <Button
              onClick={() => handleGoToRef(surveyRef)}
              bg={'green.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'green.500' }}>
              Ver demo de un Quiz 👇
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}