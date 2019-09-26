import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import AboutPage from "./components/about-page";
import Footer from "./components/footer";
import LocationDisplay from "./components/location-display";
import TechnologyDisplay from "./components/technology-display";
import technologyData from "./technologies.json";
import convertDataToLocations from "./utilities/convert-data-to-locations";
import convertDataToTechnologies from "./utilities/convert-data-to-technologies";

class App extends React.Component {
  state = {
    locations: convertDataToLocations(technologyData),
    highlightedTechnology: "JavaScript",
    showAboutPage: false
  };

  onClickCheckbox = locationName => {
    const locations = [...this.state.locations];
    const locationToUpdate = locations.find(
      ({ name }) => name === locationName
    );
    locationToUpdate.on = !locationToUpdate.on;

    this.setState({ locations });
  };

  onClickTechnology = technologyName =>
    this.setState({ highlightedTechnology: technologyName });

  onCloseAboutPage = () => this.setState({ showAboutPage: false });

  render() {
    const technologies = convertDataToTechnologies(
      technologyData,
      this.state.locations
    );

    const techStuff = (
      <React.Fragment>
        <h1>Technologies from We Work Remotely</h1>
        <button
          className="navigation-button"
          onClick={() => this.setState({ showAboutPage: true })}
        >
          About This Page
        </button>
        <LocationDisplay
          locations={this.state.locations}
          onChange={this.onClickCheckbox}
        />
        <TechnologyDisplay
          technologies={technologies}
          highlightedTechnology={this.state.highlightedTechnology}
          onClick={this.onClickTechnology}
        />
        <Footer />
      </React.Fragment>
    );

    const aboutPage = <AboutPage onClose={this.onCloseAboutPage} />;

    return (
      <React.Fragment>
        {this.state.showAboutPage ? aboutPage : techStuff}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
