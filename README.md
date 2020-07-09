# Eventr

This project was developed as part of General Assembly's Software Engineering Immersive. This project is a full stack web application that was completed in a group of 3 over 8 days.

Please be aware there may be a delay in the initial loading of the website, this is because Heroku puts the dyno running our application to sleep when there is no traffic. 

## Brief

Eventr is an event website, for people to share and find talks that they are interested in. Once an audience member has bought a ticket, they can then start voting in polls and using the comments sections enabling audience participation before the event has even started.

## Technologies Used

* Python
* Django
* PostgreSQL
* React.js Hooks
* JavaScript(ES6) / HTML5
* SCSS
* Yarn package manager
* Axios
* Json Web Tokens
* Git
* GitHub
* Heroku

## Approach

* We initially planned to make a polling app, but wanted to add more layers of complexity to the project and have more practise using SQL relationships. Adding the events meant there was more both on the back end in terms of models and relationships as well as more features and designs to work on the front end.

* Our project started by creating the backend models and mapping out the relationships between them. It was important in the organisation of our project to take the time to plan in advance, though the polls model did change part-way through the project in order to better track the results.

>>>>An intial sketch of our models and relationships we used during the planning stage:

![initial models image](assets/example-initial-models.png)

* We kept on top of the project by having regular stand up sessions, which would happen first thing in the morning and last thing at night as well as after lunch. In these sessions we would discuss what we had completed and what we were going onto. If there were any issues we were having, or if we were unsure what to work on next this is where we would ask questions.

## Process

* I was in a group with the same people as my previous project Roadtrippers, as such we used the same way to assign tasks - we all took ownership of the parts of the project we were most interested in as well as made sure to divide up the general parts of the project e.g. making the React components for each page.

* I worked on the back end, making the models, routes and relationships and testing them using Insomnia. On the front end I worked on implementing the polls and comments features that would be on the events page as well as the functionality for the baskets and created the individual ticket page. My other teammates worked on the styling, profiles and ticket index as well as the search page.

A basket is created for the user at point of reigister, which means that even if the user logs out the contents of the basket is still saved:

![basket register](assets/basket-register.png)
![basket create function](assets/basket-create.png)

In order to figure out which user's basket to add the talks to, I made a view that returns the basket that matches the user id. The purpose of this view was to receive just the relevant information needed, instead of receiving the users full profile information or looping through all the baskets:

![get user basket](assets/user-basket.png)

The user information is taken from the headers on the get request:

![basket get request](assets/user-basket-call.png)

This is then invoked when the user adds a talk to their basket:

![add to basket function](assets/add-to-basket.png)

In the basket, when the user wants to checkout, the function to create tickets maps through all the events in the basket and makes an API call for each with a QR code attached as an image. Then a put request is used to empty the basket. An example of the tickets can be found in the section below:
![ticket create function](assets/ticket-creation.png)

The polls model has a many-to-one relationship with the talks. They contain the question and answers the user wants to provide, as well as a value counter for each answer starting from 0. This was the most effective way to get an accurate number showing on the frontend that would also update quickly with each vote:

![poll models](assets/poll-model.png)

On the frontend when the user votes, this triggers an API call that updates the count for whichever option was picked, and then uses a setState Update Function to add the new value to the existing poll data in state:

![poll voting](assets/poll-vote.png)
![poll update function](assets/update-poll.png)

The percentages are then calculated using the information in state to calculate the width of the poll bar, an example of this is shown in the section below:

![bar count](assets/poll-bar.png)

If there are no votes yet, the calculation used would then divide by 0 and return the percentage as  `NaN`. In order to avoid this I made the makeNum function so that if there are no votes, 0 is returned:

![avoiding NaN](assets/avoid-NaN.png)

### Examples

Home page showing our use of white space and textures for styling:
![home page](assets/home-page.png)

Our search page was inspired by Eventbrite's side panels showing different search options:
![search page](assets/search-page.png)

The event page showing the polls and the comments for ticker holders:
![event page](assets/event-page.png)

Once the user checks out, they can access their tickets for the events. The tickets come with a working QR code:
![ticket example image](assets/ticket-example.png)

## Key Learnings

My biggest take away from Eventr is that having a group working seperately each owning our individual features can lead to knowledge silos. 

We took this approach to completing the project as we did not have much time before the project was due in order to complete our MVP and additional features. This did create some issues as we could not help each other with challenges that we experienced during this project, and when features overlapped it was difficult to explain how things worked to each other. On my part this came about because I was so focused on getting the project ready for the due date, but next time I work on a group project I will definitely take a more cooperative and learning-focused approach. This would include more pair-coding and putting heads together to look at complex issues that arise during development so everyone shares the knowledge.

## Challenges and Wins

The technologies (Python and React.js Hooks) we used on this project were new to us and it was difficult using them to implement what we wanted. While it was good learning experience, it did feel frustrating at the time as it was a challenge trying to translate what we were working on in our heads into functioning code.

A big win for me was that the website has lots of small details that turns it from a project to something that feels more real. It is really interesting to see how even just small features like the animation on the polls, default images for users and events, QR Code on the tickets all add up to create a better user experience on the site.

## Future Improvements

* Due to time constraints I had to abandon the votes model, which was a shame as the original intention for this was to provide a breakdown of the data behind who was participating in the polls e.g. displaying user information such as gender and ethnicity. It would be great to implement this at a later date.

* Once the votes model is implemented, I would then use it to find out which users had already voted in the polls. Right now, we are using local storage to track this. This was put in place to demonstrate what we were hoping to achieve, but it is not ideal as the information is deleted on logout. It would be great to replace this with a more long-term solution using the votes model.

## Deployment

This project was deployed using Heroku:
https://eventr-polls.herokuapp.com/

## Bugs

* The styling of the project has left large margins on every page, which needs to be corrected.
* The filter page, while fully functional during production, is now no longer working which may be due to changes made while deploying the application.
