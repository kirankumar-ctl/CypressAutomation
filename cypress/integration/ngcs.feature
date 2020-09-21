Feature: validate scenarios for NGCS page
  @ngcstest
  Scenario: validate ngcs page
    Given I open NG911 login page
    When I will be on home page
    Then I verify NgcsCore,ComponentStatus and NgcsCoreDevices tab on NGCS page
    And I verify card details on NGCS page With API
    And I verify Table Header on NGCS page With API