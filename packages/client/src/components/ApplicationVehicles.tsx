import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { UseFormReturn } from "react-hook-form";
import { Makers, Models } from "../data/cars";
import { PartialApplication } from "../shared/model/application";
import { MinVehicleYear } from "../shared/model/vehicle";

export default function ApplicationVehicles(
    props: UseFormReturn<PartialApplication>
) {
    const { register, formState: { errors }, watch } = props;

    const vehicles = watch('vehicles') ?? [];

    const date = new Date()
    const years: number[] = [];
    for (let year = date.getFullYear(); year >= MinVehicleYear; year--) {
        years.push(year);
    }

    return (
        <React.Fragment>
            {vehicles.map((vehicle, index) => (
                <React.Fragment key={index}>
                    <h2>Vehicle {index + 1}</h2>
                    <Form.Group className='application-input-group' controlId='firstName'>
                        <Form.Label>VIN</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='4Y1SL65848Z411439'
                            {...register(`vehicles.${index}.vin`, { required: 'VIN name is required' })}
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
                                isInvalid={!!errors.vehicles?.[0]?.year}
                                {...register('vehicles.0.year', { required: true })}
                            >
                                <option value=''>Maker...</option>
                                {Makers.map((maker) => (<option key={maker} value={maker}>{maker}</option>))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                disabled={!vehicle.make}
                                isInvalid={!!errors.vehicles?.[0]?.year}
                                {...register('vehicles.0.year', { required: true })}
                            >
                                <option value=''>Model...</option>
                                {(Models[vehicle.make] ?? []).map((model) => (<option key={model} value={model}>{model}</option>))}
                            </Form.Select>
                        </Col>
                    </Row>
                </React.Fragment>
            ))}

            <Button variant='secondary' onClick={() => { console.log('clicked'); }}>Add Vehicle</Button>

        </React.Fragment>
    )
}