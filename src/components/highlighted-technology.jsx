import React from "react";

export default props => {
  return (
    <div className="highlighted-technology">
      <div className="description">
        {props.technologyDescription || (
          <div>
            No description for this technology.
            {` `}
            <a href="https://github.com/tom-on-the-internet/work-remote-technologies/blob/master/src/technology-thoughts.js">
              Make one!
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
