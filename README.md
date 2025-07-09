# **Sustainability Idea Hub Assignment Requirements**

## **Project Overview**

Develop an online community portal where community members can share sustainably oriented ideas (e.g. reducing plastic consumption or launching a solar power project) in order to help the environment. Admins monitor the submissions, provide feedback, and make sure the best ideas are made available to all portal members for their consideration.

---

## **Technologies**

- Node js
- typescript
- express
- ts
- prisma
- bcrypt
- cloudinary
- jwt
- multer
- cors
- dotenv
- jsonwebtoken
- parser
- sslcommerz
- zod

## **Role Based Feature**

# **Admin Routes**

- **Update User Status**: [/api/v1/users/update/user-status/:userId](/api/v1/users/update/user-status/:userId)
- **Update Idea Satus**: [/api/v1/user/status](/api/v1/user/status)
- **Observation Payment**: [/api/v1/payment/completed](/api/v1/payment/completed)
- **Add Category**: [/api/v1/categories/add-category](/api/v1/categories/add-category)

- **Admin**:

  - Can register and log in to mydia website
  - **Logged in admin can**

    - update user status
    - update idea status
    - Observe completed payment

  - may visit anyone profile with login

# **Member Routes**

- **Home**: [/api/v1](/api/v1)
- **Add to Idea**: [/apiv1/ideas/add-idea](/apiv1/ideas/add-idea)
- **Me**: [/api/v1/me/:userEmail](/api/v1/me/:userEmail)

- **Member**:

  - Can register and log in to mydia website
  - A logged in member Have a opputunity to add a unique idea
  - A logged in member may add comment and give vote a particular idea
  - may visit anyone profile with login
