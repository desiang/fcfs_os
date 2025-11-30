// FCFS (First Come First Served) CPU Scheduling Algorithm
// This script simulates FCFS scheduling for a list of processes.
// Each process has an ID, arrival time, and burst time.
// It calculates waiting time, turnaround time, and averages.

class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.completionTime = 0;
        this.turnaroundTime = 0;
        this.waitingTime = 0;
    }
}

function fcfsScheduling(processes) {
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let totalBurstTime = 0;
    let ganttChart = [];

    for (let process of processes) {
        // If CPU is idle, wait for the process to arrive
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }
        // Calculate completion time
        process.completionTime = currentTime + process.burstTime;
        // Calculate turnaround time (completion time - arrival time)
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        // Calculate waiting time (turnaround time - burst time)
        process.waitingTime = process.turnaroundTime - process.burstTime;
        // Update totals
        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;
        totalBurstTime += process.burstTime;

        // Add to Gantt chart
        ganttChart.push({
            id: process.id,
            start: currentTime,
            end: process.completionTime
        });

        // Move current time to completion time
        currentTime = process.completionTime;
    }

    // Calculate averages
    const n = processes.length;
    const avgWaitingTime = totalWaitingTime / n;
    const avgTurnaroundTime = totalTurnaroundTime / n;
    const totalTime = Math.max(...ganttChart.map(item => item.end));
    const cpuUtilization = (totalBurstTime / totalTime) * 100;

    return {
        processes,
        avgWaitingTime,
        avgTurnaroundTime,
        cpuUtilization,
        ganttChart,
        totalTime
    };
}

// Example usage with multiple test cases
const testCases = [
    {
        name: "Original Test Case",
        processes: [
            new Process(1, 0, 4),
            new Process(2, 1, 3),
            new Process(3, 2, 1),
            new Process(4, 3, 2)
        ]
    },
    {
        name: "All Processes Arrive at Time 0",
        processes: [
            new Process(1, 0, 5),
            new Process(2, 0, 3),
            new Process(3, 0, 8),
            new Process(4, 0, 6)
        ]
    },
    {
        name: "Processes with Same Arrival Time",
        processes: [
            new Process(1, 2, 4),
            new Process(2, 2, 3),
            new Process(3, 2, 1),
            new Process(4, 2, 2)
        ]
    },
    {
        name: "More Processes",
        processes: [
            new Process(1, 0, 2),
            new Process(2, 1, 4),
            new Process(3, 3, 6),
            new Process(4, 5, 3),
            new Process(5, 6, 1),
            new Process(6, 7, 2)
        ]
    },
    {
        name: "Single Process",
        processes: [
            new Process(1, 0, 5)
        ]
    }
];

testCases.forEach(testCase => {
    console.log(`\n${testCase.name}`);
    console.log("=".repeat(testCase.name.length));
    const result = fcfsScheduling(testCase.processes);
    console.log("Process ID | Arrival Time | Burst Time | Completion Time | Turnaround Time | Waiting Time");
    console.log("-----------|--------------|------------|-----------------|-----------------|-------------");
    for (let process of result.processes) {
        console.log(`${process.id.toString().padEnd(10)} | ${process.arrivalTime.toString().padEnd(12)} | ${process.burstTime.toString().padEnd(10)} | ${process.completionTime.toString().padEnd(15)} | ${process.turnaroundTime.toString().padEnd(15)} | ${process.waitingTime}`);
    }
    console.log(`\nAverage Waiting Time: ${result.avgWaitingTime.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${result.avgTurnaroundTime.toFixed(2)}`);
});
