import { useState } from 'react'

export const useRegionDrawer = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return {
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        isOpen
    }
}