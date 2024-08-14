export const formattedTime = (time) => {
  return new Date(time).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
