import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import technologyData from "./data.json";
import technologyThoughts from "./technology-thoughts";

function convertDataToLocations(data) {
  return data
    .reduce((acc, cur) => {
      const existingEntry = acc.find(item => item.name === cur.location);

      if (existingEntry) {
        existingEntry.count++;
        return acc;
      }

      const newEntry = { name: cur.location, on: true, count: 1 };
      acc.push(newEntry);

      return acc;
    }, [])
    .map(location => {
      location.percentage = Number(
        ((location.count / data.length) * 100).toFixed(0)
      );

      return location;
    })
    .filter(location => location.count > 1)
    .sort((a, b) => (a.count > b.count ? -1 : 1));
}

function convertDataToTechnologies(data, locations) {
  const activeLocations = locations.filter(({ on }) => on);
  const activeData = data.filter(({ location }) =>
    activeLocations.find(activeLocation => activeLocation.name === location)
  );

  const technologies = activeData.reduce(
    (acc, cur) => acc.concat(cur.technologies),
    []
  );
  return technologies
    .reduce((acc, cur) => {
      const existingEntry = acc.find(item => item.name === cur);

      if (existingEntry) {
        existingEntry.count++;
        return acc;
      }

      const newEntry = { name: cur, count: 1 };
      acc.push(newEntry);

      return acc;
    }, [])
    .map(technology => {
      technology.percentage = Number(
        ((technology.count / activeData.length) * 100).toFixed(0)
      );

      return technology;
    })
    .sort((a, b) => (a.count > b.count ? -1 : 1));
}

function TechnologyDisplay(props) {
  return (
    <div class="technology-display">
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
}

function LocationDisplay(props) {
  return (
    <div class="location-display">
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
}

function HighlightedTechnology(props) {
  return (
    <div className="highlighted-technology">
      <div className="description">
        {props.technologyDescription || (
          <div>
            No description for this technology.
            {` `}
            <a href=" https://github.com/tom-on-the-internet/work-remote-technologies/blob/master/src/technology-thoughts.js">
              Make one!
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: convertDataToLocations(technologyData),
      highlightedTechnology: "JavaScript"
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

  render() {
    const technologies = convertDataToTechnologies(
      technologyData,
      this.state.locations
    );
    return (
      <div>
        <h1>Technologies from We Work Remotely</h1>
        <LocationDisplay
          locations={this.state.locations}
          onChange={this.onClickCheckbox.bind(this)}
        />
        <TechnologyDisplay
          technologies={technologies}
          highlightedTechnology={this.state.highlightedTechnology}
          onClick={this.onClickTechnology.bind(this)}
        />
        <footer>
          <div>Last updated August 31, 2019</div>
          <a href="https://tomontheinternet.com">tomontheinternet.com</a>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
