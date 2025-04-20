import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';
import Resource from '../models/Resource.js';

const router = express.Router();

// Multer + Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lms_resources',
    allowed_formats: ['jpg', 'png', 'pdf', 'pptx', 'docx'],
    resource_type: 'auto',
  },
});
const upload = multer({ storage });

// POST /api/courses/:courseId/resources
router.post('/:courseId/resources', upload.single('file'), async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const resource = new Resource({
      course: courseId,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
      filename: req.file.originalname,
    });
    await resource.save();
    res.json({ resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/courses/:courseId/resources
router.get('/:courseId/resources', async (req, res) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId });
    res.json({ resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;