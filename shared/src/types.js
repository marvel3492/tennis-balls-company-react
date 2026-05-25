/**
 * @typedef {Object} CartDataType
 * @property {ProductDataType[]} cartitems
 * @property {CartType} cart
 * @property {number} totprice
 * @property {number} totqty
 * @property {number[]} lineItemCosts
 */

/**
 * @typedef {Record<number, number>} CartType
 */

/**
 * @typedef {Object} CatalogDataType
 * @property {number} product_id
 * @property {string} productname
 * @property {number} saleprice
 * @property {number} stock
 * @property {OptionalType<string>} filename
 * @property {OptionalType<string>} description
 */

/**
 * @typedef {Object} CustomerDataType
 * @property {number} customer_id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} zip
 * @property {string} username
 * @property {number} isadmin
 */

/**
 * @typedef {Object} ErrorDataType
 * @property {string} message
 * @property {string} name
 * @property {string} stack
 */

/**
 * @typedef {Object} ImageDataType
 * @property {number} image_id
 * @property {string} filename
 * @property {string} description
 */

/**
 * @typedef {Object} IndexDataType
 * @property {CatalogDataType[]} catalog
 * @property {{promotion_id: number, filename: string, description: string}[]} promotions
 */

/**
 * @typedef {Object} LoginDataType
 * @property {boolean} success
 * @property {string} message
 */

/**
 * @template T
 * @typedef {T | null} OptionalType
 */

/**
 * @typedef {Object} OrderDetailDataType
 * @property {number} orderdetail_id
 * @property {number} order_id
 * @property {number} product_id
 * @property {number} saleprice
 * @property {number} qty
 */

/**
 * @typedef {Object} ProductDataType
 * @property {number} product_id
 * @property {OptionalType<number>} image_id
 * @property {string} productname
 * @property {string} description
 * @property {number} saleprice
 * @property {number} stock
 * @property {number} homepage
 */

/**
 * @typedef {Object} PromotionDataType
 * @property {number} promotion_id
 * @property {OptionalType<number>} image_id
 * @property {string} promotitle
 * @property {string} description
 * @property {string} startdate
 * @property {string} enddate
 * @property {number} discountrate
 */

/**
 * @typedef {Object} SaleDataType
 * @property {number} order_id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} saledate
 * @property {string} productname
 * @property {number} saleprice
 * @property {number} qty
 */

/**
 * @typedef {Object} SaleOrderDataType
 * @property {number} order_id
 * @property {number} customer_id
 * @property {string} saledate
 * @property {string} customernotes
 * @property {number} paymentstatus
 */

/**
 * @typedef {CatalogDataType[]} SearchDataType
 */

/**
 * @typedef {Object} UserDataType
 * @property {number} customer_id
 * @property {string} custname
 * @property {number} isadmin
 */