
### Installation
```
npm install
npm install nodemon -g
npm install ts-node -g
npm install typescript -g
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

### Check Linting Errors
```
npm run lint
```

### Prepare build
```
npm run build
```

### Run the Application (Production Purpose Only)
```
npm start
```