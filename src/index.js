import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import technologyData from "./data.json";
import technologyThoughts from "./technology-thoughts";

function getClassFromPercentage(percentage) {
  if (percentage >= 50) {
    return "ubiquitous";
  }

  if (percentage >= 30) {
    return "very-popular";
  }

  if (percentage >= 20) {
    return "popular";
  }

  if (percentage >= 10) {
    return "fairly-popular";
  }

  if (percentage >= 5) {
    return "mildly-popular";
  }

  return "unpopular";
}

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
        ((location.count / data.length) * 100).toFixed(2)
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
        ((technology.count / activeData.length) * 100).toFixed(2)
      );

      return technology;
    })
    .sort((a, b) => (a.count > b.count ? -1 : 1));
}

function TechnologyDisplay(props) {
  return (
    <div class="technology-display">
      {props.technologies.map(technology => (
        <div
          className={`technology-display-item ${getClassFromPercentage(
            technology.percentage
          )} ${
            technology.name === props.highlightedTechnology ? "highlighted" : ""
          } clickable`}
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
        </div>
      ))}
    </div>
  );
}

function LocationDisplay(props) {
  return (
    <div>
      <ul>
        {props.locations.map(location => (
          <li key={location.name}>
            <label>
              {location.name} ({location.percentage}%)
              <input
                onChange={() => props.onChange(location.name)}
                type="checkbox"
                checked={location.on}
              />
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

  onToggleAll() {
    const locations = [...this.state.locations];

    if (locations.find(({ on }) => on === false)) {
      locations.forEach(location => (location.on = true));
    } else {
      locations.forEach(location => (location.on = false));
    }

    this.setState({ locations });
  }

  render() {
    const technologies = convertDataToTechnologies(
      technologyData,
      this.state.locations
    );
    return (
      <div>
        <h1>Technologies from We Work Remotely</h1>
        <h3>Last updated August 31, 2019</h3>
        <div>
          <div>
            <button onClick={this.onToggleAll.bind(this)}>Toggle all</button>
            <LocationDisplay
              locations={this.state.locations}
              onChange={this.onClickCheckbox.bind(this)}
            />
          </div>
          <TechnologyDisplay
            technologies={technologies}
            highlightedTechnology={this.state.highlightedTechnology}
            onClick={this.onClickTechnology.bind(this)}
          />
        </div>
        <div>
          <br />
          <a href="https://tomontheinternet.com">tomontheinternet.com</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
