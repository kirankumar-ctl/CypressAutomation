Feature: validate scenarios for PSAP page
  @Psaptest
  Scenario: validate psap page
    Given I open NG911 login page
    When I will be on home page
    Then I verify List and Map tab on PSAP page
    #And I verify card details on PSAP page With API
    #And I verify Table Header on PSAP page With API
    And I verify Table Data on PSAP page With API
  
  @TEST_FFP-27695
  Scenario: TC1_PSAP_Verify if PSAP card should be display on NG911 dashboard 
    Given I open NG911 login page
    When I will be on home page
    Then I verify PSAP card shuld display on dashboard

@TEST_FFP-27696
  Scenario: TC2_PSAP_Verify if PSAP count should be display on PSAP card
    Given I open NG911 login page
    When I will be on home page
    Then I verify PSAP count should be display on PSAP card
