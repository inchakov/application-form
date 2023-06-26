import Form from "react-bootstrap/esm/Form";

export interface InputGroupProps {
    label: string
    controlId: string
    error?: string
    children: React.ReactNode
}

export function InputLayout(props: InputGroupProps) {
    return (
        <Form.Group
            className='application-input-group'
            controlId={props.controlId}
        >
            <Form.Label>
                {props.label}
            </Form.Label>
            {props.children}
            <Form.Control.Feedback type='invalid'>
                {props.error}
            </Form.Control.Feedback>
        </Form.Group>
    )
}