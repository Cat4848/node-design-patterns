# Node Design Patterns

This is a collection of design patterns that proved useful to me.

## Contents

### State Pattern

For the State Pattern I have 2 implementations:

- Database Module
- Fail Safe TCP Socket

#### Database Module

> code in the following dir: `src/statePattern/delayedInitDb`

There is a delay in the process of establishing a database connection.

To create a good developer experience, it will be useful to not worry if the database connection has been established before sending any database queries. It will be good just to import the database module and send database queries without checking if the connection has been established.

To solve this problem, I implemented a set of 3 classes that together use the _State Pattern_.

The database module can have 2 states: `QueuingState` and `InitializedState`.

The `QueuingState` adds the query to an internal `commandsQueue` list.

The `InitializedState` executes the query.

The 2 states represent the internal state of the database module.

When the database module is first instantiated, will hold the `QueuingState` until the database connection has been established. After the database connection has been established, the `InitializedState` will take the place of the `QueuingState` and any queued commands in the `commandQueue` will be executed.
