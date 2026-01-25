export function showRecords(path, setError, setAllrecs) {
    fetch(`http://localhost:5000/${path}`, {
        credentials: "include"
    }).then(res => res.json()).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setAllrecs(data.allrecs);
        }
    });
}

export function deleteRecord(path, recordid, setError, setAllrecs) {
    fetch(`http://localhost:5000/${path}/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({recordid})
    }).then(res => res.json()).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            showRecords(path, setError, setAllrecs);
        }
    });
}

export function fetchShowRecord(path, id, setError, setOnerec) {
    fetch(`http://localhost:5000/${path}/${id}/show`, {
        credentials: "include"
    }).then(res => res.json()).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setOnerec(data.onerec);
        }
    });
}

export function isValidDecimal(value) {
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