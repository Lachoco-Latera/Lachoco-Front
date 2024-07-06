import { useState } from "react";

const Ship = () => {
  const [info, setInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [countryCode, setCountryCode] = useState<string>("CO");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCarriers();
  };

  return (
    <div className="flex flex-col justify-center items-center p-12 shadow-xl h-screen">
      <div className="flex flex-col justify-center items-center p-12 shadow-xl rounded-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-4"
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
        <div className="w-full overflow-x-auto overflow-y-auto">
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
