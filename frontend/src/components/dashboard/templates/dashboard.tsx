import { Box, Center, Container, Divider, Flex, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../../hooks/useAuth"
import Header from "../Header"

export const Route = createFileRoute("/_layout-dashboard/surveys")({
  component: Example,
})

function Example() {
  const { user: currentUser } = useAuth()


  return (
    <>
      <Container maxW="full">
        <Box pt={0} m={0}>
          <Flex w="100%" h="100vh"  justify="center" align="center">
            <Flex w="100%" h="90%" flexDir="column">
              <Header title={"Example"} imgSrc="/assets/images/pdfquizzer.png" />
              <Divider />
                           

            </Flex>          
          </Flex>
        </Box>
      </Container>
    </>
  );
}


