# Milestone #1 - Database Design
This is a summary of the different entities and relationships extracted from our functional requirements for the first milestone.

## THIS IS A WiP Documentation, please refer to the BDSetup.js file for a more up-to-date version. This is currently OUT OF DATE

## Table & Column Naming Conventions:
- Tables always start with a capital, have no spaces, and are camel cased. eg: "SearchableInfo" (Upper Camel Case aka Pascal Case) 
- Tables that are intended to store additional information to be referenced by an ID in another table have the postfix "Type". eg: "GenderType"
- Columns start with a lower case letter and are camel cased eg: "birthYear" (lower Camel Case aka Dromedary Case)

## Member
### memberID - Auto-Incrementing Primary Key
Type: INT

### firstName
Type: VARCHAR

### lastName
Type: VARCHAR

## SearchableInfo
### birthYear
Type: INT
Used to calculate ages. May need to be changed to "DATE" will discuess in next sprint (Nov 10th, 2020).

### familyStatusID
Type: INT
References the familyStatusType table 

### maxMonthlyBudget
Type: INT
The amount is rounded to the nearest $100. Will discuss rounding in in next sprint (Nov 10th, 2020).

### genderID
Type: INT
References the GenderType table.

## SearchPrefs
