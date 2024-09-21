# BookJourney

[BookJourney Application URL](https://bookjourney.vercel.app/)

You will need to register with your Google account to access all the functionalities.

## Members of the team:

- Ferran Bals Moreno <ferranbals@gmail.com> ([franksparks](https://github.com/franksparks))
- Luis Antonio Castro <luisantoniokoyari@gmail.com> ([Luisantonio88](https://github.com/Luisantonio88))
- Gloria Hornero <mghornero@gmail.com> ([MadameSheema](https://github.com/MadameSheema))
- Martín Alarcón <cristianma.2109@gmail.com> ([vedderzeznick](https://github.com/vedderzeznick))

## Summary of the project

BookJourney allows the users to track their reading activity.

In order to get books information [GoogleBooksAPI](https://developers.google.com/books?hl=es-419) is being used.

Users can store books as <em>Want to read</em>, <em>Reading</em> or <em>Read</em> status, or add books to their own lists as well.

To promote reading, users can set a Reading Challenge for the current year.

Users can also set ratings (up to 5 stars) and reviews to the books.

### Serveless application

BookJourney <strong>does not have an API</strong>, we are running serverless by running actions directly to the database.

### Database

We are using [MongoDB](https://www.mongodb.com) as DB provider.

### Prisma schema

Detailed model via [Prismaliser](https://prismaliser.app/):

<img src="./public/prismaliser.png"/>

### Running the project

Steps to run the project:

1. ⁠⁠Clone this repository.
2. ⁠Install dependencies -> <code>bun install</code>
3. ⁠Set up a <em>.env</em> file with credentials for:
   1. MongoDB
   2. Clerk
4. ⁠Generate the database<code>bun x prisma db push</code>

### Screenshots

- Main screen
<img width="2128" alt="Screenshot 2024-09-21 at 15 11 41" src="https://github.com/user-attachments/assets/5db02d70-3a5d-4714-ab46-c4d53b87e2f3">

- Updating reading activity
<img width="577" alt="Screenshot 2024-09-21 at 15 14 09" src="https://github.com/user-attachments/assets/c049305e-0c9b-4941-af68-a0b0c49a42f6">

- Book details screen
<img width="2122" alt="Screenshot 2024-09-21 at 15 11 59" src="https://github.com/user-attachments/assets/05fbb8b3-8780-4828-8192-db8fb20d69f3">

- Advanced Search screen
<img width="2124" alt="Screenshot 2024-09-21 at 15 12 34" src="https://github.com/user-attachments/assets/a113b123-9de5-4258-ad49-06bcc6aa082c">

- User lists screen
<img width="2127" alt="Screenshot 2024-09-21 at 15 12 59" src="https://github.com/user-attachments/assets/5dbf5e12-6c10-4253-b6b5-090546d99c03">

- Completed Reading Challenge (congratulations!)
<img width="2120" alt="Screenshot 2024-09-21 at 15 13 39" src="https://github.com/user-attachments/assets/03e3e023-3e9e-4a8f-89ca-a89c4c442b4e">

  
