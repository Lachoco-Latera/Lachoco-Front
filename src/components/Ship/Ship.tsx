import axios from "axios";
import { useState, useEffect } from "react";

const Ship = () => {
  const [info, setInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [countryCode, setCountryCode] = useState<string>("AR");
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [carrierData, setCarrierData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [printOptionsData, setPrintOptionsData] = useState<any[]>([]);
  const [additionalServicesData, setAdditionalServicesData] = useState<any[]>(
    []
  );
  carrierData;
  serviceData;
  useEffect(() => {
    fetchCountryData();
    fetchCarriers();
    fetchStates();
  }, []);

  const fetchCarriers = async () => {
    try {
      const response = await fetch(
        `https://queries-test.envia.com/service?country_code=${countryCode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch carriers");
      }

      const data = await response.json();
      setInfo(data);
      setErrors(null); // Reset errors on successful fetch
    } catch (err) {
      setInfo(null);
      setErrors(["Hubo un error al obtener los transportistas"]);
      console.warn("Error:", err);
    }
  };

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(
        "https://queries-test.envia.com/country"
      );

      setCountries(
        response.data.data.map((country: any, index: number) => ({
          ...country,
          uniqueId: `country-${index}`, // Usando una combinación única
        }))
      );
    } catch (err) {
      setCountries([]);
      console.error("Error fetching country data:", err);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(
        `https://queries-test.envia.com/state?country_code=${countryCode}`
      );
      setStates(
        response.data.data.map((state: any, index: number) => ({
          ...state,
          uniqueId: `state-${state.code_2_digits}-${index}`, // Usando una combinación única
        }))
      );
      // console.log(response.data.data);
    } catch (err) {
      setStates([]);
      console.error("Error fetching state data:", err);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      const token =
        "e6265b6534aa2c3ff3975b57321c7907eeac368d968f911a4f4042ddd671194c";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const carrierResponse = await axios.get(
        `https://queries-test.envia.com/carrier?country_code=${countryCode}`,
        config
      );
      setCarrierData(carrierResponse.data.data);

      const serviceResponse = await axios.get(
        `https://queries-test.envia.com/service?country_code=${countryCode}`,
        config
      );
      setServiceData(serviceResponse.data.data);

      const printOptionsResponse = await axios.get(
        `https://queries.envia.com/carrier-print-option`,
        config
      );
      setPrintOptionsData(printOptionsResponse.data.data);

      const additionalServicesResponse = await axios.get(
        `https://queries.envia.com/additional-services`,
        config
      );
      setAdditionalServicesData(additionalServicesResponse.data.data);
    } catch (err) {
      console.error("Error fetching additional data:", err);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCarriers();
    fetchStates();
    fetchAdditionalData();
  };
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center p-12 shadow-xl rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-4 border-b-4 border-green-400 pb-2 sm:flex-row sm:items-center sm:justify-center"
        >
          <label htmlFor="countryCode" className="mr-2">
            Country Code:
          </label>
          <input
            type="text"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-2 border mb-2 sm:mb-0 sm:mr-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Buscar Info Extra
          </button>
        </form>
        <div className="md:w-full w-full  overflow-x-auto overflow-y-auto mb-4 max-h-[500px] border-b-4 border-yellow-400 pb-2">
          <div className="shadow   border-b border-gray-200 sm:rounded-lg">
            <b className="flex font-bold text-3xl items-center justify-center py-2">
              Carriers disponibles por País
            </b>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre de Carrier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estimado de envio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activo?
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {info ? (
                  info.data.map((carrier: any) => (
                    <tr key={`carrier-${carrier.service_id}`}>
                      <td className="px-6 py-4 ">{carrier.service_id}</td>
                      <td className="px-6 py-4 ">{carrier.carrier_name}</td>
                      <td className="px-6 py-4 ">{carrier.description}</td>
                      <td className="px-6 py-4 ">
                        {carrier.delivery_estimate}
                      </td>
                      <td className="px-6 py-4 ">
                        {carrier.active === 1 ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan={5} className="px-6 py-4  text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-full w-full overflow-x-auto overflow-y-auto mb-4 max-h-[500px] border-b-4 border-red-400 pb-2">
          <div className="shadow   border-b border-gray-200 sm:rounded-lg">
            <b className="flex font-bold text-3xl items-center justify-center py-2">
              Info de paises
            </b>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código de país
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre de País
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Codigo de Teléfono
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {countries.length > 0 ? (
                  countries.map((country: any, index: number) => (
                    <tr
                      key={`country-${country.code}-${index}`}
                      className="max-w-12"
                    >
                      <td className="px-6 py-4 max-w-12">{country.code}</td>
                      <td className="px-6 py-4 max-w-12">{country.name}</td>
                      <td className="px-6 py-4 max-w-12">
                        {country.phone_code}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-country-data">
                    <td colSpan={3} className="px-6 py-4  text-center">
                      No country data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-full w-full  overflow-x-auto overflow-y-auto  max-h-[500px] border-b-4 border-blue-400 pb-2">
          <div className="shadow   border-b border-gray-200 sm:rounded-lg">
            <b className="flex font-bold text-3xl items-center justify-center py-2">
              Info de Estados/Provincias/Departamentos
            </b>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provincia/Departamento/Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código (2 digitos)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código (3 digitos)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código shopify
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    País
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {states.length > 0 ? (
                  states.map((state: any, index: number) => (
                    <tr key={`state-${state.code_2_digits}-${index}`}>
                      <td className="px-6 py-4 ">{state.name}</td>
                      <td className="px-6 py-4 ">{state.code_2_digits}</td>
                      <td className="px-6 py-4 ">{state.code_3_digits}</td>
                      <td className="px-6 py-4 ">{state.code_shopify}</td>
                      <td className="px-6 py-4 ">{state.country_code}</td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-state-data">
                    <td colSpan={5} className="px-6 py-4  text-center">
                      No state data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-full w-full overflow-x-auto overflow-y-auto mb-4 max-h-[500px] border-b-4 border-yellow-400 pb-2">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <b className="flex font-bold text-3xl items-center justify-center py-2">
              Opciones de impresión de Label
            </b>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID de Opción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Formato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamaño
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Map over Print Options data */}
                {printOptionsData.map((option, index) => (
                  <tr key={`print-option-${index}`}>
                    <td className="px-6 py-4">{option.id}</td>
                    <td className="px-6 py-4">{option.name}</td>
                    <td className="px-6 py-4">{option.print_format}</td>
                    <td className="px-6 py-4">{option.print_size}</td>
                  </tr>
                ))}
                {/* If no Print Options data available */}
                {printOptionsData.length === 0 && (
                  <tr key="no-print-options-data">
                    <td colSpan={4} className="px-6 py-4 text-center">
                      No print options data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-full w-full overflow-x-auto overflow-y-auto mb-4 max-h-[500px] border-b-4 border-pink-400 pb-2">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <b className="flex font-bold text-3xl items-center justify-center py-2">
              Informacion de servicios
            </b>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Additional Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Additional Service Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disponibilidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Tipo de Envio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Map over Additional Services data */}
                {additionalServicesData.map((option, index) => (
                  <tr key={`additional-service-${index}`}>
                    <td className="px-6 py-4">{option.id}</td>
                    <td className="px-6 py-4">{option.name}</td>
                    <td className="px-6 py-4">{option.description}</td>
                    <td className="px-6 py-4">
                      {option.active === 1 ? "Activo" : "No disponbile"}
                    </td>
                    <td className="px-6 py-4">
                      {!option.shipment_type_id
                        ? "No tiene"
                        : option.shipment_type_id}
                    </td>
                  </tr>
                ))}

                {/* If no Additional Services data available */}
                {additionalServicesData.length === 0 && (
                  <tr key="no-additional-services-data">
                    <td colSpan={3} className="px-6 py-4 text-center">
                      No additional services data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {errors && (
          <div className="text-red-500">
            <ul>
              {errors.map((error, index) => (
                <li key={`error-${index}`}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ship;
