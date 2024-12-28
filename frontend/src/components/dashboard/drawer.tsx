import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
  } from '@chakra-ui/react'

export const DrawerQuizzer = ( {isOpen, onClose,finalFocusRef, children, } ) => {

  return (
    <Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    finalFocusRef={finalFocusRef}
    size='xl'
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Editor JSON de Quizzes</DrawerHeader>

      <DrawerBody>    
        {children}        
      </DrawerBody>

      <DrawerFooter>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}
