document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadFromStorage();
  renderDashboard();
}

/* ---------- DASHBOARD ---------- */

function renderDashboard() {
  const container = document.getElementById("app");

  if (!container) return;

  const totalJobs = jobs.length;

  const totalValue = jobs.reduce((t, j) => t + (j.value || 0), 0);

  container.innerHTML = `
    <h2>Builder Profit OS</h2>

    <div class="card">
      <h3>Jobs</h3>
      <p>${totalJobs} active</p>
    </div>

    <div class="card">
      <h3>Contract Value</h3>
      <p>${formatCurrency(totalValue)}</p>
    </div>

    <div class="card">
      <button onclick="showAddJob()">Add Job</button>
    </div>

    <div id="jobList"></div>
  `;

  renderJobs();
}

/* ---------- ADD JOB ---------- */

function showAddJob() {
  const container = document.getElementById("app");

  container.innerHTML = `
    <h2>New Job</h2>

    <input id="jobName" placeholder="Job name">
    <input id="jobValue" placeholder="Contract value" type="number">

    <button onclick="addJob()">Save Job</button>
    <button onclick="renderDashboard()">Cancel</button>
  `;
}

function addJob() {
  const name = document.getElementById("jobName").value.trim();
  const value = parseFloat(document.getElementById("jobValue").value);

  if (!name) {
    alert("Enter job name");
    return;
  }

  jobs.push({
    id: nextJobId++,
    name,
    value,
    createdAt: new Date().toISOString()
  });

  saveToStorage();
  renderDashboard();
}

/* ---------- JOB LIST ---------- */

function renderJobs() {
  const container = document.getElementById("jobList");

  if (!container) return;

  container.innerHTML = jobs
    .map(
      (job, i) => `
    <div class="job-row">
      <span>${escapeHtml(job.name)}</span>
      <span>${formatCurrency(job.value)}</span>
      <button onclick="deleteJob(${i})">Delete</button>
    </div>
  `
    )
    .join("");
}

function deleteJob(index) {
  if (!confirm("Delete job?")) return;

  jobs.splice(index, 1);

  saveToStorage();
  renderDashboard();
}
