import mongoose from 'mongoose';

const scrapedSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
  },
});
const Scraped = mongoose.model('Scraped', scrapedSchema);
export default Scraped;
