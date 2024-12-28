import { Flex, Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import Sidebar from "../components/Common/Sidebar"
import UserMenu from "../components/Common/UserMenu"
import useAuth, { isLoggedIn } from "../hooks/useAuth"

export const Route = createFileRoute("/_layout-home")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {    
      return 
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  const { isLoading } = useAuth()

  return (
  <>
  <Outlet />
  </>
  )
}
