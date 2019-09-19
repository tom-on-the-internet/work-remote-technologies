export default data => {
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
};
