import classes from '../../assets/MealItemForm.module.css';
import { useRef,useState } from 'react';
import Input from '../../UI/input';
const MealItemForm = (props) =>{
    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const handleSubmit = event =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }
        props.OnAddToCart(enteredAmountNumber);
    }
    return(
        <form className={classes.form} onSubmit = {handleSubmit}>
            <Input
            ref={amountInputRef}
             label='Quantity'
             input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button className={classes['form button']}>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
        </form>
    )
}
export default MealItemForm;