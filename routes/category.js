const Category = require("../models/Category");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { nestedCategories} = require("./utility");

const router = require("express").Router();


//CREATE Category
router.post("/", verifyTokenAndAdmin, async(req, res) => {
    const newCategory = new Category(req.body);
    try{
        const slugCat = await Category.findOne({"slug": req.body.slug});
         if( slugCat !== null)
        {
            res.status(500).json(req.body.slug + " already exist. please choose another slugs");
        }
        else{
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        }
        }catch(err) {
            res.status(500).json(err);
        }
} );



//GET ALL Category in Nested form

router.get("/", async (req,res) => {
    try {
        const categories = await Category.find({});
        if (!categories) 
        {
            return [];
        }
        res.status(200).json(nestedCategories(categories));
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL list of category
router.get("/list", async (req,res) => {
    try {
        const categories = await Category.find({});
        if (!categories) 
        {
            res.status(500).json("categories not found");
        }
        else {
            res.status(200).json(categories);
        }        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router