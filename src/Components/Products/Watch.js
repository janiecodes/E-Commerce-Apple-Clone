import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../../redux/cartReducer";

function Watch(props){
      
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
        <h3>Apple Watch.</h3>
        <div className='watch-content'>
        <div className="watch-photo">
          {select ? (
            <img src={`/assets/applewatch-${productId}.jpeg`} />
          ) : (
            <img src={`/assets/watch-photo.jpeg`} />
          )}
        </div>

        <div className="watch-info">
          <h1>Buy an Apple Watch</h1>
          <h3>Finish</h3>
          <form onClick={selector} className="watch-color">
            <label>
              <input
                className="watch-northern-blue"
                name="productId"
                value={"23"}
                checked={productId === "23"}
                {...setId}
              />
              Northern Blue
            </label>
            <label>
              <input
                className="watch-kumquat"
                name="productId"
                value={"24"}
                checked={productId === "24"}
                {...setId}
              />
              Kumquat
            </label>
            <label>
              <input
                className="watch-cypress-green"
                name="productId"
                value={"25"}
                checked={productId === "25"}
                {...setId}
              />
              Cypress Green
            </label>

          </form>
          <div className='add-to-bag-button'>
          <button className='watch-button' onClick={(e) => addItem(e)}>Add to Bag</button>
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
  export default connect(mapStateToProps, { getCart })(Watch);