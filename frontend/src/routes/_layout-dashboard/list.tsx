import { background, Badge, Box, Button, Center, Container, Divider, Flex, Grid, GridItem, SimpleGrid, SkeletonText, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"
import Header from "../../components/dashboard/Header"
import { ItemsService } from "../../client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import ActionsMenu from "../../components/Common/ActionsMenu"
import { z } from "zod"
import { JSONEditor } from 'reactjs-json-editor';
import './reactjs-json-editor.css';
import { TableReplies } from "../../components/dashboard/tableReplies"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { FiCopy } from "react-icons/fi"
import useCustomToast from "../../hooks/useCustomToast"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout-dashboard/list")({
  component: List,
  validateSearch: (search) => itemsSearchSchema.parse(search)
})

const PER_PAGE = 10

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["items", { page }],
  }
}



function List() {
  const { user: currentUser } = useAuth()
  const showToast = useCustomToast()
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
  navigate({ search: (prev) => ({ ...prev, page }) })
  const [itemSelected, setItemSelected] = useState({
    id: "",
    title: "",
  })

  const {
    data: items,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      showToast(
        "URL Copiada",
        "URL copiada al portapapeles.",
        "success",
      );
    });
  };

  return (
    <>
      <Container overflowY="auto" overflowX={"auto"} maxW="100%" >
        <Box pt={0} m={0}>
          <Flex w="100%" style={{ minHeight: "100vh"}} justify="center" mt={12}>
            <Flex w="100%" style={{ minHeight: ""}}  flexDir="column">
              <Header title={"Listado de Quizzes"} imgSrc="/assets/images/pdfquizzer.png" />
              <Divider mb={5} />             
              <Grid templateColumns={{ md: "1fr", xl: "2fr 1fr" }} spacing={0} gap={10} p={10}>
                <GridItem border={{ sm:"2px solid #2E3039",  lg: "2px solid #2E3039" }}>              
                  <Badge  p={2} colorScheme="green">
                    Quizzes Creadas por {currentUser?.email}
                  </Badge>
                  <TableContainer>
                    <Table size={{ base: "sm", md: "md" }}>
                      <Thead>
                        <Tr>
                          <Th>Título</Th>
                          <Th>Publicada</Th>
                          <Th>Visible en Home</Th>
                          <Th>Link</Th>
                          <Th>Acciones</Th>
                        </Tr>
                      </Thead>
                      {isPending ? (
                        <Tbody>
                          <Tr>
                            {new Array(5).fill(null).map((_, index) => (
                              <Td key={index}>
                                <SkeletonText noOfLines={1} paddingBlock="16px" />
                              </Td>
                            ))}
                          </Tr>
                        </Tbody>
                      ) : (
                        <Tbody>
                          {items?.data.map((item) => (
                            <Tr key={item.id} opacity={isPlaceholderData ? 0.5 : 1} >                 
                              <Td  style={{cursor:'pointer'}} isTruncated maxWidth="150px" onClick={() => setItemSelected({id:item.id, title:item.title})}>
                                <Text as="span" textDecoration="underline">
                                  <ArrowForwardIcon />{item.title}
                                </Text>                                
                              </Td>
                              <Td
                                color={!item.description ? "ui.dim" : "inherit"}
                                isTruncated
                                maxWidth="150px"
                                height={20}
                              >
                                {item.public ? "Si" : "No"}

                              </Td>
                              <Td
                                color={!item.description ? "ui.dim" : "inherit"}
                                isTruncated
                                maxWidth="150px"
                                height={20}
                              >
                                {item.public_home ? "Si" : "No"}

                              </Td>
                              <Td>
                                <Button
                                  leftIcon={<FiCopy />}
                                  size="sm"
                                  onClick={() => handleCopy(`${window.location.origin}/quiz?item=${item.id}`)}
                                >
                                  Copiar URL
                                </Button>
                              </Td>
                              <Td>
                                <ActionsMenu type={"Item"} value={item} />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      )}
                    </Table>
                  </TableContainer>
                  <Flex
                      gap={4}
                      alignItems="center"
                      mt={4}
                      mb={4}
                      ml={4}
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
                        Anterior
                      </Button>
                      <span>Página {page}</span>
                      <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
                        Siguiente
                      </Button>
                  </Flex>               
                </GridItem>

                <GridItem border={{ sm:"2px solid #2E3039",  lg: "2px solid #2E3039" }}>
                      <TableReplies itemId={itemSelected.id} itemTitle={itemSelected.title } />
                </GridItem>
                
              </Grid>
            </Flex>          
          </Flex>
        </Box>
      </Container>
    </>
  );
}