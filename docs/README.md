📢 Use this project, [contribute](https://github.com/vtex-apps/minicart) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Minicart

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

:warning: Minicart block has been deprecated in favor of Minicart v2 which can be customized using the blocks defined by [Product List](https://vtex.io/docs/app/vtex.product-list) and [Checkout Summary](https://vtex.io/docs/app/vtex.checkout-summary). If you’re still using the former version, you can find its documentation here: [Minicart v1 documentation](https://github.com/vtex-apps/minicart/blob/383d7bbd3295f06d1b5854a0add561a872e1515c/docs/README.md)

The VTEX Minicart app is a block that displays a list of all items added by customers in their minicart. Its data is fetched from the Checkout OrderForm API.

![Screen Shot 2019-12-18 at 14 06 37](https://user-images.githubusercontent.com/27777263/71111391-19d78b00-21a8-11ea-8e8a-bc6da29aecd6.png)

## Configuration

1. Import the minicart's app to your theme's dependencies in the `manifest.json`, for example:

```json
"dependencies": {
  "vtex.minicart": "2.x"
}
```

2. Add the `minicart.v2` block to your `header`. For example:

```json
"header.full": {
   "blocks": ["header-layout.desktop", "header-layout.mobile"]
 },

 "header-layout.desktop": {
   "children": [
     "header-row#1-desktop",
   ]
 },

 "header-row#1-desktop": {
   "children": ["minicart.v2"],
 },
```

| Prop name              | Type      | Description                                                                                              | Default value |
| ---------------------- | --------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| `variation`            | `Enum`    | Define Minicart variation. (values: `'popup'`, `'drawer'` or `'link'`)                                   | `'sidebar'`   |
| `openOnHover`          | `Boolean` | Whether the popup minicart should open when the user hovers over it.                                     | false         |
| `linkVariationUrl`     | `String`  | The link associated to the `'link'` variation of the Minicart.                                           | false         |
| `drawerSlideDirection` | `Enum`    | Controls the slide direction for the `'sidebar'` variation. (values: `'rightToLeft'` or `'leftToRight'`) | `rightToLeft` |
| `maxDrawerWidth`       | `Number`  | The maximum width in pixels for the open sidebar Minicart.                                               | `440`         |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                     |
| ------------------------------- |
| `minicartWrapperContainer`      |
| `minicartContainer`             |
| `minicartContentContainer`      |
| `minicartProductListContainer`  |
| `minicartTitle`                 |
| `minicartFooter`                |
| `minicartSideBarContentWrapper` |
| `minicartIconContainer`         |
| `minicartQuantityBadge`         |
| `popupWrapper`                  |
| `popupContentContainer`         |
| `arrowUp`                       |
| `popupChildrenContainer`        |

## Advanced Configuration

The `minicart.v2` block is highly customizable because it has `compostion: 'children'` and is composed of other blocks. Currently its default implementation is the following:

```json
// This is the default blocks implementation for the minicart-layout
{
  "minicart.v2": {
    "children": ["minicart-base-content"]
  },
  "minicart-base-content": {
    "blocks": [
      "minicart-product-list",
      "minicart-summary",
      "minicart-empty-state"
    ]
  },
  // The product-list comes from vtex.product-list app
  "minicart-product-list": {
    "blocks": ["product-list"]
  },
  // checkout-summary.compact comes from vtex.checkout-summary app
  "minicart-summary": {
    "blocks": ["checkout-summary.compact"]
  },
  // summary-totalizers comes from vtex.checkout-summary app
  "checkout-summary.compact": {
    "children": ["summary-totalizers#minicart"],
    "props": {
      "totalizersToShow": ["Items", "Discounts"]
    }
  },
  "summary-totalizers#minicart": {
    "props": {
      "showTotal": true,
      "showDeliveryTotal": false
    }
  },
  "minicart-empty-state": {
    "children": ["flex-layout.row#empty-state"]
  },
  "flex-layout.row#empty-state": {
    "children": ["flex-layout.col#empty-state"]
  },
  "flex-layout.col#empty-state": {
    "children": ["rich-text#empty-state"]
  },
  "rich-text#empty-state": {
    "props": {
      "text": "Your cart is empty!"
    }
  }
}
```

This means that, when you use `minicart.v2` in your store, you're actually using this default implementation. So, to customize the blocks being used in your own implementation, you could get this default and change it as you like by adding this blocks to your theme and changing their configuration.

For further information on how to configure each of the blocks used to compose `minicar.v2`, check [VTEX Checkout Summary](https://vtex.io/docs/app/checkout-summary) and [VTEX Product List](https://vtex.io/docs/product-list).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/lucasayb"><img src="https://avatars2.githubusercontent.com/u/17356081?v=4" width="100px;" alt="Lucas Antônio Yamamoto Borges"/><br /><sub><b>Lucas Antônio Yamamoto Borges</b></sub></a><br /><a href="https://github.com/vtex-apps/minicart/commits?author=lucasayb" title="Code">=»</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
