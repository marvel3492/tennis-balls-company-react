function showRecords(path, setError, setAllrecs) {
    fetch(`http://localhost:5000/${path}`).then(res => res.json()).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setAllrecs(data.allrecs);
        }
    });
}

function isValidDecimal(value) {
    // Must be a number
    if (isNaN(value)) return false;
    const num = Number(value);
    // Must be >= 0
    if (num < 0) return false;
    // Must be <= 1e308
    if (num > 1e308) return false;
    // Must have at most 2 decimal places
    return /^\d+(\.\d{1,2})?$/.test(value);
}

module.exports = {showRecords, isValidDecimal}