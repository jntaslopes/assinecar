import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LandingPage } from "@/components/LandingPage";

describe("LandingPage", () => {
  it("abre e fecha o menu de produtos LM pelo botao da marca", async () => {
    const user = userEvent.setup();

    render(<LandingPage />);

    const trigger = screen.getByRole("button", { name: /abrir opções da marca/i });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(trigger);

    const menu = screen.getByRole("menu");

    expect(menu).toBeInTheDocument();
    expect(screen.getByText(/navegue entre os nossos produtos/i)).toBeInTheDocument();
    expect(within(menu).getByRole("img", { name: "LM Mobilidade" })).toBeInTheDocument();
    expect(
      within(menu).getByRole("link", { name: "Acessar site institucional" }),
    ).toHaveAttribute("href", "https://lmmobilidade.com.br/");

    for (const product of ["LM Frotas", "LM AssineCar", "LM Veículos para Apps", "LM Seminovos"]) {
      expect(within(menu).getByRole("img", { name: product })).toBeInTheDocument();
      expect(within(menu).getByRole("menuitem", { name: product })).toBeInTheDocument();
    }

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("abre uma resposta do FAQ ao clicar na pergunta", async () => {
    const user = userEvent.setup();

    render(<LandingPage />);

    await user.click(screen.getByRole("button", { name: /como funciona a assinatura/i }));

    expect(screen.getByText(/você escolhe o modelo, define prazo/i)).toBeInTheDocument();
  });
});
