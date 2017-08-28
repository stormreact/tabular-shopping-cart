import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

import { Flex, Box } from "grid-styled";
import TableProduct from './TableProduct';

const columns = [
  {
    property: "title",
    header: {
      label: "Title",
    },
    props: {
      style: { minWidth: 175, width: 175 }
    }
  },
  {
    property: "price",
    header: {
      label: "Price",
    }
  },
  {
    property: "inventory",
    header: {
      label: "Inventory",
    }
  },
  {
    property: "addtocart",
    header: {
      label: "Add to cart",
    },
    props: {
      style: { minWidth: 85, width: 85 }
    },
    cell: {
      formatters: [
        (value, { rowData }) => (
          <span
            className="remove"
            onClick={() => this.props.deleteRow(rowData.id)} style={{ cursor: 'pointer' }}
          >
            &#10007;
          </span>
        )
      ]
    }
  }
];

const ProductsContainer = ({ products, addToCart }) => (
  <Flex>
    <Box width={1 / 2} px={2}>
    <ProductsList title="Products">
      {products.map(product =>
        <ProductItem
          key={product.id}
          product={product}
          onAddToCartClicked={() => addToCart(product.id)} />
      )}
    </ProductsList>
  </Box>
  <Box width={1 / 2} px={2}>
    <TableProduct rows={products} columns={columns}/>
  </Box>
  </Flex>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductsContainer)
