# Project - Conmiviaje

## Description

This is a full-stack application that allows users to find a destiny where they want to travel to, and get information for living or move to that country. There are two kind of users. Admin users and external users. The Users can create an account, log in, and add offers to their favorites. The Admin user can add, edit, and delete offers.

## Installation

1. Clone the repository

```bash
git clone
```

2. Install the dependencies

```bash
npm install
```

3. Create a .env file in the root folder and add the following environment variables:

```bash
PORT=3001
DB_URI=your_mongoDB_URI
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Run the server to develop locally

```bash
npm run dev
```




# API Routes

## **Conmiviaje routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/offers/list       | GET               | [offers]                     | Get all offers     |
| /api/offers/getOne/:offer_id            | GET               | {offer}                | Get one offer     |
| /api/offers/create            | POST               | {createdOffer}                | Create offer      |
| /api/offers/edit/:offer_id            | PUT               | {editedOffer}                | Edit one offer     |
| /api/offers/delete/:offer_id           | DELETE               | {msg: "Offer successfully deleted!" }                | Delete one offer     |

## **User routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/users/getFavoriteOffers              | GET               | [offers]                           | Get logged user's favorite offers |
| /api/users/likeoffer/:offer_id              | PUT               | {updatedUser}                           | Like offer |
| /api/users/dislikeoffer/:offer_id              | PUT               | {updatedUser}                           | Dislike offer |

## **Auth routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/auth/getLoggedUser     | GET               | {loggedUser}                            | Get Logged User             |
| /api/auth/signup            | POST              | {createdUser}    | Create a new user             |
| /api/auth/login             | POST              | {authToken}                       | Log user in             |

## **Upload routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/upload     | POST               | CLOUDINARY_LINK                            | Upload Image to Cloudinary