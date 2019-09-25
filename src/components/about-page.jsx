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
        <p>
          This page is open source. If something looks wrong,
          {` `}
          <a href="https://github.com/tom-on-the-internet/work-remote-technologies">
            contribute
          </a>
          .
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
          tests on it to determine if the posting contains a technology. For
          some technologies this is simple (/php/i), for others it is harder
          (/(javascript|js|es5|es6|es7|es2015|es2016|es2017|ecmascript)/i), and
          for some it's nearly impossible (/(Go\s+|golang|Golang|GOLANG)/).
        </p>
        <p>
          This is React app. I'm not experienced with React, so if it could be
          better{` `}
          <a href="https://github.com/tom-on-the-internet/work-remote-technologies">
            open a PR!
          </a>
        </p>

        <h2>Why</h2>
        <p>
          I work remotely in a town that doesn't have developer jobs. I love my
          current job, but I'm aware that if I ever leave this job it will need
          to be for a remote position. So, I wanted a way of seeing what
          technologies were in demand.
        </p>
        <p>
          It's good for me to see that React and Ruby are still in demand,
          because I want to get better at them. It's also good for me to see
          that Elixir is not popular, because that stops me from spending too
          much time playing around with it.
        </p>

        <h2>Thoughts</h2>
        <p>We Work Remotely is North America centric and web centric.</p>
        <p>Ruby on Rails is not dead.</p>
        <p>I thought Laravel would be more popular.</p>
        <p>I expected TypeScript to be more popular than Rust.</p>
        <p>JavaScript is huge!</p>
        <button className="navigation-button" onClick={props.onClose}>
          go back
        </button>
      </article>
    </div>
  );
};
