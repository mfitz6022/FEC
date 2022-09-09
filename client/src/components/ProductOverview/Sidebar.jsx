import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import StyleIcons from './StyleIcons.jsx';
import ShareIcons from './ShareIcons.jsx';

import '../../../dist/productOverview.css';

const axios = require('axios');

const { API_URL } = process.env;
const header = { Authorization: process.env.API_KEY };

const Sidebar = ({
  productName, productCategory, allStyles, style, updateStyleImage, styleIndex
}) => {
  const [selectedStyle, setSelectedStyle] = useState({});
  const [sizeOptions, setSizeOptions] = useState({});
  const [quantityOptions, setQuantityOptions] = useState({});
  const [selectedSizeOption, setSelectedSizeOption] = useState(null);
  const [selectedQuantityOption, setSelectedQuantityOption] = useState(null);

  const getSizesOptions = (id) => {
    if (allStyles === []) {
      return {};
    }

    let skus = allStyles[0]?.skus;
    for (let i = 0; i < allStyles.length; i++) {
      const curr = allStyles[i];
      if (curr.style_id === id) {
        skus = curr.skus;
        break;
      }
    }

    const inStockSizes = Object.entries(skus ?? {}).reduce((result, entry) => {
      if (entry[1].quantity > 0) {
        result.push(entry);
      }
      return result;
    }, []);

    if (inStockSizes.length > 0) {
      return inStockSizes.map((entry) => {
        const currSku = entry[0];
        const skuInfo = entry[1];

        return { value: currSku, label: skuInfo.size, quantity: skuInfo.quantity };
      });
    }

    return [];
  };

  const getQuantityOptions = (quantity) => {
    const result = [];

    let count = 1;
    while (count <= quantity && count <= 15) {
      result.push({ value: count, label: count });
      count += 1;
    }

    return result;
  };

  useEffect(() => {
    setSizeOptions(getSizesOptions(selectedStyle?.style_id));
    setSelectedSizeOption(null);
    setSelectedQuantityOption(null);
  }, [selectedStyle]);

  const customTheme = (theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
      ...theme.colors,
      primary50: 'grey',
      primary25: 'grey',
      primary: 'grey',
    },
  });

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      marginTop: 2,
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: 12,
    }),
    control: (provided) => ({
      ...provided,
      fontFamily: 'Arial, Helvetica, sans-serif',
    }),
  };

  const sizeChangeHandler = (event) => {
    setSelectedQuantityOption({ value: 1, label: 1 });
    setSelectedSizeOption(event);
    setQuantityOptions(getQuantityOptions(event.quantity));
  };

  const styleChangeHandler = (event) => {
    for (let i = 0; i < allStyles.length; i += 1) {
      if (allStyles[i].style_id === event.style_id) {
        setSelectedStyle(allStyles[i]);
        updateStyleImage(i);
        break;
      }
    }
  };

  const addToCart = () => {
    for (let i = 0; i < selectedQuantityOption.value; i += 1) {
      axios.post((`${API_URL}/cart`), { sku_id: selectedSizeOption.value }, { headers: header });
    }
  };

  return (
    <div>
      <div id="sidebarProductCategory">
        {productCategory}
      </div>
      <h2 id="sidebarProductName">
        {productName}
      </h2>
      <div>
        ★★★★★
        <a href="#reviews">(42069)</a>
      </div>
      <br />
      <div id="sidebarStyleName">
        {selectedStyle?.name}
      </div>
      <br />
      <div id="styleSelector">
        <StyleIcons
          allStyles={allStyles}
          style={style}
          setSelectedStyle={styleChangeHandler}
          index={styleIndex}
        />
      </div>
      <br />
      <div id="sidebarPrice">
        {
          (parseInt(selectedStyle?.sale_price, 10) > 0
            && parseInt(selectedStyle?.original_price, 10) > parseInt(selectedStyle?.sale_price, 10))
            ? (
              <div>
                <div style={{ color: 'red', float: 'left' }}>
                  $
                  {selectedStyle?.sale_price}
                  &nbsp;&nbsp;&nbsp;
                </div>

                <del>
                  $
                  {selectedStyle?.original_price}
                </del>
              </div>
            ) : (
              <div>
                $
                {selectedStyle?.original_price}
              </div>
            )
        }
      </div>
      <br />
      { Object.keys(sizeOptions).length > 0 ? (
        <div>
          <Select
            id="sizeSelect"
            placeholder="Select Size"
            autoFocus={false}
            value={selectedSizeOption}
            onChange={sizeChangeHandler}
            options={sizeOptions}
            theme={customTheme}
            styles={customStyles}
            isSearchable={false}
          />
          <div>
            <br />
          </div>
          <Select
            id="quantitySelect"
            autoFocus={false}
            placeholder="-"
            value={selectedQuantityOption}
            onChange={setSelectedQuantityOption}
            options={quantityOptions}
            theme={customTheme}
            styles={customStyles}
            isDisabled={selectedSizeOption === null}
            isSearchable={false}
          />
        </div>
      ) : (
        <div>
          <Select
            autoFocus={false}
            id="sizeSelect"
            className="basic-single"
            defaultValue={{ value: null, label: 'OUT OF STOCK' }}
            theme={customTheme}
            styles={customStyles}
            isDisabled
          />
          <div>
            <br />
          </div>
          <Select
            autoFocus={false}
            placeholder="-"
            id="quantitySelect"
            theme={customTheme}
            styles={customStyles}
            isDisabled
          />
        </div>
      )}
      <br />
      <div id="addToCartButtonContainer">
        <button id="addToCartButton" type="button" onClick={addToCart} hidden={selectedSizeOption === null}>
          <strong>Add to Cart</strong>
        </button>
      </div>
      <br />
      <ShareIcons
        url={window.location.href}
        productName={productName}
        productCategory={productCategory}
        style={selectedStyle}
      />
    </div>
  );
};

export default Sidebar;
