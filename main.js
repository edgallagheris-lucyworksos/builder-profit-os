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
      <h3>Estimated Profit</h3>
      <p>${formatCurrency(totalProfit)}</p>
    </div>

    <div class="card">
      <button class="primary" onclick="showAddJob()">Add Job</button>
    </div>

    <div id="jobList"></div>
  `;

  renderJobs();
}

function showAddJob() {
  const container = document.getElementById("app");
  if (!container) return;

  container.innerHTML = `
    <h2>New Job</h2>

    <div class="card">
      <label>Job name</label>
      <input id="jobName" placeholder="Job name">

      <label>Contract value (£)</label>
      <input id="jobValue" placeholder="Contract value" type="number">

      <button class="primary" onclick="addJob()">Save Job</button>
      <button class="secondary" onclick="renderDashboard()">Cancel</button>
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
  const container = document.getElementById("job
