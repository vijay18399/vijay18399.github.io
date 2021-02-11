#include <iostream>

using namespace std;


void DisplayMenu() {

  cout << "----------------" << endl;

  cout << "- 1) Subtract -" << endl; //Originally Add

  cout << "- 2) Add -" << endl; //Originally Subtract

  cout << "- 3) Divide -" << endl; //Originally Multiply

  cout << "- 4) Exit -" << endl;

  cout << "----------------" << endl;

}

int main(int argc, char ** argv) {

  int choice = 0;

  DisplayMenu();
  cout << "Please Enter  You Choice :";
  cin >> choice;

  while (choice >=1 && choice <= 4) { 

      int num1, num2;
      cout << "Please Enter  First Number :";
      cin >> num1;
      cout << "Please Enter  Second Number :";
      cin >> num2;

    if (choice == 1) {

      cout << num1 << " - " << num2 << " = " << num1 - num2 << endl;

    } else if (choice == 2) {

      cout << num1 << " + " << num2 << " = " << num1 + num2 << endl; //Change " - " to " + " to fit output

    } else if (choice == 3) {

      cout << num1 << " / " << num2 << " = " << (double) num1 / (double) num2 << endl; //Change " - " to " / " to fit output

    }
    else
    {
      break;
    }

    DisplayMenu();
    cout << "Please Enter  You Choice :";
    cin >> choice;

  }

}
