// For generating random numbers

function randomNumberGenerator(size) {
    randomArr = []
    for(let i = 0; i < size; i++ ) {
        randomArr.push(Math.floor(Math.random() * 20001) - 10000);
    }
    return randomArr;
}

// Algorithms

function bubble(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++){
            if (array[j] > array[j + 1]){
                let t = array[j];
                array[j] = array[j + 1];
                array[j + 1] = t;
            }
        }
    }
    return array;
}

function insertion(array) {
    for (let i = 1; i < array.length; i++) {
        let j = i;
        do {
            if (array[j - 1] > array[j]){
                let t = array[j];
                array[j] = array[j - 1];
                array[j - 1] = t;
                j--;
            }
            else {
                break;
            }
        }while (j > 0);
    }
    return array;
}

function selection(array) {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        let t = array[i];
        array[i] = array[min];
        array[min] = t;

    }
    return array;
}

function merge(array) {
    if (array.length <= 1) {
        return array;
    }
    let m = Math.floor(array.length / 2);
    let l = array.slice(0,m);
    let r = array.slice(m,);
    return mergeLogic(merge(l), merge(r));
}

function mergeLogic(l ,r) {
    let sortedArray = [];
    while (l.length && r.length) {
        if (l[0] < r[0]) {
            sortedArray.push(l.shift());
        }
        else {
            sortedArray.push(r.shift());
        }
    }
    return [...sortedArray, ...l, ...r];
}

function quick(array) {
    let pivot; 
    if (array.length <= 1) {
        return array;
    }
    else {
        pivot = array.pop();
    }
    let min = [];
    let max = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] > pivot) {
            max.push(array[i]);
        }
        else {
            min.push(array[i]);
        }
    }
    return [...quick(min),...[pivot],...quick(max)]
}

function heap(array) {
    let n = array.length;
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(array, n, i);
    }
    for (let i = n - 1 ;i >= 0 ;i--) {
        let t = array[0];
        array[0] = array[i];
        array[i] = t;

        heapify(array, i, 0);
    }
    return array;
}

function heapify(array, n, i) {
    let max = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l] > array[max]) {
        max = l;
    }
    if (r < n && array[r] > array[max]) {
        max = r;
    }
    if (max != i) {
        let t = array[i];
        array[i] = array[max];
        array[max] = t;

        heapify(array, n, max);
    }
}

function quick_3_median(array, left = 0, right = array.length - 1) {
    if (left < right) {
        let pivotIndex = partition(array, left, right);
        quick_3_median(array, left, pivotIndex - 1);
        quick_3_median(array, pivotIndex + 1, right);
    }
    return array;
}

function partition(array, left, high) {
    let pivotIndex = median(array, left, high);
    let pivot = array[pivotIndex];

    let t = array[pivotIndex];
    array[pivotIndex] = array[high];
    array[high] = t;

    let i = left;

    for (let j = left; j < high; j++) {
        if (array[j] < pivot) {
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
            i++;
        }
    }
    let t1 = array[i];
    array[i] = array[high];
    array[high] = t1;

    return i;
}

function median(array, left, right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] < array[left]) {
        let t = array[left];
        array[left] = array[mid];
        array[mid] = t;
    }
    if (array[right] < array[left]) {
        let t = array[left];
        array[left] = array[right];
        array[right] = t;
    }
    if (array[mid] < array[right]) {
        let t = array[right];
        array[right] = array[mid];
        array[mid] = t;
    }
    return right;
}

//Implementing the graphs and connectivity

function runOne() {
        const inputSize = parseInt(document.getElementById("inputSize").value);
        let algorithm = document.getElementById("algorithm").value;
        let arrayCopy = randomNumberGenerator(inputSize);

        const st = performance.now();

        switch (algorithm) {
            case "bubble":
                bubble(arrayCopy);
                break;
            case "insertion":
                insertion(arrayCopy);
                break;
            case "selection":
                selection(arrayCopy);       
                break;
            case "merge":
                merge(arrayCopy);
                break;
            case "quick":
                quick(arrayCopy);
                break;
            case "heap":
                heap(arrayCopy);
                break;
            case "quick_3":
                quick_3_median(arrayCopy);
                break;
        }

        const et = performance.now();

        const timeTaken = et - st;

        updateChart(algorithm, inputSize, timeTaken);
}

function runAll() {
    const inputSize = parseInt(document.getElementById("inputSize").value);
    let results = [];
    let algo = ["bubble", "insertion", "selection", "merge", "quick", "heap", "quick_3"];

    let originalArray = randomNumberGenerator(inputSize);

    algo.forEach((algorithm) => {
        const arrayCopy = originalArray.slice();
        const st = performance.now();
            switch (algorithm) {
                case "bubble":
                    bubble(arrayCopy);
                    break;
                case "insertion":
                    insertion(arrayCopy);
                    break;
                case "selection":
                    selection(arrayCopy);       
                    break;
                case "merge":
                    merge(arrayCopy);
                    break;
                case "quick":
                    quick(arrayCopy);
                    break;
                case "heap":
                    heap(arrayCopy);
                    break;
                case "quick_3":
                    quick_3_median(arrayCopy);
                    break;
            }
        const et = performance.now();
    
        const timeTaken = et - st;

        results.push({algorithm: algorithm, timeTaken: timeTaken, inputSize: inputSize});

    });
    updateChartAll(results);
}

// For custom input array

function runCustom() {
    let text = document.getElementById("customInput").value;
    let inputArray = text.split(",").map(function(item) {
        return parseInt(item, 10);
    })
    let len = inputArray.length;
    let algo = document.getElementById("algorithm").value;

    const st = performance.now();

    let sorted = [];

    switch (algo) {
        case "bubble":
            sorted = bubble(inputArray);
            break;
        case "insertion":
            sorted = insertion(inputArray);
            break;
        case "selection":
            sorted = selection(inputArray);       
            break;
        case "merge":
            sorted = merge(inputArray);
            break;
        case "quick":
            sorted = quick(inputArray);
            break;
        case "heap":
            sorted = heap(inputArray);
            break;
        case "quick_3":
            sorted = quick_3_median(inputArray);
            break;
    }

    const et = performance.now();
    const timeTaken = et - st;

    updateCustomChart(algo, len, timeTaken, sorted);
}

function runCustomAll() {
    let text = document.getElementById("customInput").value;
    let originalArray = text.split(",").map(function(item) {
        return parseInt(item, 10);
    })
    let len = originalArray.length;
    let results = [];
    let sorted = [];
    let algo = ["bubble", "insertion", "selection", "merge", "quick", "heap", "quick_3"];

    algo.forEach((algorithm) => {
        const arrayCopy = originalArray.slice();
        const st = performance.now();
            switch (algorithm) {
                case "bubble":
                    sorted = bubble(arrayCopy);
                    break;
                case "insertion":
                    sorted = insertion(arrayCopy);
                    break;
                case "selection":
                    sorted = selection(arrayCopy);       
                    break;
                case "merge":
                    sorted = merge(arrayCopy);
                    break;
                case "quick":
                    sorted = quick(arrayCopy);
                    break;
                case "heap":
                    sorted = heap(arrayCopy);
                    break;
                case "quick_3":
                    sorted = quick_3_median(arrayCopy);
                    break;
            }
        const et = performance.now();
    
        const timeTaken = et - st;

        results.push({algorithm: algorithm, timeTaken: timeTaken, inputSize: len, sorted: sorted});

    });
    updateChartAllCustom(results);
}

// Making Graph 

let chart; 

function loadInitialChart() {
    const ctx = document.getElementById('algorithmChart').getContext('2d');
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: [], 
            datasets: [{
                label: 'Execution Time (ms)',
                data: [], 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// For Single Algorithm Chart

function updateChart(algorithm, inputSize, timeTaken) {
    
    chart.data.labels.push(algorithm); 
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(timeTaken); 
    });

    const tBody = document.getElementById("runTime").getElementsByTagName("tbody")[0];
    const newRow = tBody.insertRow();
    const algo = newRow.insertCell(0);
    const input = newRow.insertCell(1);
    const rT = newRow.insertCell(2);
    algo.innerHTML = algorithm;
    input.innerHTML = inputSize;
    rT.innerHTML = timeTaken;
    
    chart.update(); 
}

// For Custom input array Chart

function updateCustomChart(algorithm, inputSize, timeTaken, sorted) {
    
    chart.data.labels.push(algorithm); 
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(timeTaken); 
    });

    const tBody = document.getElementById("runCustomTime").getElementsByTagName("tbody")[0];
    const newRow = tBody.insertRow();
    const algo = newRow.insertCell(0);
    const input = newRow.insertCell(1)
    const rT = newRow.insertCell(2);
    const sortArray = newRow.insertCell(3);
    algo.innerHTML = algorithm;
    input.innerHTML = inputSize;
    rT.innerHTML = timeTaken;
    sortArray.innerHTML = sorted;
    
    chart.update(); 
}

// For displaying Output Number in the Compare All Table

let counter = 0;
document.getElementById("compareCustom").addEventListener("click", function() {
    counter++;
})

let counter1 = 0;
document.getElementById("compareAll").addEventListener("click", function() {
    counter1++;
})

function updateChartAllCustom(results) {

    if (!chart.data) {
        chart.data = { labels: [], datasets: [{ data: [] }] };
    } else {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
    });
    }
    loadInitialChart();
    results.forEach(result => {
        chart.data.labels.push(result.algorithm);
        chart.data.datasets[0].data.push(result.timeTaken);
    });
    chart.update();
    
    let tableText = document.getElementById("runCustomAllTime").getElementsByTagName("tbody")[0];
    results.forEach(result => {
        const newRow = tableText.insertRow();
        const num = newRow.insertCell(0);
        const algoText = newRow.insertCell(1);
        const inputText = newRow.insertCell(2);
        const timeTakenText = newRow.insertCell(3);
        const sort = newRow.insertCell(4);
        
        num.textContent = counter;
        algoText.textContent = result.algorithm;
        inputText.textContent = result.inputSize;
        timeTakenText.textContent = result.timeTaken;
        sort.textContent = result.sorted;
        
    });
}

// For Compare all algorithm Chart

function updateChartAll(results) {

    if (!chart.data) {
        chart.data = { labels: [], datasets: [{ data: [] }] };
    } else {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
    });
    }
    loadInitialChart();
    results.forEach(result => {
        chart.data.labels.push(result.algorithm);
        chart.data.datasets[0].data.push(result.timeTaken);
    });
    chart.update();
    
    let tableText = document.getElementById("runAllTime").getElementsByTagName("tbody")[0];
    results.forEach(result => {
        const newRow = tableText.insertRow();
        const num = newRow.insertCell(0);
        const algoText = newRow.insertCell(1);
        const inputText = newRow.insertCell(2);
        const timeTakenText = newRow.insertCell(3);
        
        num.textContent = counter1;
        algoText.textContent = result.algorithm;
        inputText.textContent = result.inputSize;
        timeTakenText.textContent = result.timeTaken;
        
    });
}

function resetGraph() {
    if (chart) {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        chart.update();
    }
}

// For the button click event

document.addEventListener('DOMContentLoaded', function() {
    loadInitialChart();
    document.getElementById("run").addEventListener("click", runOne)
    document.getElementById("customInputBtn").addEventListener("click", runCustom)
    document.getElementById("compareAll").addEventListener("click", runAll)
    document.getElementById("compareCustom").addEventListener("click", runCustomAll)
    document.getElementById("reset").addEventListener("click", resetGraph)
});
