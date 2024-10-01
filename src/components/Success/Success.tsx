import { useLocation } from "react-router-dom";
import tinyLogo from "../../assets/images/tinyLogo.png";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore"; // Asegúrate de ajustar la ruta de importación
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //console.log("Query params", queryParams);
  const navigate = useNavigate();
  const collectionId = queryParams.get("collection_id");
  const paymentStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const paymentType = queryParams.get("payment_type");
  const merchantOrderId = queryParams.get("merchant_order_id");
  const preferenceId = queryParams.get("preference_id");
  const { clearCart } = useCartStore();
  const {t} = useTranslation()

  // Limpia el carrito cuando el componente se monta
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-6">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8">
        <img
          src={tinyLogo}
          className="w-48 md:min-w-16 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
          alt="Lachoco-Latera logo"
          onClick={() => navigate("/inventory")}
        />
        <h1 className="text-3xl font-bold text-rose-600 mb-4">
          {t("Success_thanks")}
          {t("")}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
        {t("Success_approved")}
        </p>
        <p className="text-md text-gray-600">{t("Success_transaction")}</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>{t("Success_id")}</strong> {paymentId}
          </li>
          <li>
            <strong>{t("Success_id2")}</strong> {collectionId}
          </li>
          <li>
            <strong>{t("Success_id3")}</strong> {merchantOrderId}
          </li>
          <li>
            <strong>{t("Success_id4")}</strong> {preferenceId}
          </li>
          <li>
            <strong>{t("Success_payment")}</strong> {paymentStatus}
          </li>
          <li>
            <strong>{t("Success_payment2")}</strong> {paymentType}
          </li>
        </ul>
        <p className="text-md text-gray-600 mt-4">
        {t("Success_msj")}
        </p>
        <small
          className="hover:cursor-pointer hover:scale-105 hover:font-bold transition-all ease py-6"
          onClick={() => navigate("/inventory")}
        >
         {t("Success_click")}
        </small>
      </div>
    </div>
  );
};

export default Success;
