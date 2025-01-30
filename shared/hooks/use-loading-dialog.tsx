import Dialog from "@/components/dialog";
import { useDialog } from "../lib/context/dialog-context";

export const useLoadingDialog = () => {
    const { openDialog, closeDialog: stopLoading } = useDialog()

    const startLoading = (message: string = '로딩 중...') => {
        openDialog(<Dialog>{message}</Dialog>)
    }

    return { startLoading, stopLoading }
}