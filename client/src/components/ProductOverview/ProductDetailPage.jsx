import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import Gallery from './Gallery.jsx';
import ProductFeatures from './ProductFeatures.jsx';
import ExpandedView from './ExpandedView.jsx';

function ProductDetailPage({ product, allStyles, allPhotos, interactions }) {
  const [viewState, setViewState] = useState({});

  useEffect(() => {
    setViewState({
      style: allStyles[0],
      photoSet: allPhotos[allStyles[0]?.style_id],
      active: false,
      imageIndex: 0,
      styleIndex: 0,
    });
  }, [allStyles]);

  const updateStyleImage = (id) => {
    setViewState((prev) => ({
      ...prev,
      style: allStyles[id],
      photoSet: allPhotos[allStyles[id]?.style_id],
      styleIndex: id,
    }));
  };

  const syncFromExpandedView = (options) => {
    setViewState((prev) => ({
      ...prev,
      imageIndex: options.imageIndex,
      active: options.active,
      styleIndex: options.styleIndex,
    }));
  };

  const syncFromDefaultView = (index) => {
    setViewState((prev) => ({
      ...prev, active: true, imageIndex: index,
    }));
  };

  return (
    <div onClick={(e) => interactions(e, 'ProductDetail')}>
      <div hidden={!viewState.active}>
        <ExpandedView
          photos={viewState.photoSet}
          style={viewState.style}
          styleIndex={viewState.styleIndex}
          syncFromExpandedView={syncFromExpandedView}
          index={viewState.imageIndex}
        />
      </div>
      <div id="productContainer">
        <div />
        <div id="productMain">
          <div hidden={viewState.active}>
            <Gallery
              photos={viewState.photoSet}
              product={product}
              syncFromDefaultView={syncFromDefaultView}
              index={viewState.imageIndex}
            />
          </div>
          <div id="productFeatures">
            <ProductFeatures
              product={product}
              slogan={product?.slogan}
              description={product?.description}
              features={product?.features}
            />
          </div>
        </div>
        <div id="sidebarContainer" hidden={viewState.active}>
          <div id="sidebar">
            <Sidebar
              productName={product?.name}
              productCategory={product?.category}
              allStyles={allStyles}
              style={viewState.style}
              styleIndex={viewState.styleIndex}
              updateStyleImage={updateStyleImage}
            />
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}

export default ProductDetailPage;
