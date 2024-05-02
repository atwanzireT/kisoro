import React, { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    RELATIVE_HUMIDITY: "",
    RAINFALL_INTENSITY: 0,
    MAX_TEMP: "",
    MIN_TEMP: "",
    WETSPELL: "",
    Vegetation_Cover: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          RELATIVE_HUMIDITY:
          <input
            type="text"
            name="RELATIVE_HUMIDITY"
            value={formData.RELATIVE_HUMIDITY}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RAINFALL_INTENSITY:
          <input
            type="number"
            name="RAINFALL_INTENSITY"
            value={formData.RAINFALL_INTENSITY}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          MAX_TEMP:
          <input
            type="text"
            name="MAX_TEMP"
            value={formData.MAX_TEMP}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          MIN_TEMP:
          <input
            type="text"
            name="MIN_TEMP"
            value={formData.MIN_TEMP}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          WETSPELL:
          <input
            type="text"
            name="WETSPELL"
            value={formData.WETSPELL}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Vegetation_Cover:
          <input
            type="text"
            name="Vegetation_Cover"
            value={formData.Vegetation_Cover}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
