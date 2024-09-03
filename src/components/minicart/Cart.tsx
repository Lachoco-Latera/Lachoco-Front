import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import MapSelector from "../MapSelector"; // Asegúrate de importar el MapSelector

// import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { VITE_BASE_URL, VITE_FRONTEND_URL } from "@/config/envs";
import CartItemGiftCard from "../GiftCards/CartItemGiftCard";
import { useTranslation } from "react-i18next";
import ShippingProvider from "../ShippingProvider/ShippingProvider";

function Cart({ similar }: any) {
  const { cart, confirmedFlavors, giftCards } = useCartStore();
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
  const [defineShipping, setDefineShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<any[]>([]);

  const shippingLocal = JSON.parse(
    localStorage.getItem("shippingInfo") || "[]"
  );

  const shippingPrice = JSON.parse(
    localStorage.getItem("shippingPrice") || "0"
  );

  const shippingInfo2: any[] = [];
  let shippingFlat: any[] = [];
  const { t } = useTranslation();
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

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userFullname = user?.fullName;

  similar;
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/users`);
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
  let totalGiftCards = 0;
  if (cart) {
    if (giftCards) {
      totalGiftCards = giftCards.reduce(
        (acc, giftCards: any) => acc + Number(giftCards.amountCard),
        0
      );
    }
    total = cart.reduce((acc, product: any) => {
      const quantity = Math.max(product.quantity as number, 0);
      return acc + product.price * quantity;
    }, 0);
    total = total + totalGiftCards+shippingPrice;
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
            const countryCode = response.data.address.country_code.toUpperCase();
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
          reject(t("Toast_flavors"));
        } else {
          // resolve(navigate("/ship"));
        }
      }, 1100);
    });

  const requestPayment = async (paymentData: Record<string, any>) => {
    const shippingPrice = JSON.parse(
      localStorage.getItem("shippingPrice") || "0"
    );
    console.log("paymentData", paymentData, shippingPrice);
    const bodyCheckout = {...paymentData, shippingPrice}
    return axios
      .post(`${VITE_BASE_URL}/pagos/create-checkout-session`,bodyCheckout )
      .then((paymentResponse) => {
        console.log(
          "Respuesta de pago:",
          paymentResponse.data,
          paymentResponse
        );
        setInfoModal(false);
        toast(t("please_access_to_payment"), {
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
        toast.warning(t("Toast_createOrder") + t("Toast_form"));
      });
  };

  const handlePlaceOrder2 = async () => {
    if (
      (cart.length > 0 && giftCards.length === 0) ||
      (cart.length > 0 && giftCards.length > 0)
    ) {
      setInfoModal(true);
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
      giftCards: giftCards.map((giftCard) => ({
        giftCardId: giftCard.id,
        nameRecipient: giftCard.nameRecipient,
        emailRecipient: giftCard.emailRecipient,
        message: giftCard.message,
      })),
      additionalInfo:
        latitude && longitude
          ? `www.google.com/maps/@${latitude},${longitude},20.01z?entry=ttu`
          : "No se pudo proporcionar ubicación de usuario",
    };
    const response = await axios.post(`${VITE_BASE_URL}/orders`, order);
    globalOrderId = response.data[0].id;
    setOrderCreatedId(response.data[0].id);

    if (cart.length === 0 && giftCards.length > 0) {
      const paymentData = {
        orderId: globalOrderId,
        country: "COL",
      };

      if (globalOrderId !== "" && globalOrderId.length !== 0) {
        console.log("userFullname", globalOrderId);
        toast.promise(requestPayment(paymentData), {
          loading: t("processing_order"),
          success: t("order_processed_successfully"),
          error: t("error_creating_order"),
        });
      } else {
        throw new Error(t("order_id_is_invalid"));
      }
    }
  };

  const handlePlaceOrder = async () => {
    console.log("formData", formData);
    const {
      orderId,
      shipmentCountry,
      giftCardId,
      frecuency,
      ...rest
    } = formData;
    let paymentData: any = {
      orderId: orderCreatedId,
      country: "COL",
    };
    if (Object.values(rest).every((value) => value !== "")) {
      paymentData = {
        ...paymentData,
        phone: rest.phone,
        number: rest.number,
        street: rest.street,
        city: rest.city,
        state: rest.state,
        postalCode: rest.postalCode,
        shipmentCountry: shipmentCountry || "COL",
        shippingPrice: shippingPrice,
      };

      console.log("paymentData", paymentData.order);
    }
    if (giftCardId) {
      paymentData.order.giftCardId = giftCardId;
    }
    if (orderCreatedId !== "" && orderCreatedId.length !== 0) {
      console.log("userFullname", userFullname);
      const carriers = ["coordinadora", "interRapidisimo", "servientrega"];

      for (let i = 0; i < carriers.length; i++) {
        const shippingData = {
          user: {
            name: userFullname,
            company: "",
            email: userEmail,
            phone: paymentData.phone,
            street: paymentData.street,
            number: paymentData.number,
            city: paymentData.city,
            state: paymentData.state,
            country: paymentData.shipmentCountry,
            postalCode: paymentData.postalCode,
          },
          country: "CO",
          carrier: carriers[i],
        };

        const response = await axios.post(
          `${VITE_BASE_URL}/shipments/rate`,
          shippingData
        );
        console.log("responseShipping", response.data);
        shippingInfo2.push(response.data);
        console.log("shippingInfo2", shippingInfo2);
      }
      shippingFlat = shippingInfo2.flat();
      console.log("shippingFlat", shippingFlat);
      window.localStorage.setItem("shippingInfo", JSON.stringify(shippingFlat));
      console.log("shippingInfo", shippingInfo);
      setDefineShipping(true);
      const shippingPrice = shippingLocal.totalPrice;

      toast.promise(requestPayment(paymentData, shippingPrice), {
        loading: t("processing_order"),
        success: t("order_processed_successfully"),
        error: t("error_creating_order"),
      });
    } else {
      throw new Error(t("order_id_is_invalid"));
    }
  };

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

    axios.post(`${VITE_BASE_URL}/orders`, order).then((response) => {
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
          .post(`${VITE_BASE_URL}/pagos/create-checkout-session`, {...paymentData, shippingPrice})
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

  const isDisabled =
    orderCreatedId === ""
      ? false
      : !toPayment && orderCreatedId !== ""
      ? false
      : true;
  const buttonClass =
    orderCreatedId === ""
      ? "hover:bg-black text-black hover:text-white hover:scale-105"
      : !toPayment && orderCreatedId
      ? "hover:bg-black text-black hover:text-white hover:scale-105"
      : "text-slate-500";

  const handleClickPlaceOrder = () => {
    if (orderCreatedId === "") {
      handlePlaceOrder2();
    } else if (!toPayment && orderCreatedId !== "") {
      handlePlaceOrder();
    } else {
      toast.info(t("Toast_order"));
    }
  };

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">{t("Cart_your")}</h3>
      <ul>
        {giftCards?.map((giftCard, index) => (
          <CartItemGiftCard key={index} giftCard={giftCard} />
        ))}
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
            - {t("Cart_load")}
          </span>
        )}
      </div>
      {defineShipping ? (
        <div className="flex-column justify-between items-center gap-4 mb-2 shadow-md p-4">
          <div className="flex items-center gap-8 md:flex-row flex-col md:text-start text-center hover:cursor-pointer">
            <h3 className=" font-semibold text-base w-full">Transportadora</h3>
            <h3 className=" font-semibold text-base w-3/4">Tiempo estimado</h3>
            <h3 className=" font-semibold text-base w-2/3">Valor</h3>
            <h3 className=" font-semibold text-base w-3/4">Servicio</h3>
          </div>
          {shippingLocal.map((carrier, index) => (
            <ShippingProvider key={index} carrier={carrier} />
          ))}
        </div>
      ) : null}
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
                loading: t("Toast_checkout"),
                success: t("Toast_thanks"),
                error: t("Toast_flavors"),
              })
            }
            className="text-xl font-bold"
            disabled
          >
            {t("Cart_pending")}
          </button>
        </div>
      ) : (
        <>
          <div
            className={`flex rounded-xl p-2 mt-2 shadow 
              justify-center ${buttonClass} transition-all ease`}
          >
            <button
              onClick={() => handleClickPlaceOrder()}
              className="text-xl font-bold"
              disabled={isDisabled}
            >
              {t("Cart_order")}
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
                      actualLink || `${VITE_FRONTEND_URL}`)
                  }
                  className="text-xl font-bold"
                >
                  {t("Cart_pay")}
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
              {t("Cart_shipping")} <br /> {t("Cart_shipping2")}:
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">{t("Cart_phone")}</label>
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
                <label className="block mb-1">{t("Cart_Country")}</label>
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
                <label className="block mb-1">{t("Cart_state")}</label>
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
                <label className="block mb-1">{t("Cart_city")}</label>
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
                <label className="block mb-1">{t("Cart_street")}</label>
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
                <label className="block mb-1">{t("Cart_number")}</label>
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
                <label className="block mb-1">{t("Cart_code")}</label>
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
                <label className="block mb-1">{t("Cart_geolocation")}</label>
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
                <label className="block mb-1">{t("Cart_coupon")}</label>
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
