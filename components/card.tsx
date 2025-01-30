

interface CardProps {
    header?: React.ReactNode
    footer?: React.ReactNode
    data?: { title: string, content: React.ReactNode }[]
}

const Card = ({ header, footer, data = [] }: CardProps) => {
    return (
        <div className="flex flex-col border rounded-md shadow-md px-4 py-4 mx-2 gap-2">
            <header className="text-xl font-bold">{header}</header>
            <main className="flex flex-col gap-2 w-full">
                {data.map(({title, content}, index) => {
                    return <dl key={index}>
                        <dt className="text-md">{title}</dt>
                        <dd className="text-lg font-bold">{content}</dd>
                    </dl>
                })}
            </main>
            <footer>{footer}</footer>
        </div>
    )
}

export default Card