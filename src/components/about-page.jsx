import React from "react";

export default props => {
  return (
    <div className="about-page">
      <article>
        <h2>What</h2>
        <p>
          This page shows the most popular technologies from the{" "}
          <strong>programming</strong> category of{" "}
          <a href="https://weworkremotely.com">We Work Remotely</a>.
        </p>
        <p>
          <strong>North America (40%)</strong> means that 40% percent of jobs
          are listed for North America.
        </p>
        <p>
          <strong>JavaScript (50%)</strong> means that 50% of postings list
          JavaScript somewhere in the post.
        </p>

        <h2>How</h2>
        <p>
          I run a web scraper (Node/Cheerio) on the programming category of we
          work remotely.
        </p>
        <p>
          Most postings include a location in which applicants must work. These
          locations are non-standard (North America, NA, USA and Canada, etc.),
          so I've created a set of categories and filtered them. This leaves us
          with the main location categories. This isn't perfect (I don't account
          for exceptions such as "Europe but not UK"), but it's a good
          approximation.
        </p>
        <p>
          I convert every posting to a text string and run a series or regex
          tests on it to determine it the posting contains a technology. For
          some technologies this is simple (/php/i), for others it is harder
          (/(javascript|js|es5|es6|es7|es2015|es2016|es2017|ecmascript)/i), and
          for some it's nearly impossible (/(Go\s+|golang|Golang|GOLANG)/).
        </p>

        <h2>Why</h2>
        <p>...</p>
        <button className="navigation-button" onClick={props.onClose}>
          go back
        </button>
      </article>
    </div>
  );
};
