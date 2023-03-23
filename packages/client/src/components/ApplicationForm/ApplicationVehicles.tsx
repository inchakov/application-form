import React, { useCallback, useMemo } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Typeahead } from 'react-bootstrap-typeahead';
import { UseFormReturn, Controller } from "react-hook-form";
import { Makers, Models } from "../../data/cars";
import { MaxVehicles, PartialApplication } from "../../shared/model/application";
import { MinVehicleYear, VinPattern } from "../../shared/model/vehicle";

export default function ApplicationVehicles(
    props: UseFormReturn<PartialApplication>
) {
    const { register, setValue, getValues, formState: { errors }, watch, control } = props;

    const vehicles = watch('vehicles') ?? [];

    const years = useMemo(() => {
        const date = new Date()
        const years: number[] = [];
        for (let year = date.getFullYear(); year >= MinVehicleYear; year--) {
            years.push(year);
        }
        return years;
    }, []);

    const addVehicle = useCallback(() => {
        const vehicles = getValues('vehicles') ?? [];
        setValue('vehicles', [...vehicles, {}]);
    }, [getValues, setValue])

    const removeVehicle = useCallback((index: number) => {
        const vehicles = [...getValues('vehicles') ?? []];
        vehicles.splice(index, 1)
        setValue('vehicles', vehicles);
    }, [getValues, setValue])

    return (
        <React.Fragment>
            {vehicles.map((vehicle, index) => (
                <React.Fragment key={index}>
                    
                    <hr className="application-section" />

                    <Row>
                        <Col>
                            <h2>Vehicle {index + 1}</h2>
                        </Col>
                        <Col xs='auto'>
                            { index > 0 &&
                                <Button variant='outline-danger' onClick={() => removeVehicle(index)}>Remove</Button>
                            }
                        </Col>
                    </Row>
                    <Form.Group className='application-input-group' controlId={`vin${index}`}>
                        <Form.Label>VIN</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='4Y1SL65848Z411439'
                            maxLength={17}
                            {...register(`vehicles.${index}.vin`, {
                                required: 'VIN is required',
                                pattern: {
                                    value: VinPattern,
                                    message: 'VIN must be 17 characters long'
                                }
                            })}
                            isInvalid={!!errors.vehicles?.[index]?.vin?.message}
                        />
                        <Form.Control.Feedback type='invalid'>{!!errors.vehicles?.[index]?.vin?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId={`year${index}`}>
                                <Form.Label>Year</Form.Label>
                                <Form.Select
                                    isInvalid={!!errors.vehicles?.[index]?.year}
                                    {...register(`vehicles.${index}.year`, { required: true })}
                                >
                                    <option value=''>Year...</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`make${index}`}>
                                <Form.Label>Make</Form.Label>
                                <Controller
                                    control={control}
                                    name={`vehicles.${index}.make`}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Typeahead
                                            id={`make-input-${index}`}
                                            {...field}
                                            isInvalid={!!errors.vehicles?.[index]?.make}
                                            placeholder='Chevrolet'
                                            options={Makers}
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`model${index}`}>
                                <Form.Label>Model</Form.Label>
                                <Controller
                                    control={control}
                                    name={`vehicles.${index}.model`}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Typeahead
                                            id={`model-input-${index}`}
                                            {...field}
                                            isInvalid={!!errors.vehicles?.[index]?.model}
                                            placeholder='Camaro'
                                            options={(Models[vehicle.make!] ?? [])}
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </React.Fragment>
            ))}
            
            <div className="add-vehicle-button">
                <Button
                    disabled={vehicles.length >= MaxVehicles}
                    variant='outline-secondary'
                    onClick={addVehicle}
                >Add Vehicle</Button>
                <br/>
                <Form.Text>Max vehicles count: {MaxVehicles}</Form.Text>
            </div>

        </React.Fragment>
    )
}