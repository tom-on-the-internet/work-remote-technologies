import React from "react";

export default props => {
  return (
    <div className="about-page">
      <article>
        <h1>About (WIP)</h1>
        {/* Brief */}
        <p>
          This page shows the most popular technologies from the{" "}
          <strong>programming</strong> category of{" "}
          <a href="https://weworkremotely.com">We Work Remotely</a>.
        </p>

        <p>
          <strong>North America (40%)</strong> means that 40% percent of jobs
          are listed for that location.
        </p>
        <p>
          <strong>JavaScript (50%)</strong> means that 50% of postings list that
          technology somewhere in the post.
        </p>
        <button className="navigation-button" onClick={props.onClose}>
          go back
        </button>
      </article>
    </div>
  );
};
