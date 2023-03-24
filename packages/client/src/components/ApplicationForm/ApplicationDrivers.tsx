import React, { useCallback } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { UseFormReturn } from "react-hook-form";
import { getMinDateOfBirth, MaxPeople, MinDriverAge, PartialApplication } from "../../shared/model/application";

export default function ApplicationDrivers(
    props: UseFormReturn<PartialApplication>
) {
    const { register, setValue, getValues, formState: { errors }, watch } = props;
    const maxDateOfBirth = getMinDateOfBirth();

    const drivers = watch('additionalPeople') ?? [];

    const addDriver = useCallback(() => {
        const drivers = getValues('additionalPeople') ?? [];
        setValue('additionalPeople', [...drivers, {}]);
    }, [getValues, setValue])

    const removeDriver = useCallback((index: number) => {
        const drivers = [...getValues('additionalPeople') ?? []];
        drivers.splice(index, 1)
        setValue('additionalPeople', drivers);
    }, [getValues, setValue])

    return (
        <React.Fragment>
            {drivers.map((_, index) => (
                <React.Fragment key={index}>

                    <hr className="application-section" />

                    <Row>
                        <Col>
                            <h2>Additional Driver {index + 1}</h2>
                        </Col>
                        <Col xs='auto'>
                            <Button variant='outline-danger' onClick={() => removeDriver(index)}>Remove</Button>
                        </Col>
                    </Row>

                    <Form.Group className='application-input-group' controlId={`driver${index}firstName`}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='John'
                            {...register(`additionalPeople.${index}.firstName`, { required: true })}
                            isInvalid={!!errors.additionalPeople?.[index]?.firstName}
                        />
                    </Form.Group>

                    <Form.Group className='application-input-group' controlId={`driver${index}lastName`}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Doe'
                            {...register(`additionalPeople.${index}.lastName`, { required: true })}
                            isInvalid={!!errors.additionalPeople?.[index]?.lastName}
                        />
                    </Form.Group>

                    <Form.Group className='application-input-group' controlId={`driver${index}dateOfBirth`}>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type='Date'
                            max={maxDateOfBirth.toISOString().split('T')[0]}
                            isInvalid={!!errors.additionalPeople?.[index]?.dateOfBirth}
                            {...register(`additionalPeople.${index}.dateOfBirth`, {
                                required: true,
                                max: {
                                    value: maxDateOfBirth.toISOString().split('T')[0],
                                    message: `Must be at least ${MinDriverAge} years old to apply`
                                }
                            })}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.additionalPeople?.[index]?.dateOfBirth?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='application-input-group' controlId={`driver${index}relationship`}>
                        <Form.Label>Relationship</Form.Label>
                        <Form.Select
                            isInvalid={!!errors.additionalPeople?.[index]?.relationship?.message}
                            {...register(`additionalPeople.${index}.relationship`, { required: true })}
                        >
                            <option value=''>Select...</option>
                            <option value='spouse'>Spouse</option>
                            <option value='sibling'>Sibling</option>
                            <option value='parent'>Parent</option>
                            <option value='friend'>Friend</option>
                            <option value='other'>Other</option>
                        </Form.Select>
                    </Form.Group>

                </React.Fragment>
            ))}

            <div className="add-vehicle-button">
                <Button
                    disabled={drivers.length >= MaxPeople}
                    variant='outline-secondary'
                    onClick={addDriver}
                >Add Driver</Button>
                <br />
                <Form.Text>Max additional drivers: {MaxPeople}</Form.Text>
            </div>

        </React.Fragment>
    )
}