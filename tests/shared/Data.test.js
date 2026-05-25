import { isCartType, isCart, isCatalog, isCatalogArray, isCustomer, isCustomerArray, isError, isImage, isImageArray, isIndex, isLogin, isOrderDetail, isOrderDetailArray, isProduct, isProductArray, isPromotion, isPromotionArray, isSale, isSaleArray, isSaleOrder, isSaleOrderArray, isSearch, isUser, isUserArray } from "../../shared/src/Data";

test("isCartType", () => {
    expect(isCartType(0)).toBe(false);
    expect(isCartType(null)).toBe(false);
    expect(isCartType({})).toBe(true);
    expect(isCartType({ "1": null })).toBe(false);
    expect(isCartType({ "a": 1 })).toBe(false);
    expect(isCartType({ "1": 1 })).toBe(true);
});
test("isCart", () => {
    expect(isCart(0)).toBe(false);
    expect(isCart(null)).toBe(false);
    expect(isCart({})).toBe(false);
    expect(isCart({
        cartitems: [],
        cart: { "1": 1 },
        totprice: 0,
        totqty: 0,
        lineItemCosts: []
    })).toBe(true);
});

test("isCatalog", () => {
    expect(isCatalog(0)).toBe(false);
    expect(isCatalog(null)).toBe(false);
    expect(isCatalog({})).toBe(false);
    expect(isCatalog({
        product_id: 1,
        productname: "Test Product",
        saleprice: 9.99,
        stock: 100,
        filename: null,
        description: null
    })).toBe(true);
});
test("isCatalogArray", () => {
    expect(isCatalogArray(0)).toBe(false);
    expect(isCatalogArray(null)).toBe(false);
    expect(isCatalogArray([])).toBe(true);
    expect(isCatalogArray([null])).toBe(false);
    expect(isCatalogArray([{
            product_id: 1,
            productname: "Test Product",
            saleprice: 9.99,
            stock: 100,
            filename: null,
            description: null
        }])).toBe(true);
});

test("isCustomer", () => {
    expect(isCustomer(0)).toBe(false);
    expect(isCustomer(null)).toBe(false);
    expect(isCustomer({})).toBe(false);
    expect(isCustomer({
        customer_id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        username: "johndoe",
        isadmin: 0
    })).toBe(true);
});
test("isCustomerArray", () => {
    expect(isCustomerArray(0)).toBe(false);
    expect(isCustomerArray(null)).toBe(false);
    expect(isCustomerArray([])).toBe(true);
    expect(isCustomerArray([null])).toBe(false);
    expect(isCustomerArray([{
            customer_id: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            username: "johndoe",
            isadmin: 0
        }])).toBe(true);
});

test("isError", () => {
    expect(isError(0)).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError({})).toBe(false);
    expect(isError({
        message: "Test error message",
        name: "TestError",
        stack: "Error stack trace"
    })).toBe(true);
});

test("isImage", () => {
    expect(isImage(0)).toBe(false);
    expect(isImage(null)).toBe(false);
    expect(isImage({})).toBe(false);
    expect(isImage({
        image_id: 1,
        filename: "test_image.jpg",
        description: "A test image"
    })).toBe(true);
});
test("isImageArray", () => {
    expect(isImageArray(0)).toBe(false);
    expect(isImageArray(null)).toBe(false);
    expect(isImageArray([])).toBe(true);
    expect(isImageArray([null])).toBe(false);
    expect(isImageArray([{
            image_id: 1,
            filename: "test_image.jpg",
            description: "A test image"
        }])).toBe(true);
});

test("isIndex", () => {
    expect(isIndex(0)).toBe(false);
    expect(isIndex(null)).toBe(false);
    expect(isIndex({})).toBe(false);
    expect(isIndex({
        catalog: [{
                product_id: 1,
                productname: "Test Product",
                saleprice: 9.99,
                stock: 100,
                filename: null,
                description: null
            }],
        promotions: [{
                promotion_id: 1,
                filename: "test_promotion.jpg",
                description: "A test promotion",
            }]
    })).toBe(true);
});

test("isLogin", () => {
    expect(isLogin(0)).toBe(false);
    expect(isLogin(null)).toBe(false);
    expect(isLogin({})).toBe(false);
    expect(isLogin({
        success: true,
        message: "Login successful"
    })).toBe(true);
});

test("isOrderDetail", () => {
    expect(isOrderDetail(0)).toBe(false);
    expect(isOrderDetail(null)).toBe(false);
    expect(isOrderDetail({})).toBe(false);
    expect(isOrderDetail({
        orderdetail_id: 1,
        order_id: 1,
        product_id: 1,
        saleprice: 9.99,
        qty: 2
    })).toBe(true);
});
test("isOrderDetailArray", () => {
    expect(isOrderDetailArray(0)).toBe(false);
    expect(isOrderDetailArray(null)).toBe(false);
    expect(isOrderDetailArray([])).toBe(true);
    expect(isOrderDetailArray([null])).toBe(false);
    expect(isOrderDetailArray([{
            orderdetail_id: 1,
            order_id: 1,
            product_id: 1,
            saleprice: 9.99,
            qty: 2
        }])).toBe(true);
});

test("isProduct", () => {
    expect(isProduct(0)).toBe(false);
    expect(isProduct(null)).toBe(false);
    expect(isProduct({})).toBe(false);
    expect(isProduct({
        product_id: 1,
        image_id: 1,
        productname: "Test Product",
        description: "A test product",
        saleprice: 9.99,
        stock: 100,
        homepage: 1
    })).toBe(true);
});
test("isProductArray", () => {
    expect(isProductArray(0)).toBe(false);
    expect(isProductArray(null)).toBe(false);
    expect(isProductArray([])).toBe(true);
    expect(isProductArray([null])).toBe(false);
    expect(isProductArray([{
            product_id: 1,
            image_id: 1,
            productname: "Test Product",
            description: "A test product",
            saleprice: 9.99,
            stock: 100,
            homepage: 1
        }])).toBe(true);
});

test("isPromotion", () => {
    expect(isPromotion(0)).toBe(false);
    expect(isPromotion(null)).toBe(false);
    expect(isPromotion({})).toBe(false);
    expect(isPromotion({
        promotion_id: 1,
        image_id: 1,
        promotitle: "Test Promotion",
        description: "A test promotion",
        startdate: "2024-01-01",
        enddate: "2024-12-31",
        discountrate: 20
    })).toBe(true);
});
test("isPromotionArray", () => {
    expect(isPromotionArray(0)).toBe(false);
    expect(isPromotionArray(null)).toBe(false);
    expect(isPromotionArray([])).toBe(true);
    expect(isPromotionArray([null])).toBe(false);
    expect(isPromotionArray([{
            promotion_id: 1,
            image_id: 1,
            promotitle: "Test Promotion",
            description: "A test promotion",
            startdate: "2024-01-01",
            enddate: "2024-12-31",
            discountrate: 20
        }])).toBe(true);
});

test("isSale", () => {
    expect(isSale(0)).toBe(false);
    expect(isSale(null)).toBe(false);
    expect(isSale({})).toBe(false);
    expect(isSale({
        order_id: 1,
        firstname: "John",
        lastname: "Doe",
        saledate: "2024-01-01",
        productname: "Test Product",
        saleprice: 9.99,
        qty: 2
    })).toBe(true);
});
test("isSaleArray", () => {
    expect(isSaleArray(0)).toBe(false);
    expect(isSaleArray(null)).toBe(false);
    expect(isSaleArray([])).toBe(true);
    expect(isSaleArray([null])).toBe(false);
    expect(isSaleArray([{
            order_id: 1,
            firstname: "John",
            lastname: "Doe",
            saledate: "2024-01-01",
            productname: "Test Product",
            saleprice: 9.99,
            qty: 2
        }])).toBe(true);
});

test("isSaleOrder", () => {
    expect(isSaleOrder(0)).toBe(false);
    expect(isSaleOrder(null)).toBe(false);
    expect(isSaleOrder({})).toBe(false);
    expect(isSaleOrder({
        order_id: 1,
        customer_id: 1,
        saledate: "2024-01-01",
        customernotes: "Please deliver between 9am and 5pm",
        paymentstatus: 1
    })).toBe(true);
});
test("isSaleOrderArray", () => {
    expect(isSaleOrderArray(0)).toBe(false);
    expect(isSaleOrderArray(null)).toBe(false);
    expect(isSaleOrderArray([])).toBe(true);
    expect(isSaleOrderArray([null])).toBe(false);
    expect(isSaleOrderArray([{
            order_id: 1,
            customer_id: 1,
            saledate: "2024-01-01",
            customernotes: "Please deliver between 9am and 5pm",
            paymentstatus: 1
        }])).toBe(true);
});

test("isSearch", () => {
    expect(isSearch(0)).toBe(false);
    expect(isSearch(null)).toBe(false);
    expect(isSearch([])).toBe(true);
    expect(isSearch([null])).toBe(false);
    expect(isSearch([{
            product_id: 1,
            saleprice: 9.99,
            productname: "Test Product",
            stock: 100,
            filename: "",
            description: "A test product",
        }])).toBe(true);
});


test("isUser", () => {
    expect(isUser(0)).toBe(false);
    expect(isUser(null)).toBe(false);
    expect(isUser({})).toBe(false);
    expect(isUser({
        customer_id: 1,
        custname: "John Doe",
        isadmin: 0
    })).toBe(true);
});
test("isUserArray", () => {
    expect(isUserArray(0)).toBe(false);
    expect(isUserArray(null)).toBe(false);
    expect(isUserArray([])).toBe(true);
    expect(isUserArray([null])).toBe(false);
    expect(isUserArray([{
            customer_id: 1,
            custname: "John Doe",
            isadmin: 0
        }])).toBe(true);
});
