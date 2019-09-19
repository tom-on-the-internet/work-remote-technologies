import React from 'react';

import technologyThoughts from '../technology-thoughts';
import HighlightedTechnology from './highlighted-technology';

export default props => {
  return (
    <div className="technology-display">
      {props.technologies.map(technology => (
        <button
          className={`technology-display-item ${
            technology.name === props.highlightedTechnology ? "highlighted" : ""
          }`}
          onClick={() => props.onClick(technology.name)}
          key={technology.name}
        >
          {technology.name} ({technology.percentage}%)
          {technology.name === props.highlightedTechnology && (
            <HighlightedTechnology
              technologyName={props.highlightedTechnology}
              technologyDescription={
                technologyThoughts[props.highlightedTechnology]
              }
            />
          )}
        </button>
      ))}
    </div>
  );
};
