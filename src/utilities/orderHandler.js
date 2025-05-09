import { formatDate, formatTime } from "./formatterNumber";

export const orderHanlder = (data) => {
  const orderInfo = data.orderInfo.order;

  const order = {
    id: orderInfo.id,
    number: orderInfo.order_number ? orderInfo.order_number : "Sin asignar",
    isComplete: orderInfo.is_complete,
    date: formatDate(orderInfo.order_date),
    time: formatTime(orderInfo.order_date),
  };

  const user = {
    id: orderInfo.user_id,
    name: orderInfo.user_name,
    lastname: orderInfo.user_lastname,
  };

  const products = data.orderInfo.products;

  const deliveryNotes = data.deliveryNotes;

  return { order, user, products, deliveryNotes };
};
