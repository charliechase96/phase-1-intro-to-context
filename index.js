// Your code here
function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
};

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
};

function createDateStamp(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-4))}
};

function createTimeInEvent(record, dateStamp) {
    record.timeInEvents.push(createDateStamp("TimeIn", dateStamp));
    return record;
};

function createTimeOutEvent(record, dateStamp) {
    record.timeOutEvents.push(createDateStamp("TimeOut", dateStamp));
    return record;
};

function hoursWorkedOnDate(record, justDate) {
    const timeIn = record.timeInEvents.find(element => element.date === justDate).hour;
    const timeOut = record.timeOutEvents.find(element => element.date === justDate).hour;

    return (timeOut - timeIn) / 100;
};

function wagesEarnedOnDate(record, justDate) {
    const wage = record.payPerHour;
    const hoursWorked = hoursWorkedOnDate(record, justDate);
    const totalWages = wage * hoursWorked;

    return totalWages;
};

function allWagesFor(record) {
    const allWages = record.timeInEvents.map((day) => {return wagesEarnedOnDate(record, day.date)});
    return allWages.reduce((acc, cv) => acc + cv);
};

function calculatePayroll(employeeArray) {
    const allPay = (employeeArray.map((employee) => {return allWagesFor(employee)}));
    return allPay.reduce((acc, cv) => acc + cv);
}