middleware->routes->controllers->service->model

//request codes 
✅ 1. Successful responses (2xx)
Code	Meaning	When to use
200 OK	Request succeeded	Returning requested data (GET, PUT, PATCH)
201 Created	Resource created	After creating a new resource (POST /users/register)
202 Accepted	Request accepted but not processed yet	Async operations (e.g., background jobs)
204 No Content	Success, but no content to return	DELETE requests or updates that don’t return data
✅ 2. Client errors (4xx)
Code	Meaning	When to use
400 Bad Request	Request invalid	Missing parameters, invalid JSON, invalid input
401 Unauthorized	No valid authentication	User not logged in / missing token
403 Forbidden	Authenticated but not allowed	User lacks permission to perform action
404 Not Found	Resource not found	Requested user, post, or endpoint doesn’t exist
405 Method Not Allowed	HTTP method not allowed	Trying POST on a GET-only route
409 Conflict	Resource conflict	Duplicate resource creation (e.g., email already exists)
422 Unprocessable Entity	Validation failed	Input passes syntax but fails validation rules
✅ 3. Server errors (5xx)
Code	Meaning	When to use
500 Internal Server Error	Generic server error	Unexpected errors (exceptions, DB failure)
501 Not Implemented	Feature not implemented	Endpoint exists but logic is not ready
503 Service Unavailable	Temporary overload	Server maintenance or high load
