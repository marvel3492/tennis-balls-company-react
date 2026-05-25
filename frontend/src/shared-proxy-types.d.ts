declare module "shared/Data" {
    export function isCartType(value: unknown): value is CartType;
    export function isCart(value: unknown): value is CartDataType;
    export function isCatalog(value: unknown): value is CatalogDataType;
    export function isCatalogArray(value: unknown): value is CatalogDataType[];
    export function isCustomer(value: unknown): value is CustomerDataType;
    export function isCustomerArray(value: unknown): value is CustomerDataType[];
    export function isError(value: unknown): value is ErrorDataType;
    export function isImage(value: unknown): value is ImageDataType;
    export function isImageArray(value: unknown): value is ImageDataType[];
    export function isIndex(value: unknown): value is IndexDataType;
    export function isLogin(value: unknown): value is LoginDataType;
    export function isOrderDetail(value: unknown): value is OrderDetailDataType;
    export function isOrderDetailArray(value: unknown): value is OrderDetailDataType[];
    export function isProduct(value: unknown): value is ProductDataType;
    export function isProductArray(value: unknown): value is ProductDataType[];
    export function isPromotion(value: unknown): value is PromotionDataType;
    export function isPromotionArray(value: unknown): value is PromotionDataType[];
    export function isSale(value: unknown): value is SaleDataType;
    export function isSaleArray(value: unknown): value is SaleDataType[];
    export function isSaleOrder(value: unknown): value is SaleOrderDataType;
    export function isSaleOrderArray(value: unknown): value is SaleOrderDataType[];
    export function isSearch(value: unknown): value is SearchDataType;
    export function isUser(value: unknown): value is UserDataType;
    export function isUserArray(value: unknown): value is UserDataType[];
}

declare module "shared/Cart" {
    export function getCartLength(cart: CartType): number;
    export function getCartQuantity(cart: CartType, productId: number): number;
    export function isCartEmpty(cart: CartType): boolean;
}
