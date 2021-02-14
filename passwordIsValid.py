def passwordIsValid(password):       
    SpecialSym =['!', '@', '#', '$','%','^','_'] 
    valid = True
    if len(password) < 5: 
        valid = False
    if any(char.isdigit() for char in password):
      count = 0
      for char in password:
        if char.isdigit():
          count =count+1
      if count < 2:
        valid = False
    else:
      valid = False
    if not any(char.isupper() for char in password): 
        valid = False
    if not any(char.islower() for char in password): 
        valid = False
    if not any(char in SpecialSym for char in password): 
        valid = False
    return valid

print(passwordIsValid("catC^"))
print(passwordIsValid("catC^1"))
print(passwordIsValid("catC^123"))
print(passwordIsValid("catC^1234"))
print(passwordIsValid("k1TT3n$"))
print(passwordIsValid("Aa123^"))
