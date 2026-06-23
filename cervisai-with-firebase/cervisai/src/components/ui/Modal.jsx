// src/components/ui/Modal.jsx
export default function Modal({ onClose, children }) {
  return (
    <div
      className="modal-bg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">{children}</div>
    </div>
  );
}
