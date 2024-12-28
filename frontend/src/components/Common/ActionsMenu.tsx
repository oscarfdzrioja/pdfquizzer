import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"
import {  AiOutlineEye } from "react-icons/ai"

import type { ItemPublic, UserPublic } from "../../client"
import EditItem from "../Items/EditItem"
import Delete from "./DeleteAlert"
import ViewItem from "../Items/ViewItem"

interface ActionsMenuProps {
  type: string
  value: ItemPublic | UserPublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const viewUserModal = useDisclosure()
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()
  
  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={viewUserModal.onOpen}
            icon={<AiOutlineEye fontSize="16px" />}
          >
            Ver Quiz
          </MenuItem>
          <MenuItem
            onClick={editUserModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Editar Quiz
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Borrar Quiz
          </MenuItem>
        </MenuList>
        {type === "Item" && (
          <EditItem
            item={value as ItemPublic}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        )}
        {type === "Item" && (
          <ViewItem
            item={value as ItemPublic}
            isOpen={viewUserModal.isOpen}
            onClose={viewUserModal.onClose}
          />
        )}

        <Delete
          type={type}
          id={value.id}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default ActionsMenu
