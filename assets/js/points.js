async function getPatrols() {
    const response = await fetch('https://troop.brandon3.me/api/v1/patrols/fetch');
    const patrols = await response.json();
    return patrols;
}

async function setupPoints(table) {
    const patrols = await getPatrols();
    const points = patrols.map(patrol => patrol.points);
    const totalPoints = points.reduce((a, b) => a + b, 0);

    for (const patrol of patrols) {
        const row = table.insertRow();
        row.insertCell().textContent = patrol.name;
        row.insertCell().textContent = patrol.points + ' points';
    }

    const p = document.createElement('p');
    p.textContent = `Total Points: ${totalPoints}`;
    table.parentElement.appendChild(p);
    
}

setupPoints(document.getElementById('points-table'))