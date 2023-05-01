# Exercise 10: Adding multiple pages

_Goal: Managing routes in the "HeapOverrun" React app developed last week._

Starting from the app developed in week 8, incorporate React Router to enable multiple pages within the application.

Realize three pages:
1. **All the questions** in a list (`index`). Clicking on one of them will bring you to the page described at point 2.
2. **Single question and its answers**, i.e., the current content of the application. Clicking an "add" button will open the page to add a new answer. The "edit" button will bring to the same page but in _editing_ mode.
3. **Add/edit an answer**, i.e., the form already in the app. Submitting the form will bring you to the page described at point 2.

Properly handle wrong URLs by providing a _404 Not Found_ page.
