const stateRainfallData = {
    "Alabama": 1400,
    "Alaska": 460,
    "Arizona": 330,
    "Arkansas": 1300,
    "California": 580,
    "Colorado": 430,
    "Connecticut": 1200,
    "Delaware": 1170,
    "Florida": 1360,
    "Georgia": 1210,
    "Hawaii": 1710,
    "Idaho": 560,
    "Illinois": 990,
    "Indiana": 1040,
    "Iowa": 910,
    "Kansas": 790,
    "Kentucky": 1190,
    "Louisiana": 1570,
    "Maine": 1100,
    "Maryland": 1080,
    "Massachusetts": 1140,
    "Michigan": 840,
    "Minnesota": 660,
    "Mississippi": 1400,
    "Missouri": 1060,
    "Montana": 380,
    "Nebraska": 600,
    "Nevada": 240,
    "New Hampshire": 1150,
    "New Jersey": 1170,
    "New Mexico": 360,
    "New York": 1050,
    "North Carolina": 1200,
    "North Dakota": 460,
    "Ohio": 1000,
    "Oklahoma": 910,
    "Oregon": 690,
    "Pennsylvania": 1060,
    "Rhode Island": 1200,
    "South Carolina": 1240,
    "South Dakota": 510,
    "Tennessee": 1310,
    "Texas": 760,
    "Utah": 330,
    "Vermont": 1090,
    "Virginia": 1090,
    "Washington": 970,
    "West Virginia": 1160,
    "Wisconsin": 790,
    "Wyoming": 330
};

function populateStates() {
    const stateSelect = document.getElementById('state');
    for (const state in stateRainfallData) {
        const option = document.createElement('option');
        option.value = state;
        option.text = state;
        stateSelect.add(option);
    }
}

window.onload = populateStates;

function updateRainfall() {
    const stateSelect = document.getElementById('state');
    const selectedState = stateSelect.value;
    const rainfallInput = document.getElementById('rainfall');

    if (selectedState && stateRainfallData[selectedState]) {
        rainfallInput.value = stateRainfallData[selectedState];
        rainfallInput.readOnly = true;
    } else {
        rainfallInput.value = '';
        rainfallInput.readOnly = false;
    }
}

function calculateResults() {
    // Get the input values
    const area = parseFloat(document.getElementById('area').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const coefficient = parseFloat(document.getElementById('coefficient').value);
    const efficiency = parseFloat(document.getElementById('efficiency').value);
    const occupants = parseFloat(document.getElementById('occupants').value);
    const dailyUsage = parseFloat(document.getElementById('dailyUsage').value);

    // Input validation
    if (isNaN(area) || isNaN(rainfall) || isNaN(coefficient) || isNaN(efficiency) || isNaN(occupants) || isNaN(dailyUsage)) {
        alert('Please fill in all fields with valid numbers.');
        return;
    }

    // Convert rainfall from mm to meters
    const rainfallInMeters = rainfall / 1000;

    // Calculate total harvested water volume (in cubic meters)
    const totalHarvestedVolume = area * rainfallInMeters * coefficient * efficiency;

    // Convert total harvested water volume to liters
    const totalHarvestedVolumeLiters = totalHarvestedVolume * 1000;

    // Calculate the required cistern size (for one year)
    const requiredCisternSize = occupants * dailyUsage * 365;

    // Calculate how many occupants can be supported by the harvested water
    const waterSupportForOccupants = totalHarvestedVolumeLiters / (dailyUsage * 365);

    // Display results
    document.getElementById('harvestedVolume').innerText = `Total Harvested Water: ${totalHarvestedVolumeLiters.toFixed(2)} liters per year`;
    document.getElementById('cisternSize').innerText = `Required Cistern Size: ${requiredCisternSize.toFixed(2)} liters`;
    document.getElementById('occupantSupport').innerText = `This system can support approximately ${waterSupportForOccupants.toFixed(2)} occupants per year`;

    // Show the results section
    document.getElementById('result').style.display = 'block';
}
