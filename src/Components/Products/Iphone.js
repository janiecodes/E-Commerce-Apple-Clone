import axios from 'axios'
import { useState } from "react";
import { connect } from "react-redux";
import { getCart } from "../../redux/cartReducer";

function Iphone(props){

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
        <div className="iphone-component">
          <div className='iphone-header'>
            <h3>Blast past fast.</h3>
            <div className='iphone-content'>
            <div className="iphone-photo">
              {select ? (
                <img src={`/assets/iphone-${productId}.png`} />
              ) : (
                <img src={`/assets/iphone-photo.jpeg`} />
              )}
            </div>
    
            <div className="iphone-info">
              <h1>Buy iPhone Pro</h1>
              <h3>Finish</h3>
              <form onClick={selector} className="iphone-color">
                <label>
                  <input
                    className="iphone-space-gray"
                    name="productId"
                    value={"19"}
                    checked={productId === "19"}
                    {...setId}
                  />
                  Space Gray
                </label>
                <label>
                  <input
                    className="iphone-silver"
                    name="productId"
                    value={"20"}
                    checked={productId === "20"}
                    {...setId}
                  />
                  Silver
                </label>
                <label>
                  <input
                    className="iphone-gold"
                    name="productId"
                    value={"21"}
                    checked={productId === "21"}
                    {...setId}
                  />
                  Gold
                </label>
                <label>
                  <input
                    className="iphone-pacific-blue"
                    name="productId"
                    value={"22"}
                    checked={productId === "22"}
                    {...setId}
                  />
                  Pacific Blue
                </label>
              </form>
              <div className='add-to-bag-button'>
              <button className='iphone-button' onClick={(e) => addItem(e)}>Add to Bag</button>
              </div>
            </div>
            
            </div>
          </div>
        </div>
      );
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
  export default connect(mapStateToProps, { getCart })(Iphone);