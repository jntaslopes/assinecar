import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LandingPage } from "@/components/LandingPage";

describe("LandingPage", () => {
  it("abre uma resposta do FAQ ao clicar na pergunta", async () => {
    const user = userEvent.setup();

    render(<LandingPage />);

    await user.click(screen.getByRole("button", { name: /como funciona a assinatura/i }));

    expect(
      screen.getByText(/a equipe lm confirma as condições do plano/i),
    ).toBeInTheDocument();
  });
});
