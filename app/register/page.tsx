"use client"
import MyReact from "@/shared/lib/my-react";


interface State {
    value: { nickname: string, password: string },
    error: { nickname: string, password: string }
}


interface Action {
    type: string,
    name: string,
    value: string
}

const initialValue: State = {
    value: { nickname: "", password: "" },
    error: { nickname: "", password: "" }
}

function reducer(state: State, action: Action) {
    if (action.type === "SET_FIELD") {
        return {
            ...state,
            value: {
                [action.name]: action.value
            }
        }
    }

    if (action.type === "RESET") {
        return { ...initialValue }
    }

    if (action.type === "VALIDATE") {
        return {
            ...state,
            error: {
                nickname: /^\w+$/.test(state.value.nickname) ? '' : "영문, 숫자만 입력하세요",
                password: /^.{3,6}$/.test(state.value.password) ? '' : "3자이상 6자 이하로 입력하세요."
            }
        }
    }

    throw new Error('알수 없는 액션')
}


const RegisterPage = () => {
    const [state, dispatch] = MyReact.useReducer<State, Action>(reducer, initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_FIELD",
            name: e.target.name,
            value: e.target.value
        })
    }

    const handleReset = () => {
        dispatch({ type: "RESET" })
    }

    const handleSubmit = () => {
        dispatch({ type: "VALIDATE" })
    }

    return <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full items-center gap-2">
            <label htmlFor="nickname">닉네임:</label>
            <input
                className="border border-slate-400 p-2 rounded-md"
                type="text"
                name="nickname"
                value={state.value.nickname}
                onChange={handleChange} />
            {state.error.nickname && <span className="text-red-500">{state.error.nickname}</span>}
        </div>
        <div className="flex w-full items-center gap-2">
            <label htmlFor="password">비밀번호:</label>
            <input
                className="border border-slate-400 p-2 rounded-md"
                type="password"
                name="password"
                value={state.value.password}
                onChange={handleChange} />
            {state.error.password && <span className="text-red-500">{state.error.password}</span>}
        </div>
        <button
            className="border border-slate-400 p-2 rounded-md w-24"
            onClick={handleReset}
        >
            초기화
        </button>
        <button
            className="border border-slate-400 p-2 rounded-md w-24"
            onClick={handleSubmit}
        >
            회원가입
        </button>
    </div>
}

export default RegisterPage



