import java.util.*;

public class StringRecursion  {

     public static void printLetters(String str) {
        if (str == null || str.equals("")) return;

        if (str.length() == 1) {
            System.out.println(str);
        } else {
            System.out.print(str.charAt(0) + ", ");
            printLetters(str.substring(1));
        }

        return;
    }

    
    public static int findLast(char ch,String str) {
        if (str == null || str.equals("")) return -1;
        
      
        int subIdx = str.lastIndexOf(ch);
        if (subIdx == -1) return -1;

        return subIdx;
    }

    
    public static String replace(String str, char oldChar, char newChar) {
        if (str == null) return null;
        if (str.equals("")) return str;

        String cur;
        if (str.charAt(0) == oldChar) {
            cur = Character.toString(newChar); 
        } else {
            cur = str.substring(0,1);
        } 

        return cur + replace(str.substring(1),oldChar,newChar);
    } 

    public static void main(String[] args) {
        System.out.println("Test printLetters()");
        System.out.println("printLetters(\"Rabbit\");");
        printLetters("Rabbit");

        System.out.println("printLetters(\"I like to recurse!\");");
        printLetters("I like to recurse!");

        System.out.println("printLetters(\"\");");
        printLetters("");

        System.out.println("printLetters(null);");
        printLetters(null);

        System.out.println();

        System.out.println("Test findLast()");
        System.out.print("indexOf('b',\"Rabbit\") == ");
        System.out.println(findLast('b',"Rabbit"));

        System.out.print("indexOf('P',\"Rabbit\") == ");
        System.out.println(findLast('P',"Rabbit"));

        System.out.println();

        System.out.println("Test replace()");
        System.out.println("replace(\"base case\",'e','y');");
        System.out.println(replace("base case",'e','y'));

        System.out.println();
        System.out.println("replace(\"base case\",'r','y');");
        System.out.println(replace("base case",'r','y'));

        System.out.println();
        System.out.println("replace(\"\",'r','y');");
        System.out.println(replace("",'r','y'));

        System.out.println();
        System.out.println("replace(\"base case\",'e','\0');");
        System.out.println(replace("base case",'e','\0'));

        System.out.println();
        System.out.println("replace(\"base case\",'\0','y');");
        System.out.println(replace("base case",'\0','y'));

        System.out.println();
        System.out.println("replace(null,'r','y');");
        System.out.println(replace(null,'r','y'));

        return;
    }

}


// Output:
// Test printLetters()                                                                                                                 
// printLetters("Rabbit");                                                                                                             
// R, a, b, b, i, t                                                                                                                    
// printLetters("I like to recurse!");                                                                                                 
// I,  , l, i, k, e,  , t, o,  , r, e, c, u, r, s, e, !                                                                                
// printLetters("");                                                                                                                   
// printLetters(null);                                                                                                                 
                                                                                                                                    
// Test findLast()                                                                                                                     
// indexOf('b',"Rabbit") == 3                                                                                                          
// indexOf('P',"Rabbit") == -1                                                                                                         
                                                                                                                                    
// Test replace()                                                                                                                      
// replace("base case",'e','y');                                                                                                       
// basy casy                                                                                                                           
                                                                                                                                    
// replace("base case",'r','y');                                                                                                       
// base case                                                                                                                           
                                                                                                                                    
// replace("",'r','y');                                                                                                                
                                                                                                                                    
                                                                                                                                    
// replace("base case",'e','');                                                                                                        
// bas cas                                                                                                                             
                                                                                                                                    
// replace("base case",'','y');                                                                                                        
// base case                                                                                                                           
                                                                                                                                    
// replace(null,'r','y');                                                                                                              
// null      
