import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            prompt: "lorem testum 1",
            answers: ["a", "b", "c", "d"],
            correctIndex: 0,
          },
          {
            id: 2,
            prompt: "lorem testum 2",
            answers: ["a", "b", "c", "d"],
            correctIndex: 1,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  const viewQuestionsBtn = await screen.findByText(/View Questions/i);
  fireEvent.click(viewQuestionsBtn);

  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});
