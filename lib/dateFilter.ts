export const isToday = (date: any) => {
  const d = new Date(date?.toDate ? date.toDate() : date);
  const now = new Date();

  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

export const isThisWeek = (date: any) => {
  const d = new Date(date?.toDate ? date.toDate() : date);
  const now = new Date();

  const diff = now.getTime() - d.getTime();
  return diff <= 7 * 24 * 60 * 60 * 1000;
};

export const isThisMonth = (date: any) => {
  const d = new Date(date?.toDate ? date.toDate() : date);
  const now = new Date();

  return (
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};