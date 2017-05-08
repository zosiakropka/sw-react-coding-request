const getUniqueId = () => {
  const timestamp = (new Date())
    .getTime()
    .toString();
  const random = Math.random()
    .toString(16)
    .slice(2);

  return timestamp + random;
};

export default getUniqueId;
