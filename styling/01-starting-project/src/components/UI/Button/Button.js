import React from 'react'; 
import styles from './Button.module.css';  // import ukoliko se koristi css modules

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}> {/* pomocu styles.button se primenjuje button klasa iz css fajla */}
      {props.children}
    </button>
  );
};

export default Button;
