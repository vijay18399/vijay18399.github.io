def recursiveDigits(digitStr):
    if(len(digitStr)==1):
        return(digitStr)
    else:
        return digitStr[-1]+recursiveDigits(digitStr[:-1])

print(recursiveDigits("12345"))
print(recursiveDigits("5"))
print(recursiveDigits("10002000"))

# Let see the Explanation for the Question first
# they asked for writing a recursiveDigit function that takes digitStr  which is a string as input and returns reverse of digitStr  
# here Condition given that digitStr  is a string containing at least  one positive digit, 
# It means at least length of digitStr  assumed as 1  

# Inputs :
# 12345
# 5
# 10002000
# Expected Outputs:
# 54321
# 5
# 00020001
 

# Question 1:
# What is the base case?
# here we know if a single digit is given we can return it as it is Since the reverse of single-digit is the same Right!!!
# So in else case, we can return as it is
# if(len(digitStr)==1):
#         return(digitStr)
# Question 2:
# Mostly if the length of the string is more than 1 Only we need to do Something 
# So we recursively calling the recursive recursiveDigits() with argument as digitStr[:-1]
# slicing digitStr and removing last character in string and returning remaining String
# Question 3:
# here we return digitStr[-1]+recursiveDigits(digitStr[:-1])
