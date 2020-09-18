Feature: NG911 sanity automation
  @ng911sanity
  Scenario: NG911 sanity testing
    Given I open NG911 login page
    When I will be on home page
    Then I verify List and Map tab on PSAP page
    And I verify Table Header on PSAP page With API
    Then I verify NgcsCore and NgcsCoreDevices tab on NGCS page
    And I verify Table Header on NGCS page With API
    Then I verify data table present on INGRESS page
    And I verify Table Header on INGRESS page With API
    Then I verify data table present on ALARMS page
    And I verify Table Header on ALARMS page With API