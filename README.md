# sportShop
This project using react, nodejs, mongodb,firebase.

Link Deploy Project:  https://sportaccessoryapp.herokuapp.com/

This ecommerce project include some basic feature such as:
- Shopping cart
- Comment review product
- payment with stripe ( fake money, in orderscreen you will see black button Pay + price order)
  + using this information to pay:
   . email:your email
   . card number: 4242 4242 4242 4242
   . MM/YY: date of the present (month and year)
   . CVC: random 3 digit number(e.g 123,456)
- admin dashboard
  +using this account to login to admin page (you will see button link to dashboard on the header)
    .username:admin@gmail.com
    .password: 123456
-Basic recommend product based on last order(just for you), this recommend only work when you create an order!!!!(I am using content base filtering to find similar product base on price rating and similarity description by using levenshtein method)
-Basic show most viewed (after user view a product in detail, count mention of product will increse by 1, and homepage will show 4 top 4 product with highest count mention)
- maybe it will take about 30 seconds and maybe up to 1 minute if first time on the website, i will fix this soon, maybe it happened because i deployed it to heroku

****** I will try to improve and add more features to this website in the future, thank you for watching  ****

