import { useLocation, useNavigate } from "react-router-dom";
import tinyLogo from "../../assets/images/tinyLogo.png";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

const Failure = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const preferenceId = queryParams.get("preference_id");
  const { user } = useUser();
  const fullName = user?.fullName;
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(preferenceId ? preferenceId : "")
      .then(() => {
        toast.success("ID de Preferencia copiado al portapapeles!");
      })
      .catch((err) => {
        alert("Error al copiar al portapapeles: " + err);
      });
  };
  const emailBody = `
    Intenté realizar el pago pero no se pudo procesar.
    \n\nDatos del usuario:
    \nNombre: ${user?.firstName} ${user?.lastName}
    \nCorreo electrónico: ${user?.primaryEmailAddress?.emailAddress}
    \nID de Preferencia: ${preferenceId}
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8">
        <img
          src={tinyLogo}
          className="w-12 md:w-48 md:min-w-16 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
          alt="Lachoco-Latera logo"
          onClick={() => navigate("/inventory")}
        />
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Ocurrió un problema con tu compra
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Lamentablemente, no pudimos procesar tu compra.
        </p>
        <p className="text-md text-gray-600">Detalles de la transacción:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li className="select-text">
            <strong>ID de Preferencia:</strong>
            <span
              onClick={copyToClipboard}
              className="hover:cursor-pointer hover:text-blue-500 hover:font-bold px-2 transition-all ease"
            >
              {preferenceId}
            </span>
          </li>
        </ul>
        <p className="text-md text-gray-600 mt-4">
          Por favor, intenta nuevamente más tarde o contacta a nuestro soporte.
        </p>
        <small
          className="hover:cursor-pointer hover:scale-105 hover:font-bold transition-all ease"
          onClick={() => navigate("/inventory")}
        >
          Haz click aquí o al Logo para ir a tu inventario, o cierra esta
          página.
        </small>
        <p className="text-md text-gray-600 mt-4">Información del usuario:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <strong>Nombre:</strong> {user?.firstName} {user?.lastName}
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            {user?.primaryEmailAddress?.emailAddress}
          </li>
        </ul>
        <a
          href={`mailto:ventas@lachoco-latera.com?subject=${fullName}: Problema con el pago&body=${encodeURIComponent(
            emailBody
          )}`}
          className="text-blue-500 hover:underline mt-4"
          title="Enviar correo a ventas@lachoco-latera.com"
        >
          Contacta a soporte
        </a>
      </div>
    </div>
  );
};

export default Failure;
