
### Installation
```
npm install
```

### Debugging
```
export DEBUG=NT:*
```

### Export variables
```
export DEBUG=NT:*
export PORT=3050
export NT_DB_URL=mongodb://localhost/dev-sample
```

### Run the Application (Development Purpose Only)
```
npm run dev
"dev": "DEBUG=NT:* nodemon -x 'ts-node src/server.ts;'",
```

### Prepare build
```
npm run build
```

### Run the Application (Production Purpose Only)
```
npm start
```