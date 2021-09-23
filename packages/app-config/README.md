# app-config

This package is used to store configuration for the application.

```text
PORT=5000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DATABASE=test

DATABASE_URL=mysql://root:secret@localhost:3306/test
```

To use the configuration, simply import it:

```typescript
import config from 'app-config';

// To import a specific configuration value:
import { database } from 'app-config';
```
