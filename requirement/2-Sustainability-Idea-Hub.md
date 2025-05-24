# **Sustainability Idea Hub Assignment Requirements**

## **Project Overview**

Develop an online community portal where community members can share sustainably oriented ideas (e.g. reducing plastic consumption or launching a solar power project) in order to help the environment. Admins monitor the submissions, provide feedback, and make sure the best ideas are made available to all portal members for their consideration.

---

## **Functional Requirements**

### **User Roles**

- **Members**:

  - Register and log in to the portal.
  - Create, edit, and delete their own Ideas.
  - Categorize ideas predefined by Admin (e.g., Energy, Waste, Transportation).
  - Share positive or negative experiences in comments.
  - Vote (up-vote/down-vote) or remove vote (Ref: Reddit like system).
  - Comment on ideas and reply to others comments.(Hints: Nested comment).
  - **Paid Ideas**:
    - When a member marks an idea as "Paid". In order for other members to view these "ideas", they must pay first. Members who are not authenticated must register or log in before purchasing this idea.
    - If an idea is free, then everyone can view it (Unauthenticated or Authenticated).

- **Admin**:
  - Can approve/reject ideas, if reject ideas need to give feedback (e.g., "Lacks feasibility study").
  - Assign statuses: _Under Review_, _Approved, rejected._
  - Delete inappropriate comments.
  - Highlight high-impact projects on a public route based on up-vote (optional).

### **Features**

- **Authentication**:

  - Member signup/login using email and password.
  - Password hashing for security.
  - JWT-based authentication for session management.

- **Idea Management (Only Login Member Can Do):**

  - Member can create ideas with:
    - Title, problem statement, proposed solution, description and images e.t.c.
  - **Draft mode**: Members write and draft ideas without publishing.
  - **Submit Ideas for review**: Move idea from “Draft” to “Pending”.
  - **Admin action**:
    - **Under Review→** When members submit their "Ideas" initial status will be under review
    - **Approve** → idea becomes publicly visible
    - **Reject** → idea returns to members with feedback.
  - Members can edit/delete their ideas **only if unpublished**.

- **Admin**:

  - View all ideas with: **Approved**, **Rejected.**
  - Reject ideas with a feedback reason (Feedback visible only to the submitter).

- **Category System**:

  - Predefined categories by admins (Energy, Waste, Transportation).
  - Members must select a category when submitting ideas.

- **Voting and Commenting (Only for Login Member) :**

  - Members can up-vote or down-vote→one vote per member (Ref: Like Reddit voting system)
  - Members can remove their vote.
  - **Comments**:
    - Nested comment for discussions. (Ref: Like Reddit comment system)
    - Admins can delete any comment or irrelevant comment.

- **Search and Filter**:

  - Members can search "ideas" by keyword or filter by name, category.

- **Responsive Design**:
  - The portal must be fully responsive and accessible on desktop and mobile devices.

---

## **Pages**

**Logo:** Prominently display the Portal logo.

**Navigation Bar:**

-       *   Home
  - **Ideas:** All Listed Sustainability Ideas
  - Dashboard (Will redirect to a specific user dashboard based on their role)
  - About Us
  - Blog
  - Login/Register (if the user is not logged in)
  - My Profile (if logged in)
  - You can add other nav options if necessary

## **Home Page**

**Hero Banner:** Cover image with catchy statement about the portal.

**Search Option:** Allow members to search for "ideas" by:

-       *   Name
  - category

**Features Ideas Cards:** Each card should display:

-       *   Representative images
  - Category
  - Brief description
  - A "View Idea" button link to the full "Ideas" Details page

**Testimonials:** Top 3 "Ideas" which based on vote count.

## **Footer**

-       *   **Contact Information:** Email, phone, and social media links.
  - **Copyright:** Standard copyright details.
  - **Additional Links:** Terms of Use, Privacy Policy, etc.

---

## **Dashboard**

- **Admin Dashboard:**

  - Full control over member accounts and ideas listings.
  - **Members Management:**
    - View all member accounts.
    - Activate/deactivate members.
    - Edit members roles as necessary.
  - **Ideas Management:**
    - View, edit, or remove any ideas listing.
    - Oversee listings posted by members.
    - View all ideas with: **Under Review,** **Approved**, **Rejected.**
    - Reject ideas with a feedback reason (Feedback visible only to the submitter).

- **Member Dashboard:**
  - Member can create ideas with:
    - Title, problem statement, proposed solution, description and images.
  - **Draft mode**: Members write and draft ideas without publishing.
  - **Submit Ideas for review**: Move idea from “Draft” to “Pending”.
  - **Admin action**:
    - **Under Review→** When members submit their "Ideas" initial status will be under review
    - **Approve** → Idea becomes publicly visible
    - **Reject** → Idea returns to members with feedback.
  - Members can edit/delete their ideas **only if unpublished**.

---

### **Non-Functional Requirements:**

- **Usability:** Clean, intuitive UI/UX for both users and admins.
- **Maintainability:** Modular, clean, and well-documented code following RESTful API design principles.

---

**Important Note:**

This document provides a high-level overview of the core features and pages for the Street Food Finder Website. Add more pages (e.g., About Us, Contact, FAQ, Subscription Plans, User Profile).Think creatively and make the project your own — the more professional and complete your project looks, the better it will be for your portfolio and CV.

### **Technology Stack:**

- **Frontend:**
  - **Next.js** (for server-side rendering and static site generation).
  - **Tailwind CSS** (for utility-first styling).
- **Backend:**
  - **Node.js** with **Express.js** (for RESTful API).
  - **Prisma** (for database management).
- **Database:**
  - **PostgreSQL** (for relational data storage).
- **Authentication:**
  - **JWT** (for session management).
- **Payment Integration:**
  - **SSLCommerz** or **ShurjoPay** (for premium subscriptions).
- **Deployment:**
  - Vercel, render, ralway for hosting and deployment.

---

### **Submission Guidelines:**

1. **GitHub repository** with a clear README explaining setup and functionality.
2. **Live site links** for both frontend and backend.
3. **Admin credentials** for testing.
4. An **overview video** demonstrating the functionality of the website.
