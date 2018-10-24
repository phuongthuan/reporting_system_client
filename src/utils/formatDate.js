// In backend, Prisma saves DateTime based on UTC
// Put DateTime Prisma returned into this function to format DateTime into Vietnamese Time
const formatDate = date => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
};

export default formatDate;
