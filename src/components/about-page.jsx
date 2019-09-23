import React from "react";

export default props => {
  return (
    <div className="about-page">
      <article>
        <h1>
          About - Still a work in progress. If you stumbled upon this, please
          now it'll be updated soon
        </h1>
        <button onClick={props.onClose}>close</button>
        <p>
          This page shows the most popular technologies from the{" "}
          <strong>programming</strong> category of{" "}
          <a href="https://weworkremotely.com">We Work Remotely</a>.
        </p>
        <p>
          The % next to a location is the percentage of jobs that are in that
          location.
        </p>
        <p>
          The % next to a technology is the percentage of jobs that list that
          technology somewhere in the post.
        </p>
      </article>
    </div>
  );
};
