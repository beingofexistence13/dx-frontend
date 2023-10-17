import {describe, it, expect} from 'vitest';
import {CART_ID, mockCreateStorefrontClient} from '../cart-test-helper';
import {cartDiscountCodesUpdateDefault} from './cartDiscountCodesUpdateDefault';

describe('cartDiscountCodesUpdateDefault', () => {
  it('should return a default cart discount code update implementation', async () => {
    const cartDiscountCode = cartDiscountCodesUpdateDefault({
      storefront: mockCreateStorefrontClient(),
      getCartId: () => CART_ID,
    });

    const result = await cartDiscountCode([]);

    expect(result.cart).toHaveProperty('id', CART_ID);
  });

  it('can override cartFragment', async () => {
    const cartFragment = 'cartFragmentOverride';
    const cartDiscountCode = cartDiscountCodesUpdateDefault({
      storefront: mockCreateStorefrontClient(),
      getCartId: () => CART_ID,
      cartFragment,
    });

    const result = await cartDiscountCode([]);

    expect(result.cart).toHaveProperty('id', CART_ID);
    expect(result.errors?.[0]).toContain(cartFragment);
  });
});
