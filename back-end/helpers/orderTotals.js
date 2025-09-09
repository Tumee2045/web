import productModel from '../models/productModel.js';

export async function computeTotals(items, delivery = 10) {
  // items: [{ _id, quantity }]
  const ids = items.map(i => i._id);
  const dbProducts = await productModel.find({ _id: { $in: ids } }).select('_id price');
  const priceMap = Object.fromEntries(dbProducts.map(p => [p._id.toString(), p.price]));

  let subtotal = 0;
  for (const it of items) {
    const price = priceMap[it._id] ?? 0;
    const qty = Number(it.quantity) || 0;
    subtotal += price * qty;
  }
  return { subtotal, total: subtotal + delivery };
}
