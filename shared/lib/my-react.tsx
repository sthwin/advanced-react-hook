"use client"
import React from "react"
import { createEventEmitter, EventEmitter } from "./event-emitter"

const MyReact = (function MyReact() {
    const memorizedStates: unknown[] = []
    const isInitialized: boolean[] = []
    let cursor = 0
    let forceUpdate: () => void
    const deps: unknown[][] = []
    const cleanups: (() => void)[] = []

    function useState(initialValue: unknown): [unknown, (value: unknown) => void] {
        const { forceUpdate } = useForceUpdate()
        if (!isInitialized[cursor]) {
            memorizedStates[cursor] = initialValue
            isInitialized[cursor] = true
        }

        const state = memorizedStates[cursor]

        const setStateAt = (_cursor: number) => (nextValue: unknown) => {
            if (memorizedStates[_cursor] === nextValue) return
            memorizedStates[_cursor] = nextValue
            forceUpdate()
        }

        const setState = setStateAt(cursor)

        cursor = cursor + 1

        return [state, setState]
    }

    function useForceUpdate() {
        const [, setValue] = React.useState(0)
        forceUpdate = () => {
            setValue(prev => prev + 1)
            cursor = 0
        }
        return { forceUpdate }
    }

    function useEffect(effect: () => void | (() => void), nextDeps: unknown[]) {
        function runDeferredEffect() {
            function runEffect() {
                const cleanup = effect()
                if (cleanup) {
                    cleanups[cursor] = cleanup
                }
            }
            const ENOUGH_TIME_TO_RENDER = 1
            setTimeout(runEffect, ENOUGH_TIME_TO_RENDER)
        }

        if (!isInitialized[cursor]) {
            isInitialized[cursor] = true
            deps[cursor] = nextDeps
            cursor = cursor + 1
            runDeferredEffect()
            return
        }

        const prevDeps = deps[cursor]
        const depsSame = prevDeps?.every((preDep, index) => preDep === nextDeps[index])
        if (depsSame) {
            cursor = cursor + 1
            return
        }

        deps[cursor] = nextDeps
        cursor = cursor + 1
        runDeferredEffect()
    }

    function resetCursor() {
        cursor = 0
    }

    function cleanupEffects() {
        cleanups.forEach((cleanup) => typeof cleanup === "function" && cleanup())
    }

    function createContext(initialValue: unknown) {
        const emitter = createEventEmitter(initialValue)

        function Provider({ value, children }: React.PropsWithChildren<{ value: unknown }>): React.JSX.Element {
            React.useEffect(() => {
                console.log("Provider useEffect emitter set", value)
                emitter.set(value)
            }, [value])

            return <>{children}</>
        }

        return {
            Provider,
            emitter
        }
    }

    function useContext(context: { emitter: EventEmitter }) {
        const [value, setValue] = React.useState(context.emitter.get())

        React.useEffect(() => {
            console.log("useContext useEffect", context)
            context.emitter.on(setValue)
            return () => context.emitter.off(setValue)
        }, [context])
        console.log("useContext", value)
        return value
    }

    function useRef(initialValue: unknown): unknown {
        if (!isInitialized[cursor]) {
            memorizedStates[cursor] = { current: initialValue }
            isInitialized[cursor] = true
        }
        const value = memorizedStates[cursor]
        cursor = cursor + 1
        return value
    }

    // reducer에는 상태를 바꾸는 방법이 정의됨.
    function createStore<T, A>(reducer: (state: T, action: A) => T, initialValue: T) {
        let currentState = initialValue
        const listeners: (() => void)[] = []
        const getState = () => currentState
        const subscribe = (listener: () => void) => listeners.push(listener)

        const dispatch = (action: A) => {
            const nextState = reducer(currentState, action)
            if (nextState !== currentState) {
                currentState = nextState
                listeners.forEach(listener => listener())
            }
        }

        return {
            getState,
            subscribe,
            dispatch
        }
    }

    function useReducer<T, A>(reducer: (state: T, action: A) => T, initialValue: T) {
        const { forceUpdate } = useForceUpdate()
        if (!isInitialized[cursor]) {
            memorizedStates[cursor] = createStore(reducer, initialValue)
            isInitialized[cursor] = true
        }
        const store = memorizedStates[cursor]
        store.subscribe(forceUpdate)
        cursor = cursor + 1
        return [
            store.getState(),
            store.dispatch
        ]
    }


    function useMemo(nextCreate: () => unknown, deps: unknown[]) {
        if (!isInitialized[cursor]) {
            const nextValue = nextCreate()
            memorizedStates[cursor] = [nextValue, deps]
            cursor = cursor + 1
            return nextValue
        }

        const [preValue, prevDeps] = memorizedStates[cursor]
        if (prevDeps.every((dep, index) => dep === deps[index])) {
            cursor = cursor + 1
            return preValue
        }

        const nextValue = nextCreate()
        memorizedStates[cursor] = [nextValue, deps]
        cursor = cursor + 1
        return nextValue
    }

    function useCallback(nextCreate: () => unknown, deps: unknown[]) {
        return useMemo(() =>nextCreate, deps)
    }

    function memo(targetComponent: unknown) {
        return (nextProps: unknown) => {
            if (targetComponent.memorizedState) {
                const nextValue = React.createElement(targetComponent, nextProps)
                targetComponent.memorizedState = [nextValue, nextProps]
                return nextValue
            }

            const [preValue, prevProps] = targetComponent.memorizedState
            const sameProps = Object.keys(nextProps).every(key =>
                nextProps[key] === prevProps[key])
            if (sameProps) {
                return preValue
            }

            const nextValue = React.createElement(targetComponent, nextProps)
            targetComponent.memorizedState = [nextValue, nextProps]
            return nextValue
        }
    }

    return {
        useState,
        useEffect,
        resetCursor,
        cleanupEffects,
        createContext,
        useContext,
        useRef,
        useForceUpdate,
        createStore,
        useReducer,
        useMemo,
        useCallback,
        memo
    }
}())

export default MyReact

