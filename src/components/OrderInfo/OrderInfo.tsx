import { useState } from "react";
import { useTranslation } from "react-i18next";

const OrderInfo = ({userInfo}: any) => {
  const {t} = useTranslation()
  //console.log(userInfo);
  const [formData, setFormData] = useState({
    orderId: "",
    giftCardId: "",
    country: "",
    frecuency: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    state: "",
    postalCode: "",
    shipmentCountry: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //console.log(formData);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "20px",
          zIndex: 50,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h2>{t("Order_details")}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t("Order_id")}</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Order_gift")}</label>
            <input
              type="text"
              name="giftCardId"
              value={formData.giftCardId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{t("Cart_Country")}</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Order_frequency")}</label>
            <input
              type="text"
              name="frecuency"
              value={formData.frecuency}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{t("Cart_phone")}</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Cart_street")}</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Cart_number")}</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Cart_city")}</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Cart_state")}</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Cart_code")}</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Order_shipment")}</label>
            <input
              type="text"
              name="shipmentCountry"
              value={formData.shipmentCountry}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{t("Send")}</button>
        </form>
      </div>
    </>
  );
};

export default OrderInfo;
