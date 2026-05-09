// Invokes the BackdPayments widget modal with the order shape the live
// site uses. Mirrors the structure recovered from the live bundle so
// the demo's checkout flow behaves identically to the real product.

const PUBLIC_API_KEY = 'pk_b3cf33a316e546ee86103b97bc795a91';

const SAMPLE_PERSON = {
  name: { first: 'Joe', last: 'Demo' },
  company_name: 'SNKR hub',
  address: {
    line1: '123 Main St',
    line2: '',
    city: 'Austin',
    state: 'TX',
    zipcode: '78704',
    country: 'USA',
  },
  phone_number: '5125550100',
  email: 'joe@example.com',
};

export function isWidgetReady() {
  return typeof window !== 'undefined' && !!window.widgetBackd?.initializeWidget;
}

export function buildOrder({ items, totalCents }) {
  const cart_amount = totalCents / 100;
  return {
    merchant: {
      public_api_key: PUBLIC_API_KEY,
      name: 'SNKR hub',
    },
    mode: {
      type: 'modal',
      order_success_url: `${window.location.origin}/BackdPay`,
      order_close_url: `${window.location.origin}/cart`,
    },
    shipping: SAMPLE_PERSON,
    billing: SAMPLE_PERSON,
    items: items.map((it) => ({
      display_name: it.name,
      sku: `SKU-${it.id}-${it.size}`,
      unit_price: it.priceCents / 100,
      qty: it.qty,
      item_image_url: it.image,
      item_url: `${window.location.origin}/preview/${it.id}`,
    })),
    merchant_order_id: `demo-${Date.now()}`,
    merchant_order_status: 'processing',
    cart_amount,
    tax_amount: 0,
    shipping_amount: 0,
    discount_amount: 0,
    order_total: cart_amount,
  };
}

export function openBackdCheckout({ items, totalCents, onSuccess, onClose, onFail }) {
  if (!isWidgetReady()) {
    throw new Error('BackdPayments widget not loaded');
  }
  window.widgetBackd.initializeWidget({
    order: buildOrder({ items, totalCents }),
    onSuccess,
    onClose,
    onFail,
  });
}
