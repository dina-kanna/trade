import { CheckCircle2, X } from "lucide-react";
import { formatCurrency } from "../data/stocks";

export default function OrderModal({
  order,
  onClose,
  onConfirm,
}) {
  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>

        <div className="modal-icon">
          <CheckCircle2 size={30} />
        </div>

        <h2>Review your demo order</h2>

        <p>
          You are about to simulate a{" "}
          <strong>{order.side.toUpperCase()}</strong> order.
        </p>

        <div className="modal-details">
          <div>
            <span>Stock</span>
            <strong>{order.symbol}</strong>
          </div>

          <div>
            <span>Quantity</span>
            <strong>{order.quantity} shares</strong>
          </div>

          <div>
            <span>Estimated price</span>
            <strong>{formatCurrency(order.price)}</strong>
          </div>

          <div>
            <span>Estimated total</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </div>

        <p className="muted">
          This is a simulation. No real order will be placed.
        </p>

        <button
          className="btn btn-primary full-width"
          onClick={onConfirm}
        >
          Confirm demo order
        </button>

        <button
          className="btn btn-outline full-width modal-back"
          onClick={onClose}
        >
          Go back
        </button>
      </div>
    </div>
  );
}