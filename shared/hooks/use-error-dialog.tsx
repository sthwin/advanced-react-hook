import ErrorDialog from "@/components/error-dialog"
import { useDialog } from "../lib/context/dialog-context"

const useErrorDialog = () => {
    const { openDialog, closeDialog } = useDialog()

    const showErrorDialog = (message?: string, handleActionAfterClose?: () => void) => {
        return new Promise<void>((resolve) => {
            const handleClose = () => {
                console.log('closeDialog')
                handleActionAfterClose?.()
                closeDialog()
                resolve()
            }
            openDialog(<ErrorDialog closeDialog={handleClose} message={message} />)
        })
    }

    const closeErrorDialog = () => {
        closeDialog()
    }
    
    return { showErrorDialog, closeErrorDialog }
}

export default useErrorDialog