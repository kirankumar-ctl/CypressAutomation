@ng911sanity
Feature: NG911 automation sanity
  @TEST_FFP-27904
  Scenario: Login in NG911 app and validate home page
    Given I open NG911 login page
    When I will be on home page

  Scenario: validate PSAP page and there APIs
    Then I verify List and Map tab on PSAP page
    And I verify card details on PSAP page With API
    #And I verify Table Header on PSAP page With API

  Scenario: validate NGCS page and there APIs
    Then I verify NgcsCore,ComponentStatus and NgcsCoreDevices tab on NGCS page
    And I verify card details on NGCS page With API
    #And I verify Table Header on NGCS page With API

  Scenario: validate INGRESS page and there APIs
    Then I verify Gateways, SBCs Tabs and data table present on INGRESS page
    And I verify card details on INGRESS page With API
    #And I verify Table Header on INGRESS page With API

  Scenario: validate ALARMS page and there APIs
    Then I verify data table present on ALARMS page
    And I verify card details on ALARMS page With API
    #And I verify Table Header on ALARMS page With API





# @LogoutTime
# Feature: NG911 application logout time
#   Scenario: Get NG911 logout time
#     Given I open NG911 login page
#     When I will be on home page
#     Then I calculate logout time for application with maximum timeout 90 min
