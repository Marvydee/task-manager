function todayStr() {
  return new Date().toISOString().split("T")[0];
}

// Formats a date string like "2025-06-01" into "Jun 1"
function formatDate(str) {
  if (!str) return null;
  const d = new Date(str + "T00:00:00"); // force local time, not UTC
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Returns true if the task is past its due date and not done
function isOverdue(task) {
  if (!task.dueDate || task.done) return false;
  return (
    new Date(task.dueDate + "T00:00:00") < new Date(new Date().toDateString())
  );
}

export { todayStr, formatDate, isOverdue };
