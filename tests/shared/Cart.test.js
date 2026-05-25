import { getCartLength, getCartQuantity } from "../../shared/src/Cart";

test("getCartQuantity", () => {
    expect(getCartQuantity({}, 1)).toBe(0);
    expect(getCartQuantity({ 1: 1 }, 1)).toBe(1);
});
test("getCartLength", () => {
    expect(getCartLength({})).toBe(0);
    expect(getCartLength({ 1: 1 })).toBe(1);
});