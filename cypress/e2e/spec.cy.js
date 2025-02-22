describe("get all status", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("get actack", () => {
    cy.visit("/dorf1.php");
    cy.wait(2000);
    cy.get("#movements")
      .contains("โจมตี")
      .invoke("text")
      .then((text) => {
        cy.log(text);
      })
      .catch(() => {
        cy.log("ไม่มีโจมตี");
      });
    cy.wait(20000);
  });

  it("get newdid", () => {
    cy.visit("/dorf1.php");
    cy.wait(2000);
    cy.get("#movements")
      .contains("โจมตี")
      .invoke("text")
      .then((text) => {
        cy.log(text);
      })
      .catch(() => {
        cy.log("ไม่มีโจมตี");
      });
    cy.wait(20000);
  });
});
