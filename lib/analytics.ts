export const getPercentage = (tasks: any[]) => {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length || 1;
  return Math.round((completed / total) * 100);
};