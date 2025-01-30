"use client"

import DialogContainer from '@/components/dialog-container'
import { createContext, ReactNode, useContext, useState } from 'react'

interface DialogContextType {
    isOpen: boolean
    content: ReactNode | null
    openDialog: (content: ReactNode) => void
    closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)
DialogContext.displayName = "DialogContext"

export function DialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState<ReactNode | null>(null)

    const openDialog = (content: ReactNode) => {
        setContent(content)
        setIsOpen(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
        setContent(null)
    }

    return (
        <DialogContext.Provider value={{ isOpen, content, openDialog, closeDialog }}>
            {children}
            {isOpen && content && (
                <DialogContainer>
                    {content}
                </DialogContainer>
            )}
        </DialogContext.Provider>
    )
}

export function useDialog() {
    const context = useContext(DialogContext)
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider')
    }
    return context
}
