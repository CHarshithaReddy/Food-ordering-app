import { useRef, useState } from 'react';
import classes from '../assets/Checkout.module.css';
const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = props => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })
    const nameInputRef = useRef();
    const postalInputRef = useRef();
    const StreetInputRef = useRef();
    const CityInputRef = useRef();
    const handleConfirm = (event) =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = StreetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = CityInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = !isNotFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);
        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
            city: enteredCityIsValid
        })
        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid ;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostalCode,
            city: enteredCity
        })
    }
    return(
        <form className={classes.form} onSubmit={handleConfirm}>
            <div className={`${classes.control} ${
                formInputValidity.name ? '':classes.invalid
            }`}>
                <label htmlFor='Name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={`${classes.control} ${
                formInputValidity.street ? '':classes.invalid
            }`}>
                <label htmlFor='Street'>Street</label>
                <input type='text' id='street' ref={StreetInputRef}/>
                {!formInputValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={`${classes.control} ${
                formInputValidity.postalCode ? '':classes.invalid
            }`}>
                <label htmlFor='Postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formInputValidity.postalCode && <p>Please enter a postal code with 5 characters.</p>}
            </div>
            <div className={`${classes.control} ${
                formInputValidity.city ? '':classes.invalid
            }`}>
                <label htmlFor='City'>City</label>
                <input type='text' id='city' ref={CityInputRef}/>
                {!formInputValidity.city && <p>Please enter a city.</p>}
            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
            </div>
            
        </form>
    );
};
export default Checkout;