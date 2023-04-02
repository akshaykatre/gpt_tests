import sys
import random

# Get the user inputs from command-line arguments
country = sys.argv[1]
age = int(sys.argv[2])
city = sys.argv[3]

# Generate a random salary based on the user inputs
if country == 'USA' and age >= 18 and city == 'New York':
    salary = random.randint(50000, 100000)
elif country == 'USA' and age >= 18:
    salary = random.randint(30000, 60000)
elif country == 'USA':
    salary = random.randint(20000, 40000)
elif country == 'India' and age >= 18 and city == 'Mumbai':
    salary = random.randint(500000, 1000000)
elif country == 'India' and age >= 18:
    salary = random.randint(300000, 600000)
else:
    salary = random.randint(200000, 400000)

# Output the salary to stdout
print(salary)
