document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadFromStorage();
  renderDashboard();
}

function renderDashboard() {
  const container = document.getElementById("app");
  if (!container) return;

  const totalJobs = jobs.length;
  const totalValue = totalContractValue();
  const totalProfit = totalProfitEstimate();

  container.innerHTML = `
    <div class="hero">
      <div>
        <h1>Builder Profit OS</h1>
        <p class="tagline">Margin protection for builders</p>
      </div>
      <button class="primary" onclick="showAddJob()">+ New Job</button>
    </div>

    <div class="stats-grid">
      <div class="card stat">
        <div class="stat-label">Active Jobs</div>
        <div class="stat-value">${totalJobs}</div>
      </div>

      <div class="card stat">
        <div class="stat-label">Contract Value</div>
        <div class="stat-value">${formatCurrency(totalValue)}</div>
      </div>

      <div class="card stat">
        <div class="stat-label">Estimated Profit</div>
        <div class="stat-value">${formatCurrency(totalProfit)}</div>
      </div>
    </div>

    <div class="section-head">
      <h2>Jobs</h2>
    </div>

    <div id="jobList"></div>
  `;

  renderJobs();
}

function showAddJob() {
  const container = document.getElementById("app");

  container.innerHTML = `
    <div class="hero">
      <div>
        <h1>New Job</h1>
        <p class="tagline">Create a new contract record</p>
      </div>
      <button class="secondary" onclick="renderDashboard()">Back</button>
    </div>

    <div class="card form-card">
      <label>Job name</label>
      <input id="jobName" placeholder="Example: Bathroom refurb">

      <label>Contract value (£)</label>
      <input id="jobValue" placeholder="Example: 8500" type="number">

      <div class="button-row">
        <button class="primary" onclick="addJob()">Save Job</button>
        <button class="secondary" onclick="renderDashboard()">Cancel</button>
      </div>
    </div>
  `;
}

function addJob() {
  const name = document.getElementById("jobName").value.trim();
  const value = parseFloat(document.getElementById("jobValue").value) || 0;

  if (!name) {
    alert("Enter job name");
    return;
  }

  createJob(name, value);
  renderDashboard();
}

function renderJobs() {
  const container = document.getElementById("jobList");
  if (!container) return;

  if (!jobs.length) {
    container.innerHTML = `
      <div class="card empty-state">
        <h3>No jobs yet</h3>
        <p>Add your first job to start tracking value and margin.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = jobs.map(job => {
    const profit = calculateJobProfit(job);
    const margin = calculateJobMargin(job);

    let marginClass = "good";
    if (margin < 20) marginClass = "bad";
    else if (margin < 30) marginClass = "warn";

    return `
      <div class="card job-card">
        <div class="job-top">
          <div>
            <h3>${escapeHtml(job.name)}</h3>
            <p class="muted">Created ${new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
          <div class="margin-pill ${marginClass}">
            ${margin.toFixed(1)}% margin
          </div>
        </div>

        <div class="job-grid">
          <div>
            <span class="label">Contract</span>
            <strong>${formatCurrency(job.value)}</strong>
          </div>
          <div>
            <span class="label">Labour</span>
            <strong>${formatCurrency(job.labour || 0)}</strong>
          </div>
          <div>
            <span class="label">Materials</span>
            <strong>${formatCurrency(job.materials || 0)}</strong>
          </div>
          <div>
            <span class="label">Profit</span>
            <strong>${formatCurrency(profit)}</strong>
          </div>
        </div>

        <div class="button-row">
          <button class="primary" onclick="renderPricingForm(${job.id})">Pricing</button>
          <button class="secondary" onclick="removeJob(${job.id})">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function removeJob(id) {
  if (!confirm("Delete job?")) return;
  deleteJobById(id);
  renderDashboard();
}
