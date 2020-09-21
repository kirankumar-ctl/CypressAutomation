Feature: validate scenarios for INGRESS page
  @ingresstest
  Scenario: validate ingress page
    Given I open NG911 login page
    When I will be on home page
    Then I verify Gateways, SBCs Tabs and data table present on INGRESS page
    And I verify card details on INGRESS page With API
    And I verify Table Header on INGRESS page With API