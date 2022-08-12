describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday").contains("1 spot remaining");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    cy.contains("[data-testid=day]", "Monday").contains("no spots remaining");
  });

  it("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Rick Sanchez");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Rick Sanchez");
    cy.contains(".appointment__card--show", "Tori Malcolm");

    cy.contains("[data-testid=day]", "Monday").contains("1 spot remaining");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("DELETING").should("exist");

    cy.contains("DELETING").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

    cy.contains("[data-testid=day]", "Monday").contains("2 spots remaining");
  });
});
