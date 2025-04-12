export const getDeliveredQuantities = (deliveryNotes) => {
  const delivered = {};
  deliveryNotes.forEach((note) => {
    note.products.forEach((product) => {
      if (!delivered[product.id]) delivered[product.id] = 0;
      delivered[product.id] += product.quantity;
    });
  });
  return delivered;
};

export const getPendingQuantities = (orderProducts, deliveryNotes) => {
  const delivered = getDeliveredQuantities(deliveryNotes);

  return orderProducts.map((product) => {
    const deliveredQty = delivered[product.id] || 0;
    return {
      ...product,
      pending: product.quantity - deliveredQty,
    };
  });
};
