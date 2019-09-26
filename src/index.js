import "./index.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";

import AboutPage from "./components/about-page";
import Footer from "./components/footer";
import LocationDisplay from "./components/location-display";
import TechnologyDisplay from "./components/technology-display";
import technologyData from "./technologies.json";
import convertDataToLocations from "./utilities/convert-data-to-locations";
import convertDataToTechnologies from "./utilities/convert-data-to-technologies";

const App = () => {
  const [locations, setLocations] = useState(
    convertDataToLocations(technologyData)
  );
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [highlightedTechnology, setHighlightedTechnology] = useState(
    "JavaScript"
  );

  const onClickCheckbox = locationName => {
    const locationToUpdate = locations.find(
      ({ name }) => name === locationName
    );
    locationToUpdate.on = !locationToUpdate.on;

    setLocations(locations);
  };

  const onClickTechnology = technologyName =>
    setHighlightedTechnology(technologyName);

  const onCloseAboutPage = () => setShowAboutPage(false);

  const technologies = convertDataToTechnologies(technologyData, locations);

  const techStuff = (
    <React.Fragment>
      <h1>Technologies from We Work Remotely</h1>
      <button
        className="navigation-button"
        onClick={() => setShowAboutPage(true)}
      >
        About This Page
      </button>
      <LocationDisplay locations={locations} onChange={onClickCheckbox} />
      <TechnologyDisplay
        technologies={technologies}
        highlightedTechnology={highlightedTechnology}
        onClick={onClickTechnology}
      />
      <Footer />
    </React.Fragment>
  );

  const aboutPage = <AboutPage onClose={onCloseAboutPage} />;

  return (
    <React.Fragment>{showAboutPage ? aboutPage : techStuff}</React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
