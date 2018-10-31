import { itemsAmount } from 'containers/DailyReportPage/constants';

const updateDailyReportCacheVariables = count => {
  const lastPage = Math.ceil((count + 1) / itemsAmount);
  const skip = (lastPage - 1) * itemsAmount;
  const first = itemsAmount;

  return {
    first,
    skip
  };
};

export { updateDailyReportCacheVariables };
