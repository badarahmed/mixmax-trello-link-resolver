# Trello link resolver for Mixmax

This is an open source Mixmax Link Resolver. See <http://sdk.mixmax.com/docs/overview-link-resolvers> for more information about how to use this code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `TRELLO_API_KEY=X npm start`

Where `TRELLO_API_KEY` is your Trello API key. You can obtain it from your Trello account via https://trello.com/app-key

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=https%3A%2F%2Ftrello.com%2Fc%2F8AzE5mNY%2F148-i-just-created-a-new-card
```
