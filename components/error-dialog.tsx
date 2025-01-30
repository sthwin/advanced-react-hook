import { useEffect, useRef } from "react"
import { BiError } from "react-icons/bi"
import Dialog from "./dialog"

interface ErrorDialogProps {
    closeDialog: () => void
    message?: string
}

const ErrorDialog = ({ closeDialog, message = '잠시 후 다시 시도해 주세요.' }: ErrorDialogProps) => {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref && ref.current) {
            const buttons = Array.from(ref.current.querySelectorAll("button"))

            if (buttons.length === 0) return

            const targetButton = buttons[buttons.length - 1]
            targetButton.focus()
        }
    }, [])
    return (<Dialog
        ref={ref}
        header={<div className="flex items-center gap-2 text-xl font-bold"><BiError size={24} color="red" /> 오류</div>}
        footer={<div className="flex w-full text-sm">
            <button
                className="border border-slate-400 text-black w-full rounded-md py-1 focus:bg-brand focus:text-white focus:border-none focus:outline-none"
                onClick={closeDialog}
            >
                네, 알겠습니다.
            </button>
        </div>}
    >
        <div className="min-h-16">{message}</div>
    </Dialog>)
}


export default ErrorDialog