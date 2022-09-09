import React, { useMemo } from 'react';
import OutfitList from './RelatedListsAndOutfits/OutfitList.jsx';
import RelatedList from './RelatedListsAndOutfits/RelatedList.jsx';
import ProductContext from './ProductContext.jsx';

const RelatedAndOutfits = ({ related, handleProductChange, product, interactions }) => {
  const currentProduct = useMemo(() => product, [product]);

  return (
    <div onClick={(e) => interactions(e,'RelatedAndOutfits')}>
      <ProductContext.Provider
        className="list-container"
        value={{ handleProductChange, currentProduct }}>
        <RelatedList
          related={related}
          currentProduct={product?.id ? product.id : null}
        />
        <OutfitList
          currentProduct={currentProduct}
        />
      </ProductContext.Provider>
    </div>
  );
};

export default RelatedAndOutfits;
