import MyReact from "@/shared/lib/my-react"
import { useState } from "react"

const Counter = () => {
    MyReact.resetCursor()
    const [count, setCount] = useState(0)
    const [name, setName] = useState("")

    MyReact.useEffect(() => {
        document.title = `count: ${count} | name: ${name}`
        console.log("effect1")

        return function cleanup() {
            document.title = ""
            console.log("cleanup")
        }
    }, [count, name])

    MyReact.useEffect(() => {
        localStorage.setItem("name", name)
        console.log("effect2")
    }, [name])

    MyReact.useEffect(() => {
        setName(localStorage.getItem("name") || "")
        console.log("effect3")
    }, [])

    const handleClick = () => setCount(count + 1)
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    console.log("rendered")
    return <>
        <button onClick={handleClick}>더하기</button>
        <input id="test" name="test" className="border-slate-400 border" value={name} onChange={handleChangeName} />
    </>
}

export default Counter