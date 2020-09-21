Feature: validate scenarios for ALARMS page
  @alarmstest
  Scenario: validate alarms page
    Given I open NG911 login page
    When I will be on home page
    Then I verify data table present on ALARMS page
    And I verify card details on ALARMS page With API
    And I verify Table Header on ALARMS page With API