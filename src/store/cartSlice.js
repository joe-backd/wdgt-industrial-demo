import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id, name, image, priceCents, size, brand, qty }]
};

// Items are uniquely identified by (id, size); same product with different
// sizes are separate line items. Mirrors typical sneaker-store cart logic.
const lineKey = (a, b) => a.id === b.id && a.size === b.size;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, { payload }) {
      const existing = state.items.find((it) => lineKey(it, payload));
      if (existing) {
        existing.qty += payload.qty ?? 1;
      } else {
        state.items.push({ ...payload, qty: payload.qty ?? 1 });
      }
    },
    remove(state, { payload }) {
      const idx = state.items.findIndex((it) => lineKey(it, payload));
      if (idx === -1) return;
      const it = state.items[idx];
      if (it.qty > 1) it.qty -= 1;
      else state.items.splice(idx, 1);
    },
    removeAll(state) {
      state.items = [];
    },
    hydrate(state, { payload }) {
      state.items = Array.isArray(payload) ? payload : [];
    },
  },
});

export const { add, remove, removeAll, hydrate } = cartSlice.actions;

export const selectItems = (s) => s.cart.items;
export const selectCount = (s) =>
  s.cart.items.reduce((n, it) => n + it.qty, 0);
export const selectTotalCents = (s) =>
  s.cart.items.reduce((n, it) => n + it.priceCents * it.qty, 0);

export default cartSlice.reducer;
