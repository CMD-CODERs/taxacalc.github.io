let currentTab = 'monthly';

function switchTab(tab) {
  currentTab = tab;
  document.getElementById('income').value = '';
  document.getElementById('result').innerText = '';
}

function calculateTax() {
  const income = parseFloat(document.getElementById('income').value);
  if (isNaN(income)) {
    alert('Please enter a valid income amount.');
    return;
  }

  // Show loading spinner
  const spinnerContainer = document.createElement('div');
  spinnerContainer.classList.add('spinner-container');
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinnerContainer.appendChild(spinner);
  document.body.appendChild(spinnerContainer);

  // Show progress bar
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = '0';
  const progressInterval = setInterval(() => {
    if (parseFloat(progressBar.style.width) >= 100) {
      clearInterval(progressInterval);
    } else {
      progressBar.style.width = `${parseFloat(progressBar.style.width) + 1}%`;
    }
  }, 15);

  const slabs = currentTab === 'monthly'
    ? [
        { min: 0, max: 1000000, rate: 0.15 },
        { min: 1000001, max: 1500000, rate: 0.2 },
        { min: 1500001, max: 2000000, rate: 0.25 },
        { min: 2000001, max: Infinity, rate: 0.3 }
      ]
    : [
        { min: 0, max: 250000, rate: 0.15 },
        { min: 250001, max: 375000, rate: 0.2 },
        { min: 375001, max: 500000, rate: 0.25 },
        { mmin: 500001, max: Infinity, rate: 0.3 }
      ];

  setTimeout(() => {
    clearInterval(progressInterval); // Stop the progress bar animation

    let tax = 0;
    for (const slab of slabs) {
      if (income > slab.max) {
        tax += (slab.max - slab.min + 1) * slab.rate;
      } else {
        tax += (income - slab.min + 1) * slab.rate;
        break;
      }
    }

    // Hide loading spinner and progress bar
    document.body.removeChild(spinnerContainer);
    progressBar.style.width = '0';

    displayResult(`Tax to be paid (${currentTab}): $${tax.toFixed(2)}`);
  }, 1500); // Simulating a delay for a more noticeable spinner effect
}

function displayResult(result) {
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = result;

  resultElement.style.opacity = 0;
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fadeIn);
    } else {
      opacity += 0.1;
      resultElement.style.opacity = opacity;
    }
  }, 50);
}


//Up to 10 Lakh: 15% Tax 
//10 - 15 Lakh: 20% Tax 
//15 - 20 Lakh: 25% Tax 
//Above 20 Lakh: 30% Tax

//Up to 2.5 Lakh: 3.75% Tax 
//2.5 - 3.75 Lakh: 5% Tax 
//3.75 - 5 Lakh: 6.25% Tax 
//Above 5 Lakh: 7.5% Tax