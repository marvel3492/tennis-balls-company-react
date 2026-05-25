/**
 * @param {unknown} value
 * @returns {value is CartType}
 */
export function isCartType(value) {
    return (
        typeof value === "object" && value !== null &&
            Object.entries(value).every(([k, v]) => !Number.isNaN(Number(k)) && typeof v === "number")
    );
}

/**
 * @param {unknown} value
 * @returns {value is CartDataType}
 */
export function isCart(value) {
    return (
        typeof value === "object" && value !== null &&
        "cartitems" in value && isProductArray(value.cartitems) &&
        "cart" in value && isCartType(value.cart) &&
        "totprice" in value && typeof value.totprice === "number" &&
        "totqty" in value && typeof value.totqty === "number" &&
        "lineItemCosts" in value && Array.isArray(value.lineItemCosts) && value.lineItemCosts.every(v => typeof v === "number")
    );
}

/**
 * @param {unknown} value
 * @returns {value is CatalogDataType}
 */
export function isCatalog(value) {
    return (
        typeof value === "object" && value !== null &&
        "product_id" in value && typeof value.product_id === "number" &&
        "saleprice" in value && typeof value.saleprice === "number" &&
        "productname" in value && typeof value.productname === "string" &&
        "stock" in value && typeof value.stock === "number" &&
        "filename" in value && (typeof value.filename === "string" || value.filename === null) &&
        "description" in value && (typeof value.description === "string" || value.description === null)
    );
}

/**
 * @param {unknown} value
 * @returns {value is CatalogDataType[]}
 */
export function isCatalogArray(value) {
    return Array.isArray(value) && value.every(v => isCatalog(v));
}

/**
 * @param {unknown} value
 * @returns {value is CustomerDataType}
 */
export function isCustomer(value) {
    return (
        typeof value === "object" && value !== null &&
        "customer_id" in value && typeof value.customer_id === "number" &&
        "firstname" in value && typeof value.firstname === "string" &&
        "lastname" in value && typeof value.lastname === "string" &&
        "email" in value && typeof value.email === "string" &&
        "phone" in value && typeof value.phone === "string" &&
        "address" in value && typeof value.address === "string" &&
        "city" in value && typeof value.city === "string" &&
        "state" in value && typeof value.state === "string" &&
        "zip" in value && typeof value.zip === "string" &&
        "username" in value && typeof value.username === "string" &&
        "isadmin" in value && typeof value.isadmin === "number"
    ); 
}

/**
 * @param {unknown} value
 * @returns {value is CustomerDataType[]}
 */
export function isCustomerArray(value) {
    return Array.isArray(value) && value.every(v => isCustomer(v));
}

/**
 * @param {unknown} value
 * @returns {value is ErrorDataType}
 */
export function isError(value) {
    return (
        typeof value === "object" && value !== null &&
        "message" in value && typeof value.message === "string" &&
        "name" in value && typeof value.name === "string" &&
        ("stack" in value == false || typeof value.stack === "string")
    ); 
}

/**
 * @param {unknown} value
 * @returns {value is ImageDataType}
 */
export function isImage(value) {
    return (
        typeof value === "object" && value !== null &&
        "image_id" in value && typeof value.image_id === "number" &&
        "filename" in value && typeof value.filename === "string" &&
        "description" in value && typeof value.description === "string"
    );
}

/**
 * @param {unknown} value
 * @returns {value is ImageDataType[]}
 */
export function isImageArray(value) {
    return Array.isArray(value) && value.every(v => isImage(v));
}

/**
 * @param {unknown} value
 * @returns {value is IndexDataType}
 */
export function isIndex(value) {
    return (
        typeof value === "object" && value !== null &&
        "catalog" in value && isCatalogArray(value.catalog) &&
        "promotions" in value && Array.isArray(value.promotions) && value.promotions.every(v => (
            typeof v === "object" && v !== null &&
            "promotion_id" in v && typeof v.promotion_id === "number" &&
            "filename" in v && typeof v.filename === "string" &&
            "description" in v && typeof v.description === "string"
        ))
    );
}

/**
 * @param {unknown} value
 * @returns {value is LoginDataType}
 */
export function isLogin(value) {
    return (
        typeof value === "object" && value !== null &&
        "success" in value && typeof value.success === "boolean" &&
        "message" in value && typeof value.message === "string"
    );
}

/**
 * @param {unknown} value
 * @returns {value is OrderDetailDataType}
 */
export function isOrderDetail(value) {
    return (
        typeof value === "object" && value !== null &&
        "orderdetail_id" in value && typeof value.orderdetail_id === "number" &&
        "order_id" in value && typeof value.order_id === "number" &&
        "product_id" in value && typeof value.product_id === "number" &&
        "saleprice" in value && typeof value.saleprice === "number" &&
        "qty" in value && typeof value.qty === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is OrderDetailDataType[]}
 */
export function isOrderDetailArray(value) {
    return Array.isArray(value) && value.every(v => isOrderDetail(v));
}

/**
 * @param {unknown} value
 * @returns {value is ProductDataType}
 */
export function isProduct(value) {
    return (
        typeof value === "object" && value !== null &&
        "product_id" in value && typeof value.product_id === "number" &&
        "image_id" in value && (typeof value.image_id === "number" || value.image_id === null) &&
        "productname" in value && typeof value.productname === "string" &&
        "description" in value && typeof value.description === "string" &&
        "saleprice" in value && typeof value.saleprice === "number" &&
        "stock" in value && typeof value.stock === "number" &&
        "homepage" in value && typeof value.homepage === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is ProductDataType[]}
 */
export function isProductArray(value) {
    return Array.isArray(value) && value.every(v => isProduct(v));
}

/**
 * @param {unknown} value
 * @returns {value is PromotionDataType}
 */
export function isPromotion(value) {
    return (
        typeof value === "object" && value !== null &&
        "promotion_id" in value && typeof value.promotion_id === "number" &&
        "image_id" in value && (typeof value.image_id === "number" || value.image_id === null) &&
        "promotitle" in value && typeof value.promotitle === "string" &&
        "description" in value && typeof value.description === "string" &&
        "startdate" in value && typeof value.startdate === "string" &&
        "enddate" in value && typeof value.enddate === "string" &&
        "discountrate" in value && typeof value.discountrate === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is PromotionDataType[]}
 */
export function isPromotionArray(value) {
    return Array.isArray(value) && value.every(v => isPromotion(v));
}

/**
 * @param {unknown} value
 * @returns {value is SaleDataType}
 */
export function isSale(value) {
    return (
        typeof value === "object" && value !== null &&
        "order_id" in value && typeof value.order_id === "number" &&
        "firstname" in value && typeof value.firstname === "string" &&
        "lastname" in value && typeof value.lastname === "string" &&
        "saledate" in value && typeof value.saledate === "string" &&
        "productname" in value && typeof value.productname === "string" &&
        "saleprice" in value && typeof value.saleprice === "number" &&
        "qty" in value && typeof value.qty === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is SaleDataType[]}
 */
export function isSaleArray(value) {
    return Array.isArray(value) && value.every(v => isSale(v));
}

/**
 * @param {unknown} value
 * @returns {value is SaleOrderDataType}
 */
export function isSaleOrder(value) {
    return (
        typeof value === "object" && value !== null &&
        "order_id" in value && typeof value.order_id === "number" &&
        "customer_id" in value && typeof value.customer_id === "number" &&
        "saledate" in value && typeof value.saledate === "string" &&
        "customernotes" in value && typeof value.customernotes === "string" &&
        "paymentstatus" in value && typeof value.paymentstatus === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is SaleOrderDataType[]}
 */
export function isSaleOrderArray(value) {
    return Array.isArray(value) && value.every(v => isSaleOrder(v));
}

/**
 * @param {unknown} value
 * @returns {value is SearchDataType}
 */
export function isSearch(value) {
    return typeof value === "object" && value !== null && isCatalogArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is UserDataType}
 */
export function isUser(value) {
    return (
        typeof value === "object" && value !== null &&
        "customer_id" in value && typeof value.customer_id === "number" &&
        "custname" in value && typeof value.custname === "string" &&
        "isadmin" in value && typeof value.isadmin === "number"
    );
}

/**
 * @param {unknown} value
 * @returns {value is UserDataType[]}
 */
export function isUserArray(value) {
    return Array.isArray(value) && value.every(v => isUser(v));
}