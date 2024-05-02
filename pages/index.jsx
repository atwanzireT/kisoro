import { useState } from 'react';
import axios from 'axios';
import '../app/globals.css';

export default function Home() {
  const [inputData, setInputData] = useState({
    RELATIVE_HUMIDITY: 0,
    RAINFALL_INTENSITY: 0,
    MAX_TEMP: 0,
    MIN_TEMP: 0,
    WETSPELL: 0,
    Vegetation_Cover: 0
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/predict', inputData);
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while making prediction.');
      setPrediction(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: parseFloat(value) });
  };

  const interpretPrediction = () => {
    if (prediction === 1) {
      return "There's a high risk of landslide soon.";
    } else if (prediction === 0) {
      return "No immediate risk of landslide.";
    } else {
      return "Prediction not available.";
    }
  };

  return (
    <div className="container mx-auto px-4 grid grid-cols-2 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Kisoro LandSlides</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Relative Humidity" name="RELATIVE_HUMIDITY" value={inputData.RELATIVE_HUMIDITY} onChange={handleChange} />
          <InputField label="Rainfall Intensity" name="RAINFALL_INTENSITY" value={inputData.RAINFALL_INTENSITY} onChange={handleChange} />
          <InputField label="Max Temp" name="MAX_TEMP" value={inputData.MAX_TEMP} onChange={handleChange} />
          <InputField label="Min Temp" name="MIN_TEMP" value={inputData.MIN_TEMP} onChange={handleChange} />
          <InputField label="Wetspell" name="WETSPELL" value={inputData.WETSPELL} onChange={handleChange} />
          <InputField label="Vegetation Cover" name="Vegetation_Cover" value={inputData.Vegetation_Cover} onChange={handleChange} />
          <button type="submit" className="bg-slate-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Predict</button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Prediction Result</h1>
        {prediction !== null && (
          <div className="result mt-4">
            <h2 className="text-xl font-bold">Prediction:</h2>
            <p>{interpretPrediction()}</p>
          </div>
        )}
        {error && (
          <div className="error mt-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input type="number" name={name} value={value} onChange={onChange} className="border rounded-md py-2 px-3 w-full" />
    </div>
  );
}
