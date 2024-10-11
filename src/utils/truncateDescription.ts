export const truncateDescription = (description: string) => {
  return description.length > 50
    ? description.slice(0, 50) + "..."
    : description;
};
