const logger = require("../../config/logger")

const formatStringInDate = (dateString) => {
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) {
        throw new Error('Invalid date format. Expected dd/mm/yyyy.');
    }

    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    return `${year}-${month}-${day}`;
}

const formatDateInString = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date format. Expected yyyy-mm-dd.');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`
}

module.exports = {
    formatStringInDate,
    formatDateInString
}