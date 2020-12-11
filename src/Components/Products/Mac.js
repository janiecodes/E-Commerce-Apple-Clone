import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../../redux/cartReducer";

function Mac(props) {

    const [productId, setId] = useRadioButtons("productId");

    const [select, setSelect] = useState(false);

    function selector() {
        setSelect(true);
      }

    const addItem = (e) => {
        e.preventDefault();
        axios
          .post(`/api/cart/product/${productId}`)
          .then((res) => {
            // props.getCart();
            props.history.push(`/cart/me`);
          })
          .catch((err) => console.log(err));
      };


    return (
      
        <div className='mac-component'>
          <header className='macbook-air-header'><h3>Macbook Air</h3></header>
          <div className='macbook-content'>
            <h1 className='mac-title'>Welcome to the future of Mac</h1>
            <div className="macbook-photo">
          {select ? (
            <img className="macbook-photo-selected" src={`/assets/macbook-${productId}.jpeg`} />
          ) : (
            <img  className="macbook-photo-default" src={`/assets/macbook-final.jpeg`} />
          )}
            </div>

            <form onClick={selector} className='macbook-color'>
                <div className='first-mac'>
                <label>
              <input
                className="macbook-gold"
                name="productId"
                value={"13"}
                checked={productId === "13"}
                {...setId}
              />
              Gold
            </label>
            </div>
                <div className='second-mac'>
                <label>
              <input
                className="macbook-silver"
                name="productId"
                value={"14"}
                checked={productId === "14"}
                {...setId}
              />
              Silver
            </label>
                </div>
            </form>
            <button className='macbook-button' onClick={(e) => addItem(e)}>Add to Bag</button>
            </div>
        </div>
    )
}

function useRadioButtons(name) {
    const [value, setState] = useState(null);
  
    const handleChange = (e) => {
      setState(e.target.value);
    };
  
    const colorChoice = {
      name,
      type: "radio",
      onChange: handleChange,
    };
    return [value, colorChoice];
  }

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Mac);