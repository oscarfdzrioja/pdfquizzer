import { Flex, Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect} from "@tanstack/react-router"
import UserMenu from "../components/Common/UserMenu"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { Link } from "@tanstack/react-router"
import { Box, Drawer, DrawerFooter,DrawerBody
    ,DrawerContent,HStack, Heading, IconButton, List, ListIcon, ListItem, Text,  useBreakpointValue,  useColorModeValue, useDisclosure  } from '@chakra-ui/react'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineHome, AiOutlineSetting, AiOutlineUserSwitch, AiOutlineFolderOpen, AiOutlineUser, AiOutlineClose } from 'react-icons/ai'
import { RiDashboardLine, RiTodoLine } from 'react-icons/ri'
import { IoEarthOutline } from 'react-icons/io5'
import { FiLogOut } from "react-icons/fi"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/_layout-dashboard")({
  component: LayoutDashboard,
  beforeLoad: async () => {
    if (!isLoggedIn()) {         
      throw redirect({
        to: "/home",
      })
    }
  },
})

type ListItem = {
    text?: string
    icon: React.ElementType
    id?: number
    path: string
}
  
const listItems: ListItem[] = [
    {
        text: 'Home',
        icon: AiOutlineHome,
        id: 1,
        path: '/home'
    },
    {
        text: 'Nuevo Quiz',
        icon: RiTodoLine,
        id: 2,
        path: '/surveys'
    },
    {
        text: 'Listado',
        icon: AiOutlineFolderOpen,
        id: 3,
        path: '/list'
    },
    {
        text: 'Dashboard',
        icon: RiDashboardLine,
        id: 3,
        path: '/'
    },
]
  

function LayoutDashboard() {
    const { getButtonProps, isOpen, onClose } = useDisclosure()
    const buttonProps = getButtonProps()

     const currentsBreakpoint = useBreakpointValue({ lg: 'lg' }, { ssr: false })
    if (currentsBreakpoint === "lg" && isOpen) {
        onClose()
    }

    const { logout } = useAuth()
    const handleLogout = async () => {
      console.log('logout') 
      logout()
    }

    return (
        <>
            <Flex as="nav" alignItems="center" justifyContent={{ base: 'space-between', lg: 'flex-end' }} h='10vh' p='2.5'>
                <HStack spacing={2} display={{ base: 'flex', lg: 'none' }}>
                    <IconButton {...buttonProps} fontSize="18px" variant='ghost' icon={<BiMenu />} aria-label='open menu'/>                  
                    <Heading as='h1' size="md">PDFQuizzer</Heading>
                </HStack>
            </Flex>
            <HStack align="start" spacing={0}>
                <Aside onClose={onClose} display={{ base: 'none', lg: 'block' }} />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="xs"
                >
                    <DrawerContent>
                        <DrawerBody>                            
                        </DrawerBody>
                          <Aside onClose={onClose} isOpen={isOpen} />                                            
                        <DrawerFooter>                      
                            <Flex
                              as="button"
                              onClick={handleLogout}
                              p={2}
                              color="ui.danger"
                              fontWeight="bold"
                              alignItems="center"
                            >
                              <FiLogOut />
                              <Text ml={2}>Log out</Text>
                            </Flex>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <Flex as="main" ml={{ base: 0, lg: '60' }} w='full' minH="90vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.900')}>
                        <Outlet />
                </Flex>
                <Flex display={{ base: 'none', lg: 'block' }}>
                  <UserMenu />
                </Flex>
            </HStack>
        </>
    )
}

type AsideProps = {
    display?: {
        base: string
        lg: string
    }
    onClose: () => void
    isOpen?: boolean
}

const Aside = ({ onClose, isOpen, ...rest }: AsideProps) => {
    
    return (
        <Box 
            as="aside"
            borderRight="2px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            w={{ base: '100%', lg: 60 }}
            top="0"
            pos="fixed"
            h="100%"
            minH="100vh"
            zIndex={99} 
            {...rest}
        >
            <HStack p="2.5" h='10vh' justify="space-between">              
                <Heading as='h1' size="md" as={Link} to={"/home"} >PDFQuizzer</Heading>
                <IconButton onClick={onClose}  display={isOpen ? 'flex' : 'none'} fontSize="18px" variant='ghost' icon={<AiOutlineClose />} aria-label='open menu'/>
            </HStack>
            <Box> 
                <List spacing={0} p="0.5">
                    {
                        listItems.map(item => (<ListElement key={item.id} icon={item.icon} text={item.text} path={item.path} />))
                    }
                </List>
            </Box>
        </Box>
    )
}

const ListElement = ({ icon, text, path }: ListItem) => {
    const pathname = window.location.pathname
    const isSelected = pathname === path
    
    const handleOnClickItem = (event) => { 
        document.querySelectorAll('.menuListItems').forEach((item) => {
            item.style.background = 'transparent'
        })               
        event.currentTarget.style.background = '#4A5568'
    }

    return (
      <>
      
        <ListItem className="menuListItems"  bg={isSelected ? "#4A5568" : "transparet"} onClick={handleOnClickItem} as={HStack} as={Link} to={path} style={{"display":"flex","padding":"10px","height":"50px"}}   spacing={0} h="10" pl="2.5" cursor="pointer" _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }} rounded="md">
            <ListIcon boxSize={5} as={icon} />
            {
                text && <Text>{text}</Text>
            }
        </ListItem>        
      </>
    )
}
