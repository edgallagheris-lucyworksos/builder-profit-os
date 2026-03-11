function createJob(name, value) {

  const job = {
    id: nextJobId++,
    name: name,
    value: value || 0,
    labour: 0,
    materials: 0,
    variations: 0,
    invoices: 0,
    createdAt: new Date().toISOString()
  };

  jobs.push(job);

  saveToStorage();

  return job;
}

function deleteJobById(id) {

  const index = jobs.findIndex(j => j.id === id);

  if (index === -1) return;

  jobs.splice(index, 1);

  saveToStorage();
}

function getJobById(id) {

  return jobs.find(j => j.id === id);
}

function totalContractValue() {

  return jobs.reduce((t, j) => t + (j.value || 0), 0);
}

function totalProfitEstimate() {

  return jobs.reduce((t, j) => {

    const cost = (j.labour || 0) + (j.materials || 0);

    return t + ((j.value || 0) - cost);

  }, 0);
}
