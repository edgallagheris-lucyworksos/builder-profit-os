function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    if (m === '"') return "&quot;";
    return "&#039;";
  });
}

function isOverdue(date) {
  if (!date) return false;

  const due = new Date(date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  return due < today;
}

function formatCurrency(v) {
  return "£" + Number(v || 0).toFixed(2);
}
