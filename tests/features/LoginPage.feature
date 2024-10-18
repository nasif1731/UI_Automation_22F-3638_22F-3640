@Login
Feature: Login Functionality

@SuccessfulLogin
Scenario: User logs into the application successfully
  Given I navigate to the login page
  When I fill in the username and password
  And I click the login button
  Then I should see the dashboard page
