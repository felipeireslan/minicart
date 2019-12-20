import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCheckoutURL } from 'vtex.checkout-resources/Utils'
import { useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'

import { useMinicartState } from './MinicartContext'
import styles from './styles.css'

interface Props {
  sideBarMode: boolean
  finishShoppingButtonLink: string
}

const CSS_HANDLES = [
  'minicartContentContainer',
  'minicartProductListContainer',
  'minicartTitle',
  'minicartFooter',
] as const

const Content: FC<Props> = ({ finishShoppingButtonLink }) => {
  const { orderForm, loading }: OrderFormContext = useOrderForm()
  const handles = useCssHandles(CSS_HANDLES)
  const { variation } = useMinicartState()
  const { url: checkoutUrl } = useCheckoutURL()

  const minicartContentClasses = `${handles.minicartContentContainer} ${
    variation === 'drawer' ? styles.drawerStyles : styles.popupStyles
  } flex flex-column justify-between`

  const minicartFooterClasses = `${handles.minicartFooter} ${
    variation === 'drawer' ? 'pa4' : 'pv3'
  } sticky`

  const isCartEmpty = !loading && orderForm.items.length === 0

  return (
    <div className={minicartContentClasses}>
      <div
        className={`w-100 overflow-y-auto ${handles.minicartProductListContainer}`}
      >
        <h3 className={`${handles.minicartTitle} t-heading-3 mv2 c-on-base`}>
          <FormattedMessage id="store/minicart.title" />
        </h3>
        {isCartEmpty ? (
          <ExtensionPoint id="minicart-empty-state" />
        ) : (
          <ExtensionPoint id="minicart-product-list" />
        )}
      </div>
      {!isCartEmpty && (
        <div className={minicartFooterClasses}>
          <ExtensionPoint id="minicart-summary" />
          <Button
            id="proceed-to-checkout"
            href={finishShoppingButtonLink || checkoutUrl}
            variation="primary"
            block
          >
            <FormattedMessage id="store/minicart.go-to-checkout" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Content
