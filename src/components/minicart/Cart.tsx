import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
function Cart({ similar }: any) {
  const { cart, confirmedFlavors } = useCartStore();
  const [, setActualConfirmedFlavorsTotal] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false); // Estado para controlar la visibilidad del tooltip
  const [completed, setCompleted] = useState<boolean>(true);
  const [userId, setUserId] = useState(null);
  const { user, isLoaded } = useUser();
  const [toPayment, setToPayment] = useState(false);

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  similar;
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://lachocoback.vercel.app/users`
        );
        const userWithEmail = response.data.find(
          (user: any) => user.email === userEmail
        );
        if (userWithEmail) {
          setUserId(userWithEmail.id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isLoaded && userEmail) {
      fetchUserData();
    }
  }, [isLoaded, userEmail]);
  useEffect(() => {
    const countFlavorsAndSum = () => {
      let totalFlavors = 0;

      for (const id in confirmedFlavors) {
        totalFlavors += confirmedFlavors[id].length;
      }

      setActualConfirmedFlavorsTotal(totalFlavors);
    };

    countFlavorsAndSum();
  }, [confirmedFlavors]);

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product: any) => {
      const quantity = Math.max(product.quantity as number, 0);
      return acc + product.price * quantity;
    }, 0);
  }

  const bombonesProducts = cart.filter(
    (product) => product.category.name === "bombones"
  );

  const handleUpdateFlavors = () => {
    // Función para verificar si todos los sabores están seleccionados
    const hasIncompleteFlavors = bombonesProducts.some((product) => {
      const productMaxFlavor = product.quantity * product.presentacion;
      const confirmedFlavorsCount = confirmedFlavors[product.id]?.length || 0;
      return confirmedFlavorsCount !== productMaxFlavor;
    });
    return !hasIncompleteFlavors;
  };
  useEffect(() => {
    const hasIncompleteFlavors = bombonesProducts.some((product) => {
      const productMaxFlavor = product.quantity * product.presentacion;
      const confirmedFlavorsCount = confirmedFlavors[product.id]?.length || 0;
      return confirmedFlavorsCount !== productMaxFlavor;
    });

    setCompleted(!hasIncompleteFlavors);
  }, [confirmedFlavors, bombonesProducts]);
  const promise = () =>
    new Promise((reject) => {
      setTimeout(() => {
        const order = {
          userId: userId,
          products: cart.map((product) => ({
            productId: product.id,
            cantidad: product.quantity,
            category: product.category,
            flavors:
              product.category.name === "bombones"
                ? product.flavors.map((flavor) => ({
                    flavorId: flavor.id,
                    cantidad: flavor.stock,
                  }))
                : [],
            pickedFlavors:
              product.category.name === "bombones"
                ? confirmedFlavors[product.id] || []
                : product.flavors.map((flavor) => flavor.id),
          })),
        };

        const hasBombones = order.products.some(
          (product: any) =>
            product.category.name === "bombones" &&
            product.pickedFlavors.length === 0
        );

        if (hasBombones) {
          reject("Debes seleccionar sabores para los bombones.");
        } else {
          // resolve(navigate("/ship"));
        }
      }, 1100);
    });

  const handlePlaceOrder = () => {
    const order = {
      userId: userId,
      products: cart.map((product) => ({
        productId: product.id,
        cantidad: 1,
        category: product.category.name,
        flavors: product.flavors.map((flavor) => ({
          flavorId: flavor.id,
          cantidad: 1,
        })),
        pickedFlavors:
          product.category.name === "bombones"
            ? confirmedFlavors[product.id] || []
            : product.flavors.map((flavor) => flavor.id),
      })),
    };

    axios
      .post("https://lachocoback.vercel.app/orders", order)
      .then((response) => {
        response;
        toast.success("¡Orden creada exitosamente!");
        console.log("Objeto order:", order);

        const shipmentData = {
          user: {
            name: user?.fullName,
            company: "CLIENT",
            email: userEmail,
            phone: user?.phoneNumbers[0] || "573012985389",
            street: "carretera 4a",
            number: "a",
            district: "",
            city: "cundinamarca",
            state: "bogotá",
            country: "colombia",
            postalCode: "08019",
          },
          country: "CO",
          carrier: "saferbo",
          carrierService: "ground",
        };

        return axios.post(
          "https://lachocoback.vercel.app/shipments/createlabel",
          shipmentData
        );
      })
      .then((shipmentResponse) => {
        console.log("Info del envio:", shipmentResponse);
        const shipmentData = shipmentResponse.data.data[0];
        if (shipmentResponse) {
          toast.info("Creando sesión de pago...");
        }
        const paymentData =
          /*ORDER ID ES VARIABLE, 
          Y NO LO TENEMOS EN ESTE COMPONENTE, 
          BUSCAR LA MANERA DE BUSCARLO SEGÚN 
          EL ÚLTIMO CARRITO ACTIVO QUE TIENE EL USUARIO ACTIVO
          Y NO DEJAR USAR SI EL CARRITO ESTÁ ACTIVO*/
          {
            orderId: "76fe6ab2-0bfb-4ff9-a598-6836025146b8",
            country: "COL",
            trackingNumber: "6230002013526301",
            label:
              "https://s3.us-east-2.amazonaws.com/envia-staging/uploads/correosExpress/62300020135263012405668a18a0c5118.pdf",
            totalPrice: "10.99",
            frecuency: "WEEKLY",
          };

        return axios.post(
          "https://lachocoback.vercel.app/pagos/create-checkout-session",
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TEST_ENVIA}`,
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then((paymentResponse) => {
        console.log("Respuesta de pago:", paymentResponse.data);
        toast("Porfavor acceder al pago", {
          action: {
            label: "Undo",
            onClick: () => (window.location.href = paymentResponse.data),
          },
        });
        setToPayment(true);
      })
      .catch((error) => {
        console.log("Objeto order:", order);
        if (error.response) {
          console.error(
            "Server responded with error status:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
          toast.error(
            "Error al crear la orden: " + error.response.data.message
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast.error(
            "Error al crear la orden: No se recibió respuesta del servidor."
          );
        } else {
          console.error("Error setting up the request:", error.message);
          toast.error("Error al crear la orden: " + error.message);
        }
      });
  };

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">Tu carrito</h3>
      <ul>
        {cart?.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            onUpdateFlavors={handleUpdateFlavors}
          />
        ))}
      </ul>
      <div className=" h-2">
        {showTooltip && !completed && (
          <span className="tooltip absolute bg-slate-600 opacity-95 text-white text-xs px-2 py-1 rounded-md right-4">
            - Aún te faltan cargar sabores
          </span>
        )}
      </div>
      <div
        className="flex justify-between items-center mt-4 "
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-lg font-bold">Total:</span>
        <span
          className={`text-xl font-bold ${
            !completed ? "text-red-500" : "text-slate-500"
          }`}
        >
          ${total.toFixed(2)}
        </span>
      </div>
      {!handleUpdateFlavors() ? (
        <div className="flex rounded-xl p-2 mt-2 shadow justify-center text-red-300  hover:text-red-500 hover:scale-105 transition-all ease">
          <button
            onClick={() =>
              toast.promise(promise, {
                loading: `Serás redireccionado para pagar...`,
                success: "¡Muchas gracias de antemano! ❤",
                error: "Debes seleccionar sabores para los bombones.",
              })
            }
            className="text-xl font-bold"
            disabled
          >
            Aún tienes sabores pendientes
          </button>
        </div>
      ) : (
        <>
          <div
            className="flex rounded-xl p-2 mt-2 shadow 
        justify-center hover:bg-green-500 text-green-500
         hover:text-white  hover:scale-105 transition-all ease"
          >
            <button onClick={handlePlaceOrder} className="text-xl font-bold">
              Calcular envio
            </button>
          </div>
          {toPayment ? (
            <div
              className="flex rounded-xl p-2 mt-2 shadow 
        justify-center hover:bg-black text-black
         hover:text-white  hover:scale-105 transition-all ease"
            >
              <button onClick={handlePlaceOrder} className="text-xl font-bold">
                Proceder a pagar
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
}

export default Cart;
