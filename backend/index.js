const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/db/connectDB');

const { HealthCheckRoute } = require('./src/routes/healthcheck.route');
const { AuthRouter } = require('./src/routes/auth.route');
const taskRoutes = require('./src/routes/task.route');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Register routes
app.use('/api', HealthCheckRoute);
app.use('/api/user', AuthRouter);
app.use('/api/task', taskRoutes);

// Connect to DB and start server
connectDB()
    .then(() => {
        app.listen(PORT, 'localhost', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
//test push
