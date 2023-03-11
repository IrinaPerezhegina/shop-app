import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    // const getInputClasses = () => {
    //     return "form-control" + (error ? " is-invalid" : "");
    // };
    const handleChange = (value) => {
        onChange({ name, value });
    };
    return (
        <>
            <div className="mb-4">
                <label className="form-label">{label}</label>
                <Select
                    isMulti
                    closeMenuOnSelect={false}
                    defaultValue={defaultValue}
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    name={name}
                />
                <div className="text-danger">{error}</div>
            </div>
        </>
    );
};
MultiSelectField.propTypes = {
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
