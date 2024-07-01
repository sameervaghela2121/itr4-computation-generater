document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = JSON.parse(e.target.result);
        generateSections(data);
    };

    reader.readAsText(file);
});

function generateSections(data) {
    const container = document.getElementById('sections-container');
    container.innerHTML = '';

    const itr4 = data.ITR.ITR4;
    if (itr4) {
        createSection(container, 'CreationInfo', itr4.CreationInfo);
        createSection(container, 'Form_ITR4', itr4.Form_ITR4);
        createSection(container, 'PersonalInfo', itr4.PersonalInfo);
        createSection(container, 'FilingStatus', itr4.FilingStatus);
        createSection(container, 'IncomeDeductions', itr4.IncomeDeductions);
        createSection(container, 'TaxComputation', itr4.TaxComputation);
        createSection(container, 'TaxPaid', itr4.TaxPaid);
        createSection(container, 'Refund', itr4.Refund);
        createSection(container, 'Schedule80G', itr4.Schedule80G);
        createSection(container, 'Schedule80D', itr4.Schedule80D);
        createSection(container, 'TaxExmpIntIncDtls', itr4.TaxExmpIntIncDtls);
        createSection(container, 'Verification', itr4.Verification);
        createSection(container, 'ScheduleBP', itr4.ScheduleBP);
        createSection(container, 'ScheduleIT', itr4.ScheduleIT);
        createSection(container, 'ScheduleTCS', itr4.ScheduleTCS);
        createSection(container, 'TDSonSalaries', itr4.TDSonSalaries);
        createSection(container, 'TDSonOthThanSals', itr4.TDSonOthThanSals);
        createSection(container, 'ScheduleTDS3Dtls', itr4.ScheduleTDS3Dtls);
    }
}

function createSection(container, sectionTitle, sectionData) {
    const section = document.createElement('div');
    section.className = 'section';

    const title = document.createElement('h2');
    title.textContent = sectionTitle;
    section.appendChild(title);

    if (typeof sectionData === 'object' && sectionData !== null) {
        const table = document.createElement('table');
        table.className = 'data-table';

        for (const key in sectionData) {
            if (sectionData[key] && key !== 'OthSrcNatureDesc') {
                if (typeof sectionData[key] === 'object' && sectionData[key] !== null) {
                    const nestedTable = createNestedTable(key, sectionData[key]);
                    const row = document.createElement('tr');
                    const cell = document.createElement('td');
                    cell.colSpan = 2;
                    cell.appendChild(nestedTable);
                    row.appendChild(cell);
                    table.appendChild(row);
                } else {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');
                    cell1.textContent = key;
                    cell2.textContent = sectionData[key];
                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    table.appendChild(row);
                }
            }
        }

        section.appendChild(table);
    } else {
        const row = document.createElement('div');
        row.textContent = `${sectionTitle}: ${sectionData}`;
        section.appendChild(row);
    }

    container.appendChild(section);
}

function createNestedTable(title, data) {
    const nestedTable = document.createElement('table');
    nestedTable.className = 'nested-table';

    const nestedTitleRow = document.createElement('tr');
    const nestedTitleCell = document.createElement('td');
    nestedTitleCell.colSpan = 2;
    nestedTitleCell.textContent = title;
    nestedTitleRow.appendChild(nestedTitleCell);
    nestedTable.appendChild(nestedTitleRow);

    for (const key in data) {
        if (data[key] && key !== 'OthSrcNatureDesc') {
            if (typeof data[key] === 'object' && data[key] !== null) {
                const deeperNestedTable = createNestedTable(key, data[key]);
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 2;
                cell.appendChild(deeperNestedTable);
                row.appendChild(cell);
                nestedTable.appendChild(row);
            } else {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                cell1.textContent = key;
                cell2.textContent = data[key];
                row.appendChild(cell1);
                row.appendChild(cell2);
                nestedTable.appendChild(row);
            }
        }
    }

    return nestedTable;
}
