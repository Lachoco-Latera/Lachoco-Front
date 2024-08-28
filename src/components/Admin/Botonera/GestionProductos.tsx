import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import UploadWidget from "../../../components/UploadWidget";
import { ICategories, IFlavor } from "../../../helpers/type";
import { toast } from "sonner";
import { IoMdExit } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { VITE_BASE_URL } from "@/config/envs";
import { useTranslation } from "react-i18next";

export const GestionProductos = ({ signal, onCloseModal }: any) => {
  const {t} = useTranslation()
  const [editState, setEditState] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const [formEditState, setFormEditState] = useState<any>({
    id: null,
    name: "",
    presentacion: 0,
    description: "",
    price: 0,
    currency: "USD",
    label: "nuevo",
    isActive: false,
    flavors: [],
    images: [],
    categoryId: "",
  });
  const [flavors, setFlavors] = useState<IFlavor[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<any>([]);
  editState;
  url;
  useEffect(() => {
    const getFlavors = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/flavor`
        );
        const data = response.data;
        setFlavors(data);
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/category`
        );
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFlavors();
    getCategories();
  }, []);
  const handleFlavorChange = (flavor: IFlavor) => {
    if (
      selectedFlavors.some((selected: IFlavor) => selected.id === flavor.id)
    ) {
      setSelectedFlavors(
        selectedFlavors.filter((selected: IFlavor) => selected.id !== flavor.id)
      );
    } else {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  const handleEdit = (product: any) => {
    setEditState(true);
    setFormEditState({
      id: product.id,
      name: product.name,
      presentacion: product.presentacion,
      description: product.description,
      price: Number(product.price),
      currency: product.currency,
      label: product.label,
      isActive: product.isActive,
      flavors: product.flavors,
      images: product.images,
      categoryId: product.category.id,
    });
    setSelectedFlavors(product.flavors);
    setModalOpen(true);
  };
  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : (name === "presentacion" || name === "price") && value !== ""
        ? parseFloat(value.replace(",", ""))
        : value;

    setFormEditState({
      ...formEditState,
      [name]: newValue,
    });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormEditState((prevState: any) => ({
      ...prevState,
      flavors: selectedFlavors,
      price: Number(prevState.price),
    }));
    toast("Esperando al servidor...", { id: "loading-submit" });
    try {
      let response;
      if (formEditState.id) {
        response = await axios.put(
          `${VITE_BASE_URL}/products/${formEditState.id}`,
          formEditState
        );
      } else {
        response = await axios.post(
          `${VITE_BASE_URL}/products`,
          formEditState
        );
      }

      closeModal();

      if (response) {
        toast.success(
          formEditState.id
            ? "Producto actualizado con éxito!"
            : "Producto creado con éxito!"
        );
        setFormEditState({
          name: "",
          presentacion: 0,
          description: "",
          price: 0,
          currency: "USD",
          label: "nuevo",
          flavors: [],
          images: [],
          categoryId: "",
        });
        setSelectedFlavors([]);
      }
    } catch (error) {
      console.warn("Error al guardar producto:", error);
    } finally {
      toast.dismiss("loading-submit");
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/products`
        );
        const data = response.data;
        setOrderState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  const handleButtonDelete = async (id: string) => {
    toast("Esperando al servidor...", { id: "loading-delete" });
    try {
      await axios.delete(`${VITE_BASE_URL}/products/${id}`);
      setOrderState((prevState) =>
        prevState.filter((order) => order.id !== id)
      );
      toast.success("Producto eliminado");
      console.log(`Producto con id: ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con id: ${id}`, error);
    } finally {
      toast.dismiss("loading-delete");
    }
  };

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      updateError(error);
      widget.close({ quiet: true });
      return;
    }
    toast("Esperando al servidor...", { id: "loading-upload" });
    const secureUrl = result?.info?.secure_url;
    updateUrl(secureUrl);
    setFormEditState((prevState: any) => ({
      ...prevState,
      images: [...prevState.images, secureUrl],
    }));
    toast.dismiss("loading-upload");
  };
  return (
    <div className="overflow-y-scroll">
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center px-12 bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 md:p-6 md:max-w-3xl w-full rounded-lg overflow-y-auto max-h-[80vh] md:mb-0 mb-16 md:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-end pb-2">
              <IoMdExit
                onClick={closeModal}
                className="hover:scale-105 hover:cursor-pointer transition-all ease"
                size={28}
              />
            </div>
            <form
              className=" flex flex-col justify-evenly items-center "
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder={t("Management_name")}
                  className="p-2 border rounded-md"
                  value={formEditState.name}
                  onChange={handleInputChange}
                />
                <select
                  name="categoryId"
                  className="p-2 border rounded-md"
                  value={formEditState.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    {t("Management_category")}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <p className="self-start font-semibold drop-shadow">
                  {t("Management_quantity")}
                </p>
                <input
                  type="number"
                  name="presentacion"
                  placeholder={t("Management_presentation")}
                  className="p-2 border rounded-md"
                  value={formEditState.presentacion}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder={t("Management_description")}
                  className="p-2 border rounded-md"
                  value={formEditState.description}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col items-center">
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }: any) => {
                      function handleOnClick(e: any) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button
                          onClick={handleOnClick}
                          className="rounded-xl p-2 shadow-md hover:drop-shadow-xl hover:scale-105 transition all ease hover:bg-rose-400 text:bg-blue-400 hover:text-white font-bold hover:cursor-pointer"
                        >
                          {t("Management_images")}
                        </button>
                      );
                    }}
                  </UploadWidget>
                  {error && <p>{error}</p>}
                  <div className="flex flex-row flex-wrap justify-center items-center">
                    {formEditState.images.length > 0 ? (
                      formEditState.images.map(
                        (image: { img: string }, index: number) => (
                          <div
                            key={index}
                            className="relative p-2 max-w-40 break-words"
                          >
                            <img
                              src={image.img} // Accede a image.img
                              alt={`Uploaded resource ${index}`}
                              className="w-20 h-20 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFormEditState((prevState: any) => ({
                                  ...prevState,
                                  images: prevState.images.filter(
                                    (_: any, i: any) => i !== index
                                  ),
                                }))
                              }
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        )
                      )
                    ) : (
                      <p>{t("Management_notdisplay")}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="self-start font-semibold drop-shadow">
                    {t("Price")} {"(Euros)"}
                  </p>
                  <input
                    type="number"
                    name="price"
                    placeholder={t("Price")}
                    className="p-2 border rounded-md"
                    value={formEditState.price}
                    onChange={handleInputChange}
                  />
                  <select
                    name="label"
                    className="p-2 border rounded-md"
                    value={formEditState.label}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      {t("Management_label")}
                    </option>
                    <option value="SoloOnline">{t("Management_online")}</option>
                    <option value="nuevo">{t("new")}</option>
                  </select>

                  <div className="flex items-center space-x-2 py-2">
                    <label
                      htmlFor="isActive"
                      className="font-semibold text-gray-700"
                    >
                     {t("Management_isActive")}
                    </label>
                    <input
                      type="checkbox"
                      name="isActive"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formEditState.isActive}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-wrap justify-center">
                    {flavors.map((flavor) => (
                      <div
                        key={flavor.id}
                        className="m-2 p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex items-center"
                      >
                        <input
                          type="checkbox"
                          id={flavor.id}
                          name="flavor"
                          value={flavor.id}
                          className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedFlavors.some(
                            (selected: IFlavor) => selected.id === flavor.id
                          )}
                          onChange={() => handleFlavorChange(flavor)}
                        />
                        <label
                          htmlFor={flavor.id}
                          className="text-gray-700 font-medium"
                        >
                          {flavor.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl p-2 shadow-md hover:drop-shadow-xl 
                          hover:scale-105 transition all ease  hover:bg-rose-400 
                          text:bg-blue-400 hover:text-white font-bold hover:cursor-pointer"
                  >
                    {t("Management_create")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {orderState.map((order) => (
          <div
            key={order.id}
            className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 py-4 rounded-xl bg-white shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            <h2 className="font-bold text-lg text-gray-800 text-center">
              {order.name}
            </h2>
            {order.images.length > 0 ? (
              <div className="self-center">
                <img
                  src={order.images ? order.images[0]?.img : ""}
                  alt=""
                  className="w-36"
                />
              </div>
            ) : (
              <div className="self-center">
                <img src={logo} alt="" className="w-36" />
              </div>
            )}
            <p className="text-sm text-gray-600 text-center">
              {order.description}
            </p>
            <p className="text-lg font-bold text-green-700 text-center">
              ${order.price} {order.currency}
            </p>
            <p className="text-md font-semibold text-gray-800 text-center">
              {order.category.name}
            </p>
            <p className="text-sm font-semibold text-gray-600 text-center">
              Stock:{" "}
              {order.flavors.reduce(
                (acc: any, flavor: any) => acc + flavor.stock,
                0
              )}
            </p>
            <div className="flex justify-center items-center mt-4">
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={() => handleEdit(order)}
              >
                {t("Management_edit")}
              </button>
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={() => handleButtonDelete(order.id)}
              >
                {t("Management_delet")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
