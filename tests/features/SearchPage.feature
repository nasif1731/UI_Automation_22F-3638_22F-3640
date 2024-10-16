Feature: Google Search

  Scenario: User can perform a search on Google
    Given I navigate to the Google homepage
    When I search for "Github"
    Then I should see search results related to "Github"
