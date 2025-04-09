import { DeliveryNoteDetail } from "../../../components";

export const DeliveryNotes = ({ deliveryNotes }) => {
  if (!deliveryNotes || deliveryNotes.length === 0)
    return <h4>No hay remitos</h4>;

  return (
    <div>
      <h4>Remitos:</h4>
      {deliveryNotes.map((deliveryNote) => {
        return <DeliveryNoteDetail key={deliveryNote.id} {...deliveryNote} />;
      })}
    </div>
  );
};
