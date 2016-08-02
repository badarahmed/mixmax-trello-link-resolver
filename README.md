# Trello link resolver for Mixmax

This is an open source Mixmax Link Resolver for Trello cards. See <http://sdk.mixmax.com/docs/overview-link-resolvers> for more information about how to use this code in Mixmax.

Right now this only works with public Trello boards. To test, you can use test this trello card https://trello.com/c/1ryiikHp/1-basic-trello-api-integration-with-mixmax

## Running locally

1. Install using `npm install`
2. Run using `TRELLO_API_KEY=X npm start`

Where `TRELLO_API_KEY` is your Trello API key. You can obtain it from your Trello account via https://trello.com/app-key

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=https%3A%2F%2Ftrello.com%2Fc%2F1ryiikHp%2F1-basic-trello-api-integration-with-mixmax
```
