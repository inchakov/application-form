import { createContext, useContext, useMemo, useState } from "react"
import Toast from "react-bootstrap/esm/Toast"
import ToastContainer from "react-bootstrap/esm/ToastContainer"
import { Variant } from "react-bootstrap/esm/types"
import "./ToastContextProvider.css"

export interface ToastContextProps {
    showToast: (options: ToastOptions) => void
}

export interface ToastOptions {
    text: string
    header?: string
    bg?: Variant
}

export interface ToastContextProviderProps {
    children?: React.ReactNode
}

export function useToastContext() {
    return useContext(ToastContext)
}

export default function ToastContextProvider(props: ToastContextProviderProps) {

    const [options, setOptions] = useState<ToastOptions | null>(null)

    const contextValue: ToastContextProps = useMemo(() => ({
        showToast: (options: ToastOptions) => {
            setOptions(options)
        }
    }), [])

    return (
        <ToastContext.Provider value={contextValue}>
            <ToastContainer position="top-center">
                <Toast
                    bg={options?.bg}
                    show={options !== null}
                    className='toast'
                    onClose={() => setOptions(null)}
                >
                    <Toast.Header>
                        <strong className="me-auto">{options?.header ?? 'Info'}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {options?.text}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {props.children}

        </ToastContext.Provider>
    )
}

const ToastContext = createContext<ToastContextProps>({
    showToast: () => { }
})
