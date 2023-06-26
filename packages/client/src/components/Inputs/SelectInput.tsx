import { FieldPath, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { InputLayout } from "./InputLayout";
import Form from "react-bootstrap/esm/Form";

export interface SelectInputProps<T extends FieldValues, Path = FieldPath<T>> {
    form: UseFormReturn<T>
    path: Path
    options?: RegisterOptions<T>
    label: string
    requiredMessage?: string
    children: React.ReactNode
}

export function SelectInput<T extends FieldValues>(props: SelectInputProps<T>) {

    const { path, form: { register, getFieldState } } = props;
    const fieldState = getFieldState(path);

    return (
        <InputLayout
            label={props.label}
            controlId={props.path.toString()}
            error={fieldState.invalid ? fieldState.error?.message : undefined}
        >
            <Form.Select
                isInvalid={!!fieldState.invalid}
                {...register(props.path, props.options)}
            >
                {props.children}
            </Form.Select>
        </InputLayout>
    )
}