import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import MapSelector from "../MapSelector"; // Asegúrate de importar el MapSelector

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
  const [orderCreatedId, setOrderCreatedId] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [, setCountry] = useState<string>("");
  const [actualLink, setActualLink] = useState("");
  const [infoModal, setInfoModal] = useState(false);
  const [useCustomMap, setUseCustomMap] = useState(false);
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

  let globalOrderId: string;
  if (!useCustomMap) {
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
      function success(position: any) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        const southAmericaCountries = [
          "AR",
          "BO",
          "BR",
          "CL",
          "CO",
          "EC",
          "GY",
          "PY",
          "PE",
          "SR",
          "UY",
          "VE",
        ];
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          .then((response) => {
            const countryCode =
              response.data.address.country_code.toUpperCase();
            console.log(
              countryCode,
              `www.google.com/maps/@${latitude},${longitude}`
            );
            if (southAmericaCountries.includes(countryCode)) {
              setCountry("CO");
            } else {
              setCountry("GLOBAL");
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
            setCountry("GLOBAL");
          });
      }
      function error() {
        console.log("Unable to retrieve your location");
        setCountry("GLOBAL");
      }
    }, []);
  }

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
    if (!infoModal) {
      setInfoModal(true);
      return;
    }

    const order = {
      userId: userId,
      products: cart.map((product) => ({
        productId: product.id,
        cantidad: product.quantity,
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
      additionalInfo:
        latitude && longitude
          ? `www.google.com/maps/@${latitude},${longitude},20.01z?entry=ttu`
          : "No se pudo proporcionar ubicación de usuario",
    };

    toast.promise(
      axios
        .post("https://lachocoback.vercel.app/orders", order)
        .then((response) => {
          globalOrderId = response.data[0].id;
          setOrderCreatedId(response.data[0].id);
          const paymentData: any = {
            orderId: globalOrderId,
            country: "COL",
            phone: formData.phone,
            number: formData.number,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            shipmentCountry: formData.shipmentCountry || "COL",
          };
          // Agregar giftCardId solo si no es vacío
          if (formData.giftCardId) {
            paymentData.giftCardId = formData.giftCardId;
          }

          if (globalOrderId !== "" && globalOrderId.length !== 0) {
            return axios.post(
              "https://lachocoback.vercel.app/pagos/create-checkout-session",
              paymentData
            );
          } else {
            throw new Error("Order ID is invalid");
          }
        })
        .then((paymentResponse) => {
          console.log(
            "Respuesta de pago:",
            paymentResponse.data,
            paymentResponse
          );
          setInfoModal(false);
          toast("Por favor, acceder al pago", {
            duration: 10000,
            action: {
              label: "Click to continue",
              onClick: () => (window.location.href = paymentResponse.data),
            },
          });
          setToPayment(true);
          setActualLink(paymentResponse.data);
        })
        .catch((error) => {
          setToPayment(false);
          console.error("Error en el envío de paymentData:", error);
          toast.warning(
            "Error al crear la orden de pago: " +
              "Probablemente olvidaste llenar el formulario"
          );
        }),
      {
        loading: "Procesando orden...",
        success: "Orden procesada con éxito",
        error: "Error al crear la orden de pago",
      }
    );
  };

  const [formData, setFormData] = useState({
    orderId: orderCreatedId || "",
    giftCardId: "",
    country: "",
    frecuency: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    state: "",
    postalCode: "",
    shipmentCountry: "COL",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInfoModal(true);
    const order = {
      userId: userId,
      products: cart.map((product) => ({
        productId: product.id,
        cantidad: product.quantity,
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
      additionalInfo:
        latitude && longitude
          ? `www.google.com/maps/@${latitude},${longitude}`
          : "No se pudo proporcionar ubicación de usuario",
    };

    axios
      .post("https://lachocoback.vercel.app/orders", order)
      .then((response) => {
        globalOrderId = response.data[0].id;
        setOrderCreatedId(response.data[0].id);
        const paymentData: any = {
          orderId: globalOrderId,
          country: "COL",
          phone: formData.phone,
          street: formData.street,
          number: formData.number,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          shipmentCountry: formData.shipmentCountry || "COL",
        };
        // Agregar giftCardId solo si no es vacío
        if (formData.giftCardId) {
          paymentData.giftCardId = formData.giftCardId;
        }

        if (globalOrderId !== "" && globalOrderId.length !== 0) {
          axios
            .post(
              "https://lachocoback.vercel.app/pagos/create-checkout-session",
              paymentData
            )
            .then((paymentResponse) => {
              console.log(
                "Respuesta de pago:",
                paymentResponse.data,
                paymentResponse
              );
              setInfoModal(false);
              toast("Por favor, acceder al pago", {
                duration: 10000,
                action: {
                  label: "Click to continue",
                  onClick: () => (window.location.href = paymentResponse.data),
                },
              });

              setToPayment(true);
              setActualLink(paymentResponse.data);
            })
            .catch((error) => {
              console.error("Error en el envío de paymentData:", error);
              toast.error("Error al crear la orden de pago: " + error.message);
              setToPayment(false);
            });
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
            className={`flex rounded-xl p-2 mt-2 shadow 
        justify-center   ${
          orderCreatedId === ""
            ? "hover:bg-black text-black hover:text-white hover:scale-105 "
            : "text-slate-500"
        }  transition-all ease`}
          >
            <button
              onClick={() =>
                orderCreatedId === ""
                  ? handlePlaceOrder()
                  : !toPayment && orderCreatedId !== ""
                  ? handlePlaceOrder()
                  : toast.info("Ya has realizado un pedido")
              }
              className="text-xl font-bold"
            >
              Realizar Pedido
            </button>
          </div>
          <>
            {toPayment ? (
              <div
                className="flex rounded-xl p-2 mt-2 shadow 
        justify-center hover:bg-green-500 text-green-500
         hover:text-white hover:scale-105 transition-all ease"
              >
                <button
                  onClick={() =>
                    (window.location.href =
                      actualLink || "https://lachoco-front.vercel.app")
                  }
                  className="text-xl font-bold"
                >
                  Proceder a pagar
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        </>
      )}
      {infoModal ? (
        <>
          <div className="bg-white p-5 mt-5 z-50 shadow-md rounded-xl">
            <h2 className="mb-4 font-bold">
              Porfavor llene la información de envio, <br /> Antes de "Realizar
              el pedido":
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">País</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">
                  Estado/Provincia/Departamento
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Calle/Barrio</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Número</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">
                  Geolocalización (Para mejorar la precisión del envio)
                </label>
                <input
                  type="text"
                  name="shipmentCountry"
                  value={
                    longitude && latitude
                      ? `www.google.com/maps/@${latitude},${longitude},20.01z?entry=ttu`
                      : `Sin úbicación`
                  }
                  onChange={handleChange}
                  required
                  disabled
                  className="w-full border p-2 rounded"
                />
                <MapSelector
                  onClick={() => setUseCustomMap(true)}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </div>

              <div>
                <label className="block mb-1">
                  Cupón de descuento (opcional)
                </label>
                <input
                  type="text"
                  name="giftCardId"
                  value={formData.giftCardId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </form>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Cart;
