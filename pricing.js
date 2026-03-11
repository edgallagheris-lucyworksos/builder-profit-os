function calculateJobCost(job) {
  return (job.labour || 0) + (job.materials || 0);
}

function calculateJobProfit(job) {
  return (job.value || 0) - calculateJobCost(job);
}

function calculateJobMargin(job) {
  const value = job.value || 0;
  if (!value) return 0;
  return (calculateJobProfit(job) / value) * 100;
}

function updateJobPricing(id, labour, materials) {
  const job = getJobById(id);
  if (!job) return;

  job.labour = Number(labour || 0);
  job.materials = Number(materials || 0);

  saveToStorage();
}

function renderPricingForm(id) {
  const job = getJobById(id);
  const container = document.getElementById("app");

  if (!job || !container) return;

  container.innerHTML = `
    <h2>Pricing: ${escapeHtml(job.name)}</h2>

    <div class="card">
      <label>Labour (£)</label>
      <input id="labourInput" type="number" value="${job.labour || 0}">

      <label>Materials (£)</label>
      <input id="materialsInput" type="number" value="${job.materials || 0}">

      <button class="primary" onclick="savePricingForm(${job.id})">Save Pricing</button>
      <button class="secondary" onclick="renderDashboard()">Back</button>
    </div>
  `;
}

function savePricingForm(id) {
  const labour = parseFloat(document.getElementById("labourInput").value) || 0;
  const materials = parseFloat(document.getElementById("materialsInput").value) || 0;

  updateJobPricing(id, labour, materials);
  renderDashboard();
}
