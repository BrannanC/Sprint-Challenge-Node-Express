- [ ] Mention two parts of Express that you learned about this week.

Middleware, Routing.

- [ ] Describe Middleware?

Middleware is a function. With express I think of middleware as functions that execute before the final response. But everything in express is middleware, even the routes. Express is a framework of middleware.

- [ ] Describe a Resource?

Resource is an endpoint, a URL, generally associated with a bunch of data.

- [ ] What can the API return to help clients know if a request was successful?

A status code. And/or a JSON message.

- [ ] How can we partition our application into sub-applications?

With require() and module.export