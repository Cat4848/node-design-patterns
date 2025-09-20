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

To solve this problem, I implemented a set of 3 modules that together use the _State Pattern_.

The database module can have 2 states: `QueuingState` and `InitializedState`.

The `QueuingState` adds the query to an internal `commandsQueue` list.

The `InitializedState` executes the query.

The 2 states represent the internal state of the database module.

When the database module is first instantiated, will hold the `QueuingState` until the database connection has been established. After the database connection has been established, the `InitializedState` will take the place of the `QueuingState` and any queued commands in the `commandQueue` will be executed.

#### Fail Safe TCP Socket

> code in the following dir: `src/statePattern/failSafeTcpSocket`

When a client sends data to a server on regular intervals the connection can fail at any time.

It would be good to have a way of storing the data into a queue until the server comes back online. When the  connection will be re-established and data in the queue will be send to the server. And after the connection is re-established, the data will flow again at regular intervals like before the disconnection.

I implemented this State pattern using 3 modules:

1. `FailsafeSocket` – this module holds the current state (`online` or `offline`), the `queue` and the `socket` connection;

2. `OfflineState` – this module adds data to the queue and tries to reconnect every second;
3. `OnlineState` – this module sends the data to the server and registers an `end` event listener. If the connection ends, the handler is called. The handler changes the state to `offline`. The `OfflineState` tries to reconnect again every second. In the `activate` method, we can register more events with handlers to suit our needs.

In a nutshell, this pattern increases modularity and readability while mitigating connectivity issues. When the `FailsafeSocket` is `online`, the data flows with no problems. When the `end` event is triggered, then the `offline` state is activated. The `offline` state will try to re-establish the connection every second until the connection is established.
