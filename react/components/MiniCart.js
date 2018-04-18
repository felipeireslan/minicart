import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import orderFormQuery from '../queries/orderFormQuery.gql'
import updateItemsMutation from '../mutations/updateItemsMutation.gql'
import MiniCartItem from './MiniCartItem'
import Button from '@vtex/styleguide/lib/Button'
import WrappedSpinner from './WrappedSpinner'
import { FormattedNumber } from 'react-intl'

class MiniCart extends Component {
  static propTypes = {
    label: PropTypes.string,
    data: PropTypes.object,
    mutate: PropTypes.func,
  }

  static contextTypes = {
    culture: PropTypes.object,
  }

  handleRemoveItem = ({ target: { id } }) => {
    const { mutate, data: { orderForm } } = this.props
    const itemPayload = orderForm.items.find(item => item.id === id)
    const index = orderForm.items.indexOf(itemPayload)
    const updatedItem = [itemPayload].map(item => {
      return {
        id: parseInt(item.id),
        index: index,
        quantity: 0,
        seller: 1,
      }
    })

    mutate({
      variables: {
        orderFormId: orderForm.orderFormId,
        items: updatedItem,
      },
      refetchQueries: [{ query: orderFormQuery }],
    })
  }

  getItemId = detailUrl => {
    const regExp = /\/([^)]+)\//
    return regExp.exec(detailUrl)[1]
  }

  componentWithoutProducts = () => {
    return (
      <div className="w-100">
        <span>Sua sacola está vazia!</span>
      </div>
    )
  }

  componentWithProducts = (data) => {
    return (
      <div
        className="relative w-100">
        {data.orderForm.items.map(item => (
          <div key={item.id}>
            <MiniCartItem
              className="w-100"
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.sellingPrice}
              productId={this.getItemId(item.detailUrl)}
            />
            <hr />
          </div>
        ))}
        <div className="fr mb3 mr3">
          <span className="mr2">Total</span>
          <FormattedNumber
            value={data.orderForm.value}
            style="currency"
            currency={this.context.culture.currency}
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />
        </div>
        <div className="mb1">
          <Button primary block onClick={this.handleCart}>
            Meu carrinho
          </Button>
        </div>
      </div>
    )
  }

  componentLoading = () => {
    return (
      <div className="w-100">
        <WrappedSpinner />
      </div>
    )
  }

  handleCart = () => location.assign('/checkout/#/cart')

  render() {
    let element
    const { data } = this.props
    if (data.loading) {
      element = this.componentLoading()
    } else if (!data.orderForm.items.length) {
      element = this.componentWithoutProducts()
    } else {
      console.log(data)
      element = this.componentWithProducts(data)
    }
    return element
  }
}

export default compose(graphql(orderFormQuery), graphql(updateItemsMutation))(
  MiniCart
)
