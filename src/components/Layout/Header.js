import React, { Fragment } from 'react';
import mealimg from '../assets/meals.jpg';
import classes from '../assets/Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div>
            <img className={classes['main-img']} src={mealimg} alt="Enjoy your delicious food!" width="100%"/>
        </div>
    </Fragment>
}
export default Header;