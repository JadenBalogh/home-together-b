# Database Design
This is a summary of the different entities and relationships extracted from our functional requirements.

## Milestone #1

### Entities
#### Member
UserID - Primary Key
    - Type: INT
Username
    - Type: VARCHAR
Gender
    - Type: Undecided, may be stored as an INT mapped to a value or a string
Birthday
    - Docs say "Age Group" but we can get that from the Birthday.
    - Type: DATE
Household Size
    - Type: INT
    - Docs say Family Status (Married, Single, Etc) However household size is more accurate and is more relevant than if someone is Married.
Number of Household Members under 19
    - Type: INT
    - AKA # of Kids, with the household size above we can get an accurate picture of what the people are looking for.
Monthly Budget (Rounded to nearest $100.00)
    - Type: INT
    
#### Organization (Business and Service)
#### Listing
#### Home

### Relationships
 - Member has many Homes
 - Organization has many Listings