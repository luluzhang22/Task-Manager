const convertTimestampToDatetimeArray = (timestamp) => {
    const date = new Date(timestamp);
    return date.toString().split(" ");
};

export const convertTimestampToTime = (timestamp) => {
    return convertTimestampToDatetimeArray(timestamp)[4].substring(0, 5); //"08:30"
};

export const convertTimestampToDateNumber = (timestamp) => {
    const date = new Date(timestamp);
        const year = date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
};

export const convertTimestampToDateString = (timestamp) => { // Feb 01 2018
    const dateArray = convertTimestampToDatetimeArray(timestamp);
    return [dateArray[1], dateArray[2], dateArray[3]].join(' ');
};

export const getDefaultDueDate = () => {
    return convertTimestampToDateNumber(Date.now() + 1000 * 60 * 60 * 24 * 7); // One week after now
};

export const generateTimestamp = (date, time) => { // "2018-01-30" "08:30"
    const dateArr = date.split("-");
    const timeArr = time.split(":");
    const dateObj = new Date(dateArr[0], parseInt(dateArr[1], 10) - 1, dateArr[2],timeArr[0], timeArr[1]);
    return dateObj.getTime(); //timestamp
};
