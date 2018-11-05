const getDailyReportsCacheVariables = (first, skip) => {
  const arg =
    'userReports' +
    '({' +
    '"first":' +
    first +
    ',' +
    '"orderBy":"createdAt_DESC"' +
    ',' +
    '"skip":' +
    skip +
    '})';

  return arg;
};

export default getDailyReportsCacheVariables;
