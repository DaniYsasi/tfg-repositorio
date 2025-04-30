import React from "react";
import "./VolumeControl.css";

const VolumeControl = ({ audio, volume, setVolume }) => {
  const changeVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
      audio.volume = newVolume; // Ajusta el volumen dinámicamente
  };

  return (
    <div className="volume-control">
      <label htmlFor="volume-control">Volumen</label>
      <input
        id="volume-control"
        type="range"
        min="0"
        max="0.5"
        step="0.01"
        value={volume}
        onChange={changeVolume}
      />
    </div>
  );
};

export default VolumeControl;