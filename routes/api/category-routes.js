const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll(
      {
        include: [{ model: Product}],
    });
     res.status(200).json(categoryData);
  }
  catch (err)
    {
     res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   try {
     const categoryData = await Category.findByPk(req.params.id, {
       include: [{ model: Product }],
     });

     if (!categoryData) {
       res.status(404).json({ message: "No Category found with that id!" });
       return;
     }

     res.status(200).json(categoryData);
   } 
   catch (err) 
   {
     res.status(500).json(err);
   }
});

router.post('/', (req, res) => {
  // create a new category( we creating category name so req.body will be category_name)
   try {
     const categoryData = await Category.create(
       {
       category_name: req.body.category_name,
     });

     res.status(200).json(categoryData);
   } 
   catch (err)
    {
     res.status(400).json(err);
   }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, 
      {
      where: 
      {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category with this id!" });
      return;
    }
    res.status(200).json({
        message: `Category with id: ${req.params.id}, Name updated to: ${req.body.category_name}!`});
  } 
    catch (err) 
  {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // router.delete('/:id', async (req, res) => {
  // try {
  //   const tripData = await Trip.destroy({
  //     where: { id: req.params.id }
  //   });
  //   if (!tripData) {
  //     res.status(404).json({ message: 'No trip with this id!' });
  //     return;
  //   }
  //   res.status(200).json(tripData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  // router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy(
      {
      where: 
      { 
        id: req.params.id 
      }
    });
    if (!categoryData) 
    {
      res.status(404).json({
         message: `The Category with this ${req.params.id } does not exist`});
      return;
    }
    res.status(200).json({
      message: `Category with id: ${req.params.id}, has been deleted!`});

  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

module.exports = router;
