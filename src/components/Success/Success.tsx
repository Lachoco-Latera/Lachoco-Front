import { useLocation } from "react-router-dom";
import tinyLogo from "../../../public/images/tinyLogo.png";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const collectionId = queryParams.get("collection_id");
  const paymentStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const paymentType = queryParams.get("payment_type");
  const merchantOrderId = queryParams.get("merchant_order_id");
  const preferenceId = queryParams.get("preference_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-6">
      <div className="flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg p-8">
        <img
          src={tinyLogo}
          className="w-48 md:min-w-16 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
          alt="Lachoco-Latera logo"
          onClick={() => navigate("/inventory")}
        />
        <h1 className="text-3xl font-bold text-rose-600 mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Tu compra ha sido aprobada con éxito.
        </p>
        <p className="text-md text-gray-600">Detalles de la transacción:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>ID de Pago:</strong> {paymentId}
          </li>
          <li>
            <strong>ID de Colección:</strong> {collectionId}
          </li>
          <li>
            <strong>ID de Orden de Comerciante:</strong> {merchantOrderId}
          </li>
          <li>
            <strong>ID de Preferencia:</strong> {preferenceId}
          </li>
          <li>
            <strong>Estado del pago:</strong> {paymentStatus}
          </li>
          <li>
            <strong>Tipo de Pago:</strong> {paymentType}
          </li>
        </ul>
        <p className="text-md text-gray-600 mt-4">
          Nos alegra que hayas elegido comprar con nosotros. ¡Esperamos verte de
          nuevo pronto!
        </p>
        <small
          className="hover:cursor-pointer hover:scale-105 hover:font-bold transition-all ease py-6"
          onClick={() => navigate("/inventory")}
        >
          Haz click aquí o al Logo para ir a tu inventario, o cierra está página
        </small>
      </div>
    </div>
  );
};

export default Success;
