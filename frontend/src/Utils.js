import { useEffect, useState } from "react";
import { isError } from "shared/Data";

/**
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate 
 */
export function addRecord(path, data, setResponse, navigate) {
    fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => hasError(data) ? setResponse(data) : navigate(`/${path}`), setResponse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
}

/**
 * @param {Readonly<MouseAnchorEvent>} mouseAnchorEvent
 * @param {Readonly<string>} path 
 * @param {Readonly<number>} recordid 
 * @param {SetResponse} setResponse
 */
export function deleteRecord(mouseAnchorEvent, path, recordid, setResponse) {
    mouseAnchorEvent.preventDefault(); // prevent page reload
    fetchDataWithCatch(`http://localhost:5000/${path}/delete`, (data) => hasError(data) ? setResponse(data) : getAllRecords(path, setResponse), setResponse, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recordid })
    });
}

/**
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate
 */
export function editRecord(path, data, setResponse, navigate) {
    fetchDataWithCatch(`http://localhost:5000/${path}/save`, (data) => hasError(data) ? setResponse(data) : navigate(`/${path}`), setResponse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });
}

/**
 * @param {Readonly<string>} input 
 * @param {(data: unknown) => void} thenClause 
 * @param {SetResponse} setResponse 
 * @param {Readonly<RequestInit>} [init={}]
 */
export function fetchDataWithCatch(input, thenClause, setResponse, init = {}) {
    fetch(input, init).then(res => res.json()).then(thenClause).catch(err => {
        setResponse(err);
    });
}

/**
 * @param {Readonly<string>} input 
 * @param {() => void} thenClause 
 * @param {SetResponse} setResponse 
 * @param {Readonly<RequestInit>} [init] 
 */
export function fetchWithCatch(input, thenClause, setResponse, init) {
    fetch(input, init).then(thenClause).catch(err => {
        setResponse(err);
    });
}

/**
 * @param {Readonly<string>} path 
 * @param {SetResponse} setResponse 
 */
export function getAllRecords(path, setResponse) {
    fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => setResponse(data), setResponse, { credentials: "include" });
}

/**
 * @param {SubmitHandler} submitHandler
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate 
 */
export function handleDefaultSubmit(submitHandler, path, data, setResponse, navigate) {
    return (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        submitHandler(path, data, setResponse, navigate);
    };
}

/**
 * @param {Readonly<ReturnType<typeof useOrderDetailState>[0]>} record 
 * @param {SubmitHandler} submitHandler
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate 
 */
export function handleOrderDetailSubmit(record, submitHandler, path, data, setResponse, navigate) {
    return (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(record.saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
        } else {
            submitHandler(path, data, setResponse, navigate);
        }
    };
}

/**
 * @param {Readonly<ReturnType<typeof useProductState>[0]>} record 
 * @param {SubmitHandler} submitHandler
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate 
 */
export function handleProductSubmit(record, submitHandler, path, data, setResponse, navigate) {
    return (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(record.saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
        } else {
            submitHandler(path, data, setResponse, navigate);
        }
    };
}

/**
 * @param {Readonly<ReturnType<typeof usePromotionState>[0]>} record 
 * @param {SubmitHandler} submitHandler
 * @param {Readonly<string>} path 
 * @param {Readonly<object>} data 
 * @param {SetResponse} setResponse 
 * @param {NavigateFunction} navigate 
 */
export function handlePromotionSubmit(record, submitHandler, path, data, setResponse, navigate) {
    return (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(record.discountrate)) {
            alert("Discount rate must be a finite non-negative decimal with up to two decimals");
        } else {
            submitHandler(path, data, setResponse, navigate);
        }
    };
}

/**
 * @param {unknown} response
 */
export function hasError(response) {
    return response instanceof Error || isError(response);
}

/**
 * @param {string} value
 */
export function isValidDecimal(value) {
    // Must be a number
    if (isNaN(parseFloat(value))) return false;
    const num = Number(value);
    // Must be >= 0
    if (num < 0) return false;
    // Must be <= 1e308
    if (num > 1e308) return false;
    // Must have at most 2 decimal places
    return /^\d+(\.\d{1,2})?$/.test(value);
}

/**
 * @template {Readonly<object>} T
 * @param {SetRecord<T>} setRecord
 */
export const onImageChange = (setRecord) => {
    return (/** @type {ChangeInputEvent} */ e) => {
        if (e.target.files && e.target.files[0]) {
            updateRecord(setRecord, "image", e.target.files[0]);
        } else {
            updateRecord(setRecord, "image", null);
        }
    }
}

/**
 * @template {Readonly<object>} T
 * @param {SetRecord<T>} setRecord
 * @param {Readonly<string>} key 
 * @param {unknown} value 
 */
export function updateRecord(setRecord, key, value) {
    setRecord(prev => ({
        ...prev,
        [key]: value
    }));
}

export function useCustomerState() {
    return useState({
        customer_id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        username: "",
        password: "",
        isadmin: ""
    });
}

/**
 * @param {Readonly<string>} path 
 * @param {SetResponse} setResponse 
 */
export function useEffectAllRecords(path, setResponse) {
    useEffect(() => getAllRecords(path, setResponse), [path, setResponse]);
}

/**
 * @param {Readonly<string>} url 
 * @param {SetResponse} setResponse
 */
export function useEffectDefault(url, setResponse) {
    useEffect(() => fetchDataWithCatch(url, (data) => setResponse(data), setResponse), [url, setResponse]);
}

/**
 * @param {Readonly<string>} path 
 * @param {SetResponse} setResponse
 * @param {(data: unknown) => void} thenClauseCallback
 * @param {Readonly<string>} [id] 
 */
export function useEffectEditRecord(path, setResponse, thenClauseCallback, id) {
    useEffect(() => {
        if (!id) {
            setResponse(new Error("Id is not defined"));
        } else {
            fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, thenClauseCallback, setResponse, { credentials: "include" });
        }
    }, [path, setResponse, thenClauseCallback, id]);
}

/**
 * @param {Readonly<string>} path 
 * @param {SetResponse} setResponse 
 * @param {Readonly<string>} [id]
 */
export function useEffectOneRecord(path, setResponse, id) {
    useEffect(() => {
        if (!id) {
            setResponse(new Error("Id is not defined"));
        } else {
            fetchDataWithCatch(`http://localhost:5000/${path}/${id}/show`, (data) => setResponse(data), setResponse, { credentials: "include" });
        }
    }, [path, setResponse, id]);
}

export function useImageState() {
    return useState({
        image_id: "",
        image: /** @type OptionalType<File> */ (null),
        filename: "",
        description: ""
    });
}

export function useOrderDetailState() {
    return useState({
        orderdetail_id: "",
        order_id: "",
        product_id: "",
        saleprice: "",
        qty: ""
    });
}

export function useProductState() {
    return useState({
        product_id: "",
        productname: "",
        image_id: "",
        description: "",
        saleprice: "",
        homepage: false,
        stock: "",
    });
}

export function usePromotionState() {
    return useState({
        promotion_id: "",
        image_id: "",
        promotitle: "",
        description: "",
        startdate: "",
        enddate: "",
        discountrate: "",
    });
}

export function useResponseState() {
    return useState(/** @type {unknown} */ (null));
}

export function useSaleOrderState() {
    return useState({
        order_id: "",
        customer_id: "",
        saledate: "",
        customernotes: "",
        paymentstatus: ""
    });
}