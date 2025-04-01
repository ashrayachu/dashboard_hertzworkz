import React from 'react';

function InputField({
    id,
    type,
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    error,
}) {
    return (
        <div className="mb-6">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={placeholder}
                required={required}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

export default InputField;