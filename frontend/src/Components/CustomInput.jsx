import React from "react";

const CustomInput = ({
  label,
  type = "text",
  register,
  name,
  error,
  ...rest
}) => {
  const inputProps =
    type === "number"
      ? { ...register(name, { valueAsNumber: true }), ...rest }
      : { ...register(name), ...rest };

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        {...inputProps}
        className={`w-full border rounded-lg px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
