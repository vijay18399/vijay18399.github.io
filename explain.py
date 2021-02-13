The return value cannot be printed in console unless we use print () while running a script file

whereas we can have return value in the terminal by running code in terminal

Note: Dear Student you need to paste the entire code into terminal

>>> class VendingMachine:
...     def __init__(self): 
...         self.stock={    
...             156:[1.5,3],
...             254:[2.0,3],
...             384:[2.5,3],
...             879:[3.0,3] 
...             }
...         self.amount = 0 
...     @property
...     def getStock(self):
...         return self.stock
...     @property
...     def isStocked(self):
...         x=[]
...         for value in self.stock.values():
...             x.append(value[1])
...         return sum(x)!=0
...     def restocked(self,item,inc):
...         if item in self.stock.keys():
...             self.stock[item][1]+=inc
...             return("Current item stock: {0}".format(self.stock[item][1]))    
...         else:
...             return("InValid Item")
...     def setprice(self,item,new_price):
...         if item in self.stock.keys():
...             self.stock[item][0]=new_price
...         else:
...             return("InValid Item")
...     def deposit(self,amount):
...         x=[]
...         for value in self.stock.values():
...             x.append(value[1])
...         if sum(x)==0:
...             return("Machine out of stock take your ${0} back".format(amount))
...         self.amount =self.amount+ amount
...         return("Balance: ${0}".format(self.amount))
...     def purchase(self,prodkey,quantity=1):
...         x=[]
...         for value in self.stock.values():
...             x.append(value[1])
...         if sum(x)==0:
...             return("Machine out of stock")
...         if prodkey not in self.stock.keys():
...             return("Invalid Item")
...         if(self.stock[prodkey][1]==0):
...             return("Item out of stock")
...         if(quantity > self.stock[prodkey][1]):
...             return("Current {0} stock: {1}, try again".format(prodkey,self.stock[prodkey][1]))
...         if(self.amount < quantity*self.stock[prodkey][0]):
...             return("Please Deposit ${0}".format(quantity*self.stock[prodkey][0]-self.amount))
...         else:
...             self.stock[prodkey][1] = self.stock[prodkey][1] - quantity
...             self.amount = self.amount - quantity*self.stock[prodkey][0]
...             if self.amount == 0:
...                 return("Item dispensed")
...             else:
...                 msg = "Item dispensed, take your ${0} back".format(self.amount)
...                 self.amount =0
...                 return(msg)
and you can have an output like this

>>> x=VendingMachine()
>>> x.getStock
{156: [1.5, 3], 254: [2.0, 3], 384: [2.5, 3], 879: [3.0, 3]}
>>> x.restocked(215,9)
'InValid Item'
>>> x.isStocked
True
>>> x.restocked(156,1)
'Current item stock: 4'
>>> x.getStock
{156: [1.5, 4], 254: [2.0, 3], 384: [2.5, 3], 879: [3.0, 3]}
>>> x.purchase(156)
'Please Deposit $1.5'
>>> x.purchase(156,2)
'Please Deposit $3.0'
>>> x.purchase(156,23)
'Current 156 stock: 4, try again'
>>> x.deposit(3)
'Balance: $3'
>>> x.purchase(156,3)
'Please Deposit $1.5'
>>> x.purchase(156)
'Item dispensed, take your $1.5 back'
>>> x.getStock
{156: [1.5, 3], 254: [2.0, 3], 384: [2.5, 3], 879: [3.0, 3]}
>>> x.deposit(300)
'Balance: $300'
>>> x.purchase(876)
'Invalid Item'
>>> x.purchase(384,3)
'Item dispensed, take your $292.5 back'
>>> x.purchase(156,10)
'Current 156 stock: 3, try again'
>>> x.purchase(156,3)
'Please Deposit $4.5'
 

 

Explanation
I made few adjustments so 

x.getStock  and  x.isStocked work without parenthesis

Python Code:

class VendingMachine:
    def __init__(self):
        self.stock={
            156:[1.5,3],
            254:[2.0,3],
            384:[2.5,3],
            879:[3.0,3]
            }
        self.amount = 0
    @property
    def getStock(self):
        return self.stock
    @property
    def isStocked(self):
        x=[]
        for value in self.stock.values():
            x.append(value[1])
        return sum(x)!=0
    def restocked(self,item,inc):
        if item in self.stock.keys():
            self.stock[item][1]+=inc
            return("Current item stock: {0}".format(self.stock[item][1]))    
        else:
            return("InValid Item")
    def setprice(self,item,new_price):
        if item in self.stock.keys():
            self.stock[item][0]=new_price
        else:
            return("InValid Item")
    def deposit(self,amount):
        x=[]
        for value in self.stock.values():
            x.append(value[1])
        if sum(x)==0:
            return("Machine out of stock take your ${0} back".format(amount))
        self.amount =self.amount+ amount
        return("Balance: ${0}".format(self.amount))
    def purchase(self,prodkey,quantity=1):
        x=[]
        for value in self.stock.values():
            x.append(value[1])
        if sum(x)==0:
            return("Machine out of stock")
        if prodkey not in self.stock.keys():
            return("Invalid Item")
        if(self.stock[prodkey][1]==0):
            return("Item out of stock")
        if(quantity > self.stock[prodkey][1]):
            return("Current {0} stock: {1}, try again".format(prodkey,self.stock[prodkey][1]))
        if(self.amount < quantity*self.stock[prodkey][0]):
            return("Please Deposit ${0}".format(quantity*self.stock[prodkey][0]-self.amount))
        else:
            self.stock[prodkey][1] = self.stock[prodkey][1] - quantity
            self.amount = self.amount - quantity*self.stock[prodkey][0]
            if self.amount == 0:
                return("Item dispensed")
            else:
                msg = "Item dispensed, take your ${0} back".format(self.amount)
                self.amount =0
                return(msg)
 

running above script cannot give us output

we need to create an instance and call each method with appropriate arguments 

the return value cannot be printed in console unless we use print () while running script file

whereas we can have return value in the terminal by running code in terminal

v=VendingMachine()
print(v.getStock())
print(v.isStocked())
print(v.setprice(156,30))
print(v.restocked(156,9))
print(v.deposit(300))
print(v.purchase(156,12))
print(v.deposit(60))
print(v.purchase(156,12))
 

Output:

{156: [1.5, 3], 254: [2.0, 3], 384: [2.5, 3], 879: [3.0, 3]}
True
None
Current item stock: 12
Balance: $300
Please Deposit $60
Balance: $360
Item dispensed
