import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../../redux/cartReducer";

function Ipad(props) {
  
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
    <div className="ipad-component">
      <div className='ipad-air-header'>
        <h3>iPad Air</h3>
        <div className='ipad-content'>
        <div className="ipad-air-photo">
          {select ? (
            <img src={`/assets/ipadair-${productId}.png`} />
          ) : (
            <img width='443' height='535' src={`/assets/ipad-air-img.jpeg`} />
          )}
        </div>

        <div className="ipad-air-info">
          <h1>Buy iPad Air</h1>
          <h3>Finish</h3>
          <form onClick={selector} className="ipad-air-color">
            <label>
              <input
                className="ipad-space-gray"
                name="productId"
                value={"1"}
                checked={productId === "1"}
                {...setId}
              />
              Space Gray
            </label>
            <label>
              <input
                className="ipad-sky-blue"
                name="productId"
                value={"5"}
                checked={productId === "5"}
                {...setId}
              />
              Sky Blue
            </label>
            <label>
              <input
                className="ipad-rose-gold"
                name="productId"
                value={"3"}
                checked={productId === "3"}
                {...setId}
              />
              Rose Gold
            </label>
            <label>
              <input
                className="ipad-green"
                name="productId"
                value={"7"}
                checked={productId === "7"}
                {...setId}
              />
              Green
            </label>
          </form>
          <div className='add-to-bag-button'>
          <button className='ipad-button' onClick={(e) => addItem(e)}>Add to Bag</button>
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
export default connect(mapStateToProps, { getCart })(Ipad);

// <img
// alt="iPad Air"
// src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009?wid=886&amp;hei=1070&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1599066777000"
// />

{
  /* <div>
<div value={setSelect} className='ipad-air-img'><img alt="iPad Air" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009?wid=886&amp;hei=1070&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1599066777000"/>
{ {selector}
  ?
  <img src={`/assets/ipadair-${productId}.png`}/>
  : null }
</div> */
}

{
  /* <div>
        { {selector}
          ?
          <div className='ipad-air-img'><img alt="iPad Air" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009?wid=886&amp;hei=1070&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1599066777000"/></div>
          : <img src={`/assets/ipadair-${productId}.png`}/> }
      </div> */
}

// <div>
//     { {selector}
//     ? <img src={`/assets/ipadair-${productId}.png`}/>
//     : <img src={`/assets/ipad-air-img.jpeg`}/>
//     }
// </div>
