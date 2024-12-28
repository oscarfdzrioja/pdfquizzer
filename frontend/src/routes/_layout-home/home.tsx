import { Navbar, Header, Features, AuthPages, LayoutPages, Footer } from '../../components/home/components'
import {
    Link as RouterLink,
    createFileRoute,
    redirect,
} from "@tanstack/react-router"
import useAuth, { isLoggedIn } from "../../hooks/useAuth"
import { Survey } from 'survey-react-ui'
import SurveyComponent from '../../components/dashboard/SurveyComponent'
import { Box, Flex } from '@chakra-ui/react'
import SurveyExample from '../../components/home/components/SurveyExample'
import Hero from '../../components/home/components/Hero'
import { useRef } from 'react'

export const Route = createFileRoute("/_layout-home/home")({
    component: Home,
    beforeLoad: async () => {
      if (isLoggedIn()) {
        return
        throw redirect({
          to: "/",
        })
      }
    },
})


export default function Home () {
   const surveyComponetRef = useRef(null);
   const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
   };

    return (
        <>           
            <Navbar />
            <Hero surveyRef={surveyComponetRef} handleGoToRef={scrollToSection} />
            <Header />
            <main>
                <Features />                
                <SurveyExample surveyRef={surveyComponetRef} handleGoToRef={scrollToSection} />
                <LayoutPages />
            </main>
            <Footer />
        </>
    )
}