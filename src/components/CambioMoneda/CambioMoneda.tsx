
export const CambioMoneda = () => {
    return (
      <div className="flex flex-col items-center justify-center">
          <div>
              <label htmlFor="usd" className="text-sm font-medium text-gray-900 m-2">USD</label>
              <input type="radio" id="usd" name="currency" value="USD"  /><br />
              <label htmlFor="mex" className="text-sm font-medium text-gray-900 m-2">MEX</label>
              <input type="radio" id="mex" name="currency" value="MEX" /><br />
              <label htmlFor="col" className="text-sm font-medium text-gray-900 m-2">COL</label>
              <input type="radio" id="col" name="currency" value="COL"  />
          </div>
      </div>
    )
  }
  