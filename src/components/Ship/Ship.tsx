import axios from "axios";
import { useState, useEffect } from "react";

const Ship = () => {
  const [info, setInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [countryCode, setCountryCode] = useState<string>("CO");
  const [countries, setCountries] = useState<any[]>([]);
  useEffect;
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
    try {
      const response = await axios.get(
        "https://queries-test.envia.com/country"
      );

      setCountries(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      setCountries([]);
      console.error("Error fetching country data:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCarriers();
  };

  return (
    <div className="flex flex-col justify-center items-center p-12 shadow-xl">
      <div className="flex flex-col justify-center items-center p-12 shadow-xl rounded-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-4 border-b-4 border-green-400 pb-2"
        >
          <label htmlFor="countryCode">Country Code:</label>
          <input
            type="text"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-2 border mb-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Fetch Carriers
          </button>
        </form>
        <div className="w-full overflow-x-auto overflow-y-auto mb-4 max-h-[500px] border-b-4 border-yellow-400 pb-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrier Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Estimate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {info ? (
                info.data.map((carrier: any) => (
                  <tr key={carrier.service_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {carrier.service_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {carrier.carrier_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {carrier.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {carrier.delivery_estimate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {carrier.active === 1 ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-center"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full overflow-x-auto overflow-y-auto  max-h-[500px] border-b-4 border-red-400 pb-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Code
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countries.length > 0 ? (
                countries.map((country: any) => (
                  <tr key={country.code}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {country.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {country.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {country.phone_code}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 whitespace-nowrap text-center"
                  >
                    No country data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {errors && (
          <div className="text-red-500">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ship;
