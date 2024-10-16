Feature: Invalid Login Feature

  Scenario Outline: User is not able to log in with invalid credentials
    Given I navigate to the login page
    When I fill in the username "<username>" and password "<password>"
    And I click the login button
    Then I should see an error message indicating that the login failed

   Examples:
  | username                        | password    |
  | xzy@gmail.com                   | TesMeTest   |
  | srk@testroverautomation.com     | Jawan123    |
  | testerrgreat@123.com            | Tesrxzy123  |
  | srk_jawan@test.com              | great123    |
  | SalmanDabang@gmail.com          | test 123    |
