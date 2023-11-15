import { test, expect } from 'vitest'

const user = {
    name: "Matt",
    age: 22,
}

test("Matt is 22", () => {
    expect(user.name).toBe("Matt");
    expect(user.age).toBe(22);
    expect(user.name).contains("at");
})