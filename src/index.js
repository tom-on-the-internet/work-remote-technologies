import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import AboutPage from './components/about-page';
import Footer from './components/footer';
import LocationDisplay from './components/location-display';
import TechnologyDisplay from './components/technology-display';
import technologyData from './data.json';
import convertDataToLocations from './utilities/convert-data-to-locations';
import convertDataToTechnologies from './utilities/convert-data-to-technologies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: convertDataToLocations(technologyData),
      highlightedTechnology: "JavaScript",
      showAboutPage: false
    };
  }

  onClickCheckbox(locationName) {
    const locations = [...this.state.locations];
    const locationToUpdate = locations.find(
      ({ name }) => name === locationName
    );
    locationToUpdate.on = !locationToUpdate.on;

    this.setState({ locations });
  }

  onClickTechnology(technologyName) {
    this.setState({ highlightedTechnology: technologyName });
  }

  onCloseAboutPage() {
    this.setState({ showAboutPage: false });
  }

  render() {
    const technologies = convertDataToTechnologies(
      technologyData,
      this.state.locations
    );

    const techStuff = (
      <React.Fragment>
        <h1>Technologies from We Work Remotely</h1>
        <button onClick={() => this.setState({ showAboutPage: true })}>
          What is this?
        </button>
        <LocationDisplay
          locations={this.state.locations}
          onChange={this.onClickCheckbox.bind(this)}
        />
        <TechnologyDisplay
          technologies={technologies}
          highlightedTechnology={this.state.highlightedTechnology}
          onClick={this.onClickTechnology.bind(this)}
        />
        <Footer />
      </React.Fragment>
    );

    const aboutPage = <AboutPage onClose={this.onCloseAboutPage.bind(this)} />;

    return <div>{this.state.showAboutPage ? aboutPage : techStuff}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
