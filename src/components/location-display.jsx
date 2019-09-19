import React from "react";

export default props => {
  return (
    <div className="location-display">
      <ul>
        {props.locations.map(location => (
          <li key={location.name}>
            <label>
              <input
                onChange={() => props.onChange(location.name)}
                type="checkbox"
                checked={location.on}
              />
              {location.name} ({location.percentage}%)
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
