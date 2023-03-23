import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { Application, MinDriverAge, PartialApplication } from '../../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import ApplicationDrivers from './ApplicationDrivers';
import { useCallback, useState } from 'react';
import { ApplicationPrice } from '../../shared/model/application-price';
import './ApplicationForm.css';
import getErrorMessage from '../../shared/getErrorMessage';
import { useToastContext } from '../ToastContextProvider';

export interface ApplicationFormProps {
    application: PartialApplication
    requestPrice?: (application: Application) => Promise<ApplicationPrice>
}

export default function ApplicationForm(props: ApplicationFormProps) {
    
    const { application, requestPrice } = props

    const form = useForm<PartialApplication>({
        values: application
    })
    const { handleSubmit } = form;

    const [isCalculating, setIsCalculating] = useState(false)
    const [applicationPrice, setApplicationPrice] = useState<ApplicationPrice | undefined>(undefined)

    const { showToast } = useToastContext()


    const onRequestPrice = useCallback(async (data: PartialApplication) => {
        if (requestPrice) {
            setIsCalculating(true)
            try {
                const price = await requestPrice(data as Application)
                setApplicationPrice(price)
            } catch (e) {
                showToast({ header: 'Error', text: getErrorMessage(e), bg: 'danger' })
            } finally {
                setIsCalculating(false)
            }
        }
    }, [requestPrice, showToast])

    return (
        <Form onSubmit={handleSubmit(onRequestPrice)}>
            
            <ApplicationPerson {...form} />
            <ApplicationAddress {...form} />
            <ApplicationDrivers {...form} />
            <ApplicationVehicles {...form} />

            {applicationPrice &&
                <div className='application-price text-success'>Congratulations: ${applicationPrice.price.toFixed(2)}</div>
            }
            
            <div className='d-grid'>
                <Button
                    disabled={isCalculating}
                    className='request-price-button'
                    as='input'
                    type='submit'
                    value={isCalculating ? 'Calculating...' : 'Request Price'}
                />
            </div>
        </Form>
    );
} 