import { Box, Center, Container, Text, Skeleton } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import React, { PureComponent, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Legend, } from 'recharts';

import useAuth from "../../hooks/useAuth"
import { ItemsService, RepliesService } from "../../client";

import { useQuery, useQueryClient } from "@tanstack/react-query"

export const Route = createFileRoute("/_layout-dashboard/")({
  component: Dashboard,
})


const generateRandomData = () => {
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      name: `Quiz${i}`,
      qc: Math.floor(Math.random() * 101), 
    });
  }  
  return data;
};

const PER_PAGE = 100

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["itemsDashboard", { page }],
  }
}

const legendPayloadQuizzesCompletes = [
  { value: 'Número de veces que han completado tus Quizzes los usuarios registrados', type: 'square', id: 'ID01', color: '#38A169' },
];

const legendPayloadQuizzesLike = [
  { value: 'Número de ♥ de tus Quizzes por los usuarios registrados', type: 'square', id: 'ID01', color: '#38A169' },
];

const GraphActivity = ( {data=[], legend=[] } ) => {    
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend payload={legend} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="qc" fill="#38A169" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
       </div>
    );
}

function Dashboard() {
  const { user: currentUser } = useAuth()
  const [quizzesCurrentUser, setQuizzesCurrentUser] = useState([])
  const [quizzesLikesCurrentUser, setQuizzesLikesCurrentUser] = useState([])

  const page = 1
  const {
    data,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  useEffect(() => {      
    const fetchDataItem = async ( item ) => {
      const data = await RepliesService.readReplyItems({ skip: 0, limit: 100, itemId: item.id })      
      setQuizzesCurrentUser((prev) => { 
        return prev.map((prevItem) => {
          if (prevItem.itemId === item.id) {
            return {
              ...prevItem,
              qc: data?.count
            }
          }
          return prevItem
        })
      })
    }

    if (data?.data) {      
      setQuizzesCurrentUser(data.data.map((item: any) => {
        return {
          itemId: item.id,
          name: item.title,
          qc: 0
        }
      }))

      setQuizzesLikesCurrentUser(data.data.map((item: any) => {
        return {
          itemId: item.id,
          name: item.title,
          qc: 0
        }
      }))

      Promise.all(data.data.map((item) => fetchDataItem(item)));
    }

  }, [data])

  return (
    <>
      <Container maxW="full">
        <Box style={{ minHeight: "100vh"}}  pt={12} m={4} textAlign={"center"}>
          <Text fontSize="2xl" >          
            Hola, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text >
            Bienvenido, es un placer verte de nuevo!
          </Text>
          <Text textAlign={"left"} ml={20} mt={20} >
            Actividad de tus quizzes
          </Text>
          <Box  textAlign={"left"} mt={5}>          
            {isPending &&  <Skeleton height="300" />   }
            {!isPending && <GraphActivity legend={legendPayloadQuizzesCompletes} data={quizzesCurrentUser} /> }
            
          </Box>
          <Box  textAlign={"left"} mt={20}>
            {isPending &&  <Skeleton height="300" />   }
            {!isPending && <GraphActivity legend={legendPayloadQuizzesLike} data={quizzesLikesCurrentUser} /> }
          </Box>
        </Box>
      </Container>
    </>
  )
}


