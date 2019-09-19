export default (data, locations) => {
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
};
