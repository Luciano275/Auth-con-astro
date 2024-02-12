import mongoose from 'mongoose';

mongoose.connect(
  import.meta.env.MONGODB_URI
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

export default mongoose;