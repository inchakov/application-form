import React, { useCallback } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { UseFormReturn } from "react-hook-form";
import { Makers, Models } from "../data/cars";
import { MaxVehicles, PartialApplication } from "../shared/model/application";
import { MinVehicleYear, VinPattern } from "../shared/model/vehicle";

export default function ApplicationVehicles(
    props: UseFormReturn<PartialApplication>
) {
    const { register, setValue, getValues, formState: { errors }, watch } = props;

    const vehicles = watch('vehicles') ?? [];

    const date = new Date()
    const years: number[] = [];
    for (let year = date.getFullYear(); year >= MinVehicleYear; year--) {
        years.push(year);
    }

    const addVehicle = useCallback(() => {
        const vehicles = getValues('vehicles')!;
        setValue('vehicles', [...vehicles, {}]);
    }, [getValues, setValue])

    const removeVehicle = useCallback((index: number) => {
        const vehicles = getValues('vehicles')!;
        vehicles.splice(index, 1)
        setValue('vehicles', vehicles);
    }, [getValues, setValue])

    return (
        <React.Fragment>
            {vehicles.map((vehicle, index) => (
                <React.Fragment key={index}>
                    <Row className="application-section">
                        <Col>
                            <h2>Vehicle {index + 1}</h2>
                        </Col>
                        <Col md='auto'>
                            { index > 0 &&
                                <Button variant='outline-danger' onClick={() => removeVehicle(index)}>Remove</Button>
                            }
                        </Col>
                    </Row>
                    <Form.Group className='application-input-group' controlId='firstName'>
                        <Form.Label>VIN</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='4Y1SL65848Z411439'
                            maxLength={17}
                            {...register(`vehicles.${index}.vin`, {
                                required: 'VIN name is required',
                                pattern: {
                                    value: VinPattern,
                                    message: 'VIN must be 17 characters long'
                                }
                            })}
                            isInvalid={!!errors.vehicles?.[index]?.message}
                        />
                        <Form.Control.Feedback type='invalid'>{!!errors.vehicles?.[index]?.vin?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Select
                                isInvalid={!!errors.vehicles?.[index]?.year}
                                {...register(`vehicles.${index}.year`, { required: true })}
                            >
                                <option value=''>Year...</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                isInvalid={!!errors.vehicles?.[index]?.make}
                                {...register(`vehicles.${index}.make`, { required: true })}
                            >
                                <option value=''>Maker...</option>
                                {Makers.map((maker) => (<option key={maker} value={maker}>{maker}</option>))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                disabled={!vehicle.make}
                                isInvalid={!!errors.vehicles?.[index]?.model}
                                {...register(`vehicles.${index}.model`, { required: true })}
                            >
                                <option value=''>Model...</option>
                                {(Models[vehicle.make!] ?? []).map((model) => (<option key={model} value={model}>{model}</option>))}
                            </Form.Select>
                        </Col>
                    </Row>
                </React.Fragment>
            ))}

            <div className="add-vehicle-button">
                { vehicles.length < MaxVehicles &&
                    <Button variant='outline-secondary' onClick={addVehicle}>Add Vehicle</Button>
                }
            </div>

        </React.Fragment>
    )
}