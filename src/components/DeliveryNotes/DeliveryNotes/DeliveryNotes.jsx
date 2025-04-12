import { DeliveryNoteDetail } from "../../../components";
import classes from "./DeliveryNotes.module.scss";

export const DeliveryNotes = ({ deliveryNotes }) => {
  if (!deliveryNotes || deliveryNotes.length === 0)
    return (
      <div className={classes.box}>
        <h4>No hay remitos</h4>
      </div>
    );

  return (
    <div className={classes.box}>
      <h4>Remitos:</h4>
      {deliveryNotes.map((deliveryNote) => {
        return <DeliveryNoteDetail key={deliveryNote.id} {...deliveryNote} />;
      })}
    </div>
  );
};
