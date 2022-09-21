# Batch process to populate Cosmos DB for Microsoft cloud Service Builder

1. Edit the file `configuration.env`, adding the correct credentials to access the Azure service.


2. Install the dependencies using `npm`:

```bash
npm install
```

3. Compile the imitial-load job - The first time running this job, please call build-all to copy all the statics files:

```bash
npm run build-all
```

4. Run the job with the following command:

```bash
node dist/index.js
```