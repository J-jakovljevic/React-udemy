import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart} />  {/* onClick je proizvoljan naziv */}
        </header>
        <div className={classes['main-image']}>   {/* ne sme classes.main-image zbog crtice */}
            <img src={mealsImage} alt="A table full of delicious food"/>
        </div>
    </React.Fragment>
}

export default Header;