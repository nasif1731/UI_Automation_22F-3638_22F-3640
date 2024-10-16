Feature: Login Feature

Scenario: User logs into the application successfully
  Given I navigate to the login page
  When I fill in the username and password
  And I click the login button
  Then I should see the dashboard page

Scenario Outline: Verify user is not able to login with the following credentials
  Given I navigate to "https://github.com/login"
  And I enter username "<username>"
  And I enter password "<password>"
  When I click on "Sign in" button
  Then I should verify user is not able to login and url contains "https://github.com/"

Examples:
  | username                        | password    |
  | xzy@gmail.com                   | TesMeTest   |
  | srk@testroverautomation.com     | Jawan123    |
  | testerrgreat@123.com            | Tesrxzy123  |
  | srk_jawan@test.com              | great123    |
  | SalmanDabang@gmail.com          | test 123    |
