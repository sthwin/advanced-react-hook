const BackDrop = ({children}: React.PropsWithChildren) => {
    return <div className="flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 bg-black/70 z-40">
        {children}
    </div>
}

export default BackDrop