import { forwardRef } from "react"

interface DialogProps extends React.PropsWithChildren {
    header?: React.ReactNode
    footer?: React.ReactNode
}

const Dialog = ({ header, footer, children }: DialogProps, ref: React.Ref<HTMLElement>) => {
    return <div className="flex flex-col size-full gap-2">
        {header && <header>{header}</header>}
        <main>{children}</main>
        {footer && <footer ref={ref}>{footer}</footer>}
    </div>
}


export default forwardRef(Dialog)