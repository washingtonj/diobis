
# Welcome to Diobis

Diobis is a job platform created to simplify the job search process by utilizing GitHub repositories as a source of data. We use a personalized and user-friendly UX that removes the complexity and unnecessary information (for the job) that an issue may bring, allowing you to find the best job opportunities directly on GitHub, without the need to navigate through multiple pages.

## Features
 - [x] List job openings from various repositories..
 - [x] View Job information.
 - [ ] Interact with comments and reactions (Like, heart, rocket).
 - [ ] Register and edit job openings directly through the platform.
 - [ ] List access data for each job opening.


#  Application development
All tools used in the project are open source, so it's only fair that the platform is open source as well. Therefore, all resources used for development will be open source, and all hosting and server configurations will be on free resources.

The project is being developed based on:

#### Core:
| Package      | Services                            |
| ----------- | ----------------------------------- |
| Nuxt 3      | FullStack Application Development        |
| Pinia       | Global State Management      |
| VueUse      | Composables and utils for Vue 3  |
| TailwindCSS | CSS and UI development |

 
#### Hospedagem:
| Platafoms   | Services                       |
| ------------ | ------------------------------ |
| Vercel       | Core APP / Serveless functions |
| Oracle Cloud | Redis                          |

 


# What do I need know about the infraestructure!?

All the structure is based in docker containers, to make be easy, all the configuration made in docker-compose files, only need some environment variables to have a server working.


## What variables do I need?

#### Traefik: Reverse Proxy `(Only Production)`
- TRAEFIK_DASHBOARD_USERNAME
- TRAEFIK_DASHBOARD_PASSWORD


#### Google Domains: DNS Challenger `(Only Production)`
- GOOGLE_DOMAINS_ACCESS_TOKEN

#### GitHub OAuth: Authentication `(Production/Development)`
- GITHUB_OAUTH_CLIENT_ID
- GITHUB_OAUTH_CLIENT_SECRET

####  Redis: InMemory Database `(Production/Development)`
- REDIS_USERNAME
- REDIS_PASSWORD
- REDIS_HOST
- REDIS_PORT

## How do I start the services?
For development, you need only the variables checked with Development.

> Development

  Use the command `docker compose -f docker-compose.dev.yml --env-file .env up -d` (All inside the .infra folder).

> Production

The same about the development, but with the production env properties. Needs a pipeline to run docker-compose on the server. (Production uses a reverse proxy to encapsulate services on the same server.) It also uses a DNS Challenge through traefik to get the certificates to wildcard domain.
