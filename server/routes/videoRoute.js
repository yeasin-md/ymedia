const router = require('express').Router();
const Banners = require('../models/Banners');
const Categories = require('../models/Categories');
const Video = require('../models/Video');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require('./verifyToken');

//Create Video ===
router.post('/upload', verifyToken, async (req, res) => {
  const newVideo = new Video(req.body);
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Create Banner===
router.post('/banner', verifyTokenAndAdmin, async (req, res) => {
  const newBanner = new Banners(req.body);
  try {
    const savedBanner = await newBanner.save();
    res.status(200).json(savedBanner);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Create Banner===
router.post('/category', verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Categories(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get All Banners===
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banners.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get All Categories===
router.get('/cats', async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Delete Video===
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json(`Video deleted successfully`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Video===
router.get('/find/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Videos===
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER VIDEOS===
router.get(
  '/user-videos/:userId',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const userVideos = await Video.find({ userId: req.params.userId });

      res.status(200).json(userVideos);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//Add Review===
router.post('/add-review', verifyToken, async (req, res) => {
  let { videoId, userId, review, commentator } = req.body;
  if (!videoId || !userId || !review) {
    res.status(500).json({ error: 'Needed Ever' });
  } else {
    try {
      const newRatingReview = await Video.updateOne(
        { _id: videoId },
        {
          $push: {
            reviews: { review: review, user: userId, commentator },
          },
        }
      );
      const commentedVideo = await Video.findById(videoId);

      res.status(200).json(commentedVideo);
    } catch (error) {
      res.status(500).json({ error: 'error' });
    }
  }
});

//ADD LIKES===
router.post('/add-like', verifyToken, async (req, res) => {
  let { likedUser, likedUsername, likedVideoId } = req.body;
  if ((!likedUser, !likedUsername, !likedVideoId)) {
    res.send('all required');
  } else {
    try {
      await Video.updateOne(
        { _id: likedVideoId },
        {
          $push: {
            likes: { likedUser: likedUser, likedUsername: likedUsername },
          },
        }
      );
      // const commentedVideo = await Video.findById(videoId);
      const likedVideo = await Video.findById(likedVideoId);

      res.status(200).json(likedVideo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});

//REMOVE LIKES ===
router.post('/remove-like', verifyToken, async (req, res) => {
  const { likedId, likedVideoId } = req.body;
  try {
    const removeLike = await Video.findByIdAndUpdate(likedVideoId, {
      $pull: { likes: { _id: likedId } },
    });
    const video = await Video.findById(likedVideoId);
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
