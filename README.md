# Pollify
# Pollify


# Introduction

It was a collaborative effort taken by 5 team members Varshitha, Baba khalil, Ashish jadhav, Abdhulla and it was completed in 5 days. The purpose of this project was to test our coding skills as well as our team-building skills.

#Project Type

Full Stack App :Front-end & Backend


# Deployed App

Front-end:(https://pollify-1.onrender.com/) 
Backend:(https://pollify-1.onrender.com/)

# Directory Structer


└──Polify
   | 
   ├── Backend
    │   ├── .env
    │   ├── .gitignore
    │   ├── configs
    │   │   ├── config.js
    │   │   └── db.js
    │   ├── controllers
    │   │   ├── login.js
    │   │   ├── MCQresponce.js
    │   │   ├── pollController.js
    │   │   ├── Scalepoll.js
    │   │   └── TrueFalsePollController.js
    │   ├── middlewares
    │   │   └── auth.js
    │   ├── models
    │   │   ├── Loginmodel.js
    │   │   ├── MCQresponce.js
    │   │   ├── pollModel.js
    │   │   ├── scaleresponcepoll.js
    │   │   ├── Scallpoll.js
    │   │   ├── TrueFalsePoll.js
    │   │   └── TrueFalseResponse.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   │   ├── Login.js
    │   │   ├── otprouter.js
    │   │   ├── pollRouter.js
    │   │   ├── Scallingpoll.js
    │   │   └── trueFalsePollRoutes.js
    │   ├── server.js
    │   └── utils
    │       ├── index.js
    │       ├── service.js
    │       └── socketUtils.js
    ├── directory_structure.txt
    ├── Frontend
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   └── vite.svg
    │   ├── README.md
    │   ├── src
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   ├── assets
    │   │   │   ├── P (1).png
    │   │   │   ├── Pn.png
    │   │   │   └── react.svg
    │   │   ├── components
    │   │   │   ├── Accordian.css
    │   │   │   ├── Accordian.jsx
    │   │   │   ├── Admin
    │   │   │   │   ├── AdminDashboard[1].jsx
    │   │   │   │   ├── AdminPanels.jsx
    │   │   │   │   ├── DashboardChart[1].jsx
    │   │   │   │   └── StatCard[1].jsx
    │   │   │   ├── Allpolls.jsx
    │   │   │   ├── Analitics.jsx
    │   │   │   ├── Caraousal.jsx
    │   │   │   ├── CardCarousel.jsx
    │   │   │   ├── createPolls.jsx
    │   │   │   ├── Feature
    │   │   │   │   ├── FeatureMain.jsx
    │   │   │   │   ├── GetStartedPage.jsx
    │   │   │   │   ├── IntuitiveAndEasyPage.jsx
    │   │   │   │   └── PollingOptionsPage.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Home.jsx
    │   │   │   ├── login-signup
    │   │   │   │   ├── api.jsx
    │   │   │   │   ├── ChangePassword.jsx
    │   │   │   │   ├── forgotpassword.jsx
    │   │   │   │   ├── Loginpage.jsx
    │   │   │   │   └── Signup.jsx
    │   │   │   ├── MCQPoll
    │   │   │   │   ├── MCQpollAttend.jsx
    │   │   │   │   ├── pollchart.jsx
    │   │   │   │   ├── pollMCQ.jsx
    │   │   │   │   └── ShareModel.jsx
    │   │   │   ├── Nav.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── scalingpoll
    │   │   │   │   ├── dragingpoll.jsx
    │   │   │   │   ├── dragpollcreation.jsx
    │   │   │   │   └── ScalePollResult.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Ticket.jsx
    │   │   │   └── TrueOrFalse
    │   │   │       ├── Accordian.css
    │   │   │       ├── AllTrueFalsePolls.jsx
    │   │   │       ├── AttendTrueFalsePoll.jsx
    │   │   │       ├── CreateTrueOrFalsePoll.jsx
    │   │   │       ├── ShareModal.jsx
    │   │   │       └── TrueFalsePollResponses.jsx
    │   │   ├── index.css
    │   │   └── main.jsx
    │   └── vite.config.js
    └── README.md





## Features

- **User Authentication**: Secure login and registration system.
- **Poll Creation**: Create multiple types of polls (MCQ, Quiz, Rating Scale, True/False).
- **Real-time Updates**: Live updates of poll results using WebSockets.
- **Role-based Access Control**: Different roles such as admin, poll creator, and normal user.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Visualization**: Visual representation of poll results using charts and graphs.

## Technologies Used

- **Frontend**: React, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io



# Video Walkthrough of the project
 (https://youtu.be/_L5w0eLdJkA)


# API Used 

Render - Backend deploying the API  which was created using json-server





