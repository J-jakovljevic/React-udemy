import Classes from '../Cart/Checkout.module.css';

const Checkout = (props) => {
    const confirmHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={confirmHandler}>
            <div className={Classes.control}>
                <label htmlFor='name'>Your name</label>
                <input type='text' id='name'></input>
            </div>
            <div className={Classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street'></input>
            </div>
            <div className={Classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city'></input>
            </div>
            <div className={Classes.control}>
                <label htmlFor='code'>Postal code</label>
                <input type='text' id='code'></input>
            </div>
            <button type="button" onClick={props.onCancel}>Cancel</button>  {/* go into cart.js, return statement */}
            <button>Confirm</button>
        </form>
    )
}

export default Checkout;