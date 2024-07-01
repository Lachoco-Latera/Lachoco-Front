export const CambioMoneda = () => {
  return (
    <div className="flex flex-col">
      <div className="flex hover:cursor-pointer py-1 justify-around hover:scale-105">
        <label
          htmlFor="usd"
          className="text-sm font-medium text-gray-900 m-2 hover:cursor-pointer"
        >
          USD
        </label>
        <input
          type="radio"
          id="usd"
          name="currency"
          value="USD"
          defaultChecked
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex hover:cursor-pointer py-1 justify-around hover:scale-105">
        <label
          htmlFor="mex"
          className="text-sm font-medium text-gray-900 m-2 hover:cursor-pointer"
        >
          MEX
        </label>
        <input
          type="radio"
          id="mex"
          name="currency"
          value="MEX"
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex hover:cursor-pointer py-1 justify-around hover:scale-105">
        <label
          htmlFor="col"
          className="text-sm font-medium text-gray-900 m-2 hover:cursor-pointer"
        >
          COL
        </label>
        <input
          type="radio"
          id="col"
          name="currency"
          value="COL"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};
