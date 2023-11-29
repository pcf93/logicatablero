import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import View from '../View.vue';

describe("View", () => {

    const viewText = "Hello from inside a view"

    it("render span correctly", async()=> {
        //creating the setup for the test
        const viewId = "viewId";
        render(View, {
            props: {element: "span", id: viewId},
            slots: {default: viewText},
        })

        const view = await screen.findByText(viewText);
        //assertions
        expect(view.id).toBe(viewId);
    })

})