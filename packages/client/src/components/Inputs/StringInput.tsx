import { FieldPath, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { InputLayout } from "./InputLayout";
import Form from "react-bootstrap/esm/Form";

export interface StringInputProps<T extends FieldValues, Path = FieldPath<T>> {
    form: UseFormReturn<T>
    path: Path
    options?: RegisterOptions<T>
    type?: string
    label: string
    placeholder?: string
}

export function StringInput<T extends FieldValues>(props: StringInputProps<T>) {
    
    const { path, options, placeholder, form: { register, getFieldState } } = props;
    const fieldState = getFieldState(path);

    return (
        <InputLayout
            label={props.label}
            controlId={props.path.toString()}
            error={fieldState.invalid ? fieldState.error?.message : undefined}
        >
            <Form.Control
                type={props.type ?? 'text'}
                placeholder={placeholder}
                isInvalid={!!fieldState.invalid}
                {...register(path, options)}
            />
        </InputLayout>
    )
}