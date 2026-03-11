let jobs = [];
let variations = [];
let notes = [];
let receipts = [];
let invoices = [];

let nextJobId = 1;
let nextVarId = 1;
let nextNoteId = 1;
let nextReceiptId = 1;
let nextInvoiceId = 1;

function saveToStorage() {
  localStorage.setItem(
    "builderOS_v3",
    JSON.stringify({
      jobs,
      variations,
      notes,
      receipts,
      invoices,
      nextJobId,
      nextVarId,
      nextNoteId,
      nextReceiptId,
      nextInvoiceId
    })
  );
}

function loadFromStorage() {
  const raw = localStorage.getItem("builderOS_v3");
  if (!raw) return;

  const data = JSON.parse(raw);

  jobs = data.jobs || [];
  variations = data.variations || [];
  notes = data.notes || [];
  receipts = data.receipts || [];
  invoices = data.invoices || [];

  nextJobId = data.nextJobId || 1;
  nextVarId = data.nextVarId || 1;
  nextNoteId = data.nextNoteId || 1;
  nextReceiptId = data.nextReceiptId || 1;
  nextInvoiceId = data.nextInvoiceId || 1;
}
