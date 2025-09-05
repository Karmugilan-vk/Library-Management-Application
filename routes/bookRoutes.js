const express = require("express");
const router = express.Router();
const Book = require("../models/book"); 

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body); 
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req,res) => {
  try{
    const book = await Book.findById(req.params.id);
    if(!book){
      return res.status(404).json({message: "Book not found" });
    }
    res.json(book);
  } catch(error) {
    res.status(500).json({ message: error.message});
  }
});

router.get("/", async (req,res) => {
  try{
    const { search, sort }= req.query;

    let filter = {};
    if(search){
      filter = {
        $or: [
          {title:{$regex: search, $options: "i"}},
        { author:{$regex: search,$options:"i"}}
        ]
      };
    }

    let query = Book.find(filter);
    if(sort){
      query = query.sort(sort);
    }
    const books = await query;
    res.json(books);
  }catch (error){
    res.status(500).json({message: error.message});
  }
});

router.put("/:id", async (req,res) => {
  try{
    const{id} = req.params;

    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!updateBook){
      return res.status(404).json({message: "Book not found"});

    }
    res.json(updateBook);
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

router.delete("/:id",async(req,res)=>{
  try{
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if(!deletedBook){
      return res.status(404).json({message: "Book not found "})
    }
    res.json({message:"Book deleted succesfully",deletedBook});
  }catch(error){
    res.status(500).json({message: error.message});
  }
});
module.exports = router;
