import { background, Badge, Box, Button, Center, Container, Divider, Flex, SimpleGrid, SkeletonText, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"
import Header from "../../components/dashboard/Header"
import { ItemsService, RepliesService } from "../../client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import ActionsMenu from "../../components/Common/ActionsMenu"
import { z } from "zod"
import { JSONEditor } from 'reactjs-json-editor';
import { UUID } from "crypto"


const PER_PAGE = 10

function getItemsQueryOptions({ page,itemId }: { page: number, itemId: UUID }) {
  return {
    queryFn: () =>
        RepliesService.readReplyItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE, itemId: itemId }),
    queryKey: ["repliesItem", { page, itemId }],
  }
}

interface Props{ 
    itemId: UUID
    itemTitle: string
}

export const TableReplies = ({itemId, itemTitle}: Props) => {

    const { user: currentUser } = useAuth()
    const queryClient = useQueryClient()
    const  [page, setPage]  = useState(1)
    
    const {
        data: items,
        isPending,
        isPlaceholderData,
    } = useQuery({
        ...getItemsQueryOptions({ page, itemId }),
        placeholderData: (prevData) => prevData,
    })

    const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE
    const hasPreviousPage = page > 1

    useEffect(() => {
        if (hasNextPage) {
        queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 , itemId: itemId}))
        }
    }, [page, queryClient, hasNextPage])

    useEffect(() => {           
        queryClient.prefetchQuery(getItemsQueryOptions({ page: page , itemId: itemId }))
     }, [itemId])

    console.log(items)
    return (
        <>
            <Badge  p={2} colorScheme="green">
            Respuestas del Quiz:  {itemTitle}  
            </Badge> 
            { items?.data.length < 1  && <Text align={'center'} p={4}>No hay respuestas en este Quiz 😔</Text> }
            <TableContainer>
            <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                <Tr>
                    <Th>Usuario</Th>
                    <Th>Puntuacion</Th>                    
                </Tr>
                </Thead>
                {isPending ? (
                <Tbody>
                    <Tr>
                    {new Array(2).fill(null).map((_, index) => (
                        <Td key={index}>
                        <SkeletonText noOfLines={1} paddingBlock="16px" />
                        </Td>
                    ))}
                    </Tr>
                </Tbody>
                ) : (
                <Tbody>                   
                    {items?.data.map((item) => (
                    <Tr key={item.id} opacity={isPlaceholderData ? 0.5 : 1}>                 
                        <Td isTruncated maxWidth="150px">
                        {item?.owner_email}
                        </Td>
                        <Td
                        color={!item.description ? "ui.dim" : "inherit"}
                        isTruncated
                        maxWidth="150px"
                        height={20}
                        >
                        {item.score}
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
                mr={5}
                direction="row"
                justifyContent="flex-end"
            >
                <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
                Anterior
                </Button>
                <span>Página {page}</span>
                <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
                Siguiente
                </Button>
            </Flex>
        </>
    )
}
