# M3O User API

This project provides quick and easy authentication for Next.js by leveraging the [M3O User API](https://m3o.com/user). The package provides the server routing and the all authentication state management for the UI.

## Getting Started

Please firsty make sure that you have created an API Key on [M3O.com](https://m3o.com). Once you have created this key please create a `.env.local` file within your project and add the key:

`M3O_KEY=xxxxx`

### API routes / handlers

Firstly you need to create the a file that will create all your user route handling. Within the `pages/api` folder create a file under the user folder called `[...m3oUser].(ts|js)`. e.g `pages/api/user/[...m3oUser].js`. This will setup these handlers:

- POST: api/user/login
- POST: api/user/logout
- POST: api/user/sign-up
- GET: api/user/me
- POST: api/user/reset-password
