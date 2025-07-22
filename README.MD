![Hi](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2l2cWE2aGpseXB4eG5weGN1ZHBycDYyZzJlemFwMXppYWRmcnQyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ASd0Ukj0y3qMM/giphy.gif)

# Supabase Project Starter

This is a basic starter template for a Supabase project. It includes setup instructions, database integration, and example usage.

## Prerequisites
I make the assumption that the user is using a Unix or a Unix-like system (such as Linux) - you distro will probably determine where these packages ultimately come from - but if you are on Mac, you won't have much of an issue.
* [Make](https://cmake.org/) - basic bootstrapping
* [Node](https://nodejs.org/en) - need node w/NPM to run UI (react)
* [Docker](https://www.docker.com/) - Supabase uses containers I think


## 🚀 Project Setup

### Environment Variables
See [.env.example](./env.example) for reference when setting up environment variables - Because no .env is tracked, when you create a local .env file at the root of the project, the same env will be copied into the respective directories requiring them

#### Backend

| Variable Name | Where to Get It | Description |
|---------------|------------------|-------------|
| `OPEN_AI_KEY` | [OpenAI Platform](https://platform.openai.com/account/api-keys) | Secret API key used to authenticate requests to the OpenAI API. |
| `DB_URL` | [Supabase Project Settings → API](https://app.supabase.com) | The URL of your Supabase instance (used for connecting to the backend). |
| `DB_ANON_KEY` | [Supabase Project Settings → API → anon/public key](https://app.supabase.com) | Public (anon) API key for accessing Supabase from the backend securely. |

#### Frontend

| Variable Name | Where to Get It | Description |
|---------------|------------------|-------------|
| `VITE_API_BASE` | Local Supabase instance or Supabase functions URL | Base URL for accessing backend functions (e.g., http://localhost:54321/functions/v1). |
| `VITE_API_TOKEN` | Custom or hardcoded JWT for calling protected functions | Token used for authenticating frontend requests to API endpoints. |
| `VITE_SUPABASE_URL` | [Supabase Project Settings → API](https://app.supabase.com) | URL of your Supabase instance used by the frontend. |
| `VITE_SUPABASE_ANON_KEY` | [Supabase Project Settings → API → anon/public key](https://app.supabase.com) | Public API key for client-side usage to connect to Supabase. |


1. **Clone the repository**
   ```bash
   git clone git@github.com:SafetyBlanket/informulate.git
   cd supabase-project
   ```

2. **Create your local env file at the root of this project using the example provided and descriptions above**


3. **Install dependencies**  
    See prequisites

4. **Run the program**  
    ```bash
    make # this will start the back and front simultaneously
    ```

5. **Run the schema in your database**
    The [schema](./schema.sql) contains the table used - when connecting to your account, you can run the schema to recreate the table.


## 🧱 Project Structure

```
.
├── supabase/           # Supabase starter project
├── user-interface/     # Frontend pages (React.js)
├── Makefile            # Run targets
├── .env                # Environment variables
├── .schema.sql         # Backup schema dump when standing up db  
└── README.MD           # Documentation

```

## Design Decisions
* In this version at the time of writing I think I took some creative liberties on how I got things done given the time.
* Using any version of AI requires tokens and tokens require money so I purchased just enough to run at the lowest tier access
* While I did not use the realtime updates to update the questions and answers, I used realtime updates linked to keeping the score count to prove the general concept.  If I had enough time, I would make more changes to better fit the letter vs. the spirit of the request.
* I chose to use React for just client opposed to Next because I didn't want to have confusion with multiple sources of apis and didn't wan't to mess around mixing client and server functionality - one of the requirements was that the page not reload so React was fine as is.
* I have not used Supabase before, and this challenge almost seems geared towards knowing how to setup and distribute it - given my starting point, I think 5-10 hours is fairly aggressive a timeline to complete.


## 🔐 Supabase Setup
TODO
<!-- 
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Copy the project URL and anon/public API key into your `.env.local` -->


## ✅ To Do

- [ ] Finish Docs
- [ ] Create database schema
- [ ] Deploy with Vercel/Netlify

---

Made with ❤️ using [Supabase](https://supabase.com/)
